import { createServer } from 'node:http';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { readFile, rename, writeFile, mkdir } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { services } from './scripts/config.js';

const projectDir = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(projectDir, 'client-site');
const databaseFile = resolve(projectDir, 'data', 'enquiries.json');
const port = Number(process.env.PORT || 5500);
const adminEmail = (process.env.ADMIN_EMAIL || 'admin@kllfm.com').trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || 'KLLdemo2026!';
const passwordSalt = randomBytes(16);
const passwordHash = scryptSync(adminPassword, passwordSalt, 64);
const sessions = new Map();
const loginAttempts = new Map();
const statuses = new Set(['New', 'Contacted', 'In progress', 'Closed']);
const serviceNames = new Set([...services.map(({ name }) => name), 'General Enquiry']);
const mimeTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon' };

async function readDatabase() {
  try {
    const parsed = JSON.parse(await readFile(databaseFile, 'utf8'));
    if (!Array.isArray(parsed)) throw new Error('Enquiry database must contain a JSON array.');
    return parsed;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await mkdir(dirname(databaseFile), { recursive: true });
    await writeDatabase([]);
    return [];
  }
}

async function writeDatabase(records) {
  await mkdir(dirname(databaseFile), { recursive: true });
  const temporaryFile = `${databaseFile}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(records, null, 2)}\n`, 'utf8');
  await rename(temporaryFile, databaseFile);
}

function sendJson(response, status, value, extraHeaders = {}) {
  response.writeHead(status, { 'Content-Type': mimeTypes['.json'], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extraHeaders });
  response.end(JSON.stringify(value));
}

async function readBody(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 16_384) throw Object.assign(new Error('Request is too large.'), { status: 413 });
  }
  try { return JSON.parse(body || '{}'); }
  catch { throw Object.assign(new Error('Request body must be valid JSON.'), { status: 400 }); }
}

function cookieValue(request, name) {
  const entry = (request.headers.cookie || '').split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : '';
}

function currentSession(request) {
  const token = cookieValue(request, 'kll_admin_session');
  const expiresAt = sessions.get(token);
  if (!expiresAt || expiresAt < Date.now()) {
    sessions.delete(token);
    return '';
  }
  return token;
}

function requireAdmin(request, response) {
  if (currentSession(request)) return true;
  sendJson(response, 401, { error: 'Please sign in to access the admin workspace.' });
  return false;
}

function validText(value, maxLength) { return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength; }

async function handleApi(request, response, url) {
  const path = url.pathname;
  if (request.method === 'GET' && path === '/api/health') return sendJson(response, 200, { ok: true });

  if (request.method === 'POST' && path === '/api/login') {
    const ip = request.socket.remoteAddress || 'unknown';
    const attempt = loginAttempts.get(ip) || { count: 0, blockedUntil: 0 };
    if (attempt.blockedUntil > Date.now()) return sendJson(response, 429, { error: 'Too many sign-in attempts. Wait 15 minutes and try again.' });
    const body = await readBody(request);
    const supplied = typeof body.password === 'string' ? scryptSync(body.password, passwordSalt, 64) : Buffer.alloc(64);
    const matches = supplied.length === passwordHash.length && timingSafeEqual(supplied, passwordHash);
    if (String(body.email || '').trim().toLowerCase() !== adminEmail || !matches) {
      attempt.count += 1;
      if (attempt.count >= 8) { attempt.count = 0; attempt.blockedUntil = Date.now() + 15 * 60_000; }
      loginAttempts.set(ip, attempt);
      return sendJson(response, 401, { error: 'Email or password is incorrect.' });
    }
    loginAttempts.delete(ip);
    const token = randomBytes(32).toString('base64url');
    sessions.set(token, Date.now() + 8 * 60 * 60_000);
    const secure = request.socket.encrypted ? '; Secure' : '';
    return sendJson(response, 200, { ok: true }, { 'Set-Cookie': `kll_admin_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${secure}` });
  }

  if (request.method === 'GET' && path === '/api/session') {
    return sendJson(response, 200, { authenticated: Boolean(currentSession(request)) });
  }

  if (request.method === 'POST' && path === '/api/logout') {
    sessions.delete(currentSession(request));
    return sendJson(response, 200, { ok: true }, { 'Set-Cookie': 'kll_admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0' });
  }

  if (request.method === 'POST' && path === '/api/enquiries') {
    const body = await readBody(request);
    if (typeof body.website === 'string' && body.website.trim()) return sendJson(response, 202, { ok: true });
    const name = String(body.name || '').trim();
    const phone = String(body.phone || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const service = String(body.interest || body.service || '').trim();
    const message = String(body.message || '').trim();
    if (!validText(name, 120) || !validText(phone, 40) || !/^[0-9+() -]{8,40}$/.test(phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !serviceNames.has(service) || !validText(message, 4000)) {
      return sendJson(response, 400, { error: 'Please provide a valid name, phone, email, service, and message.' });
    }
    const records = await readDatabase();
    const nextNumber = Math.max(1040, ...records.map((item) => Number(String(item.id).replace(/\D/g, '')) || 0)) + 1;
    const record = { id: `ENQ-${nextNumber}`, name, phone, email, service, message, status: 'New', notes: '', createdAt: new Date().toISOString() };
    records.unshift(record);
    await writeDatabase(records);
    return sendJson(response, 201, { ok: true, id: record.id });
  }

  if (path === '/api/enquiries' && request.method === 'GET') {
    if (!requireAdmin(request, response)) return;
    const records = await readDatabase();
    return sendJson(response, 200, { enquiries: records.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
  }

  const match = path.match(/^\/api\/enquiries\/([A-Za-z0-9-]+)$/);
  if (match && request.method === 'PATCH') {
    if (!requireAdmin(request, response)) return;
    const body = await readBody(request);
    if (!statuses.has(body.status) || typeof body.notes !== 'string' || body.notes.length > 4000) return sendJson(response, 400, { error: 'Provide a valid status and notes.' });
    const records = await readDatabase();
    const record = records.find((item) => item.id === match[1]);
    if (!record) return sendJson(response, 404, { error: 'Enquiry not found.' });
    record.status = body.status;
    record.notes = body.notes.trim();
    record.updatedAt = new Date().toISOString();
    await writeDatabase(records);
    return sendJson(response, 200, { enquiry: record });
  }

  return sendJson(response, 404, { error: 'API route not found.' });
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  const origin = request.headers.origin;
  if (origin) {
    try {
      const originUrl = new URL(origin);
      if (originUrl.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(originUrl.hostname)) {
        response.setHeader('Access-Control-Allow-Origin', origin);
        response.setHeader('Access-Control-Allow-Credentials', 'true');
        response.setHeader('Vary', 'Origin');
      }
    } catch { /* Invalid origins receive no CORS permission. */ }
  }
  if (url.pathname.startsWith('/api/') && request.method === 'OPTIONS') {
    response.writeHead(204, { 'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '600' });
    return response.end();
  }
  try {
    if (url.pathname.startsWith('/api/')) return await handleApi(request, response, url);
    if (!['GET', 'HEAD'].includes(request.method)) return sendJson(response, 405, { error: 'Method not allowed.' });
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    let file = resolve(publicDir, `.${pathname}`);
    if (!file.startsWith(`${publicDir}${sep}`) && file !== publicDir) return sendJson(response, 403, { error: 'Forbidden.' });
    if (!extname(file) && !pathname.endsWith('/')) file = resolve(file, 'index.html');
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type': mimeTypes[extname(file).toLowerCase()] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'same-origin' });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    if (url.pathname.startsWith('/api/')) return sendJson(response, error.status || 500, { error: error.status ? error.message : 'Server error.' });
    sendJson(response, error.code === 'ENOENT' ? 404 : 500, { error: error.code === 'ENOENT' ? 'Page not found.' : 'Server error.' });
  }
}

createServer(handleRequest).listen(port, '127.0.0.1', () => {
  console.log(`KLL sample application running at http://localhost:${port}`);
  console.log(`Admin sign-in: ${adminEmail}${process.env.ADMIN_PASSWORD ? '' : ' (sample password: KLLdemo2026!)'}`);
  console.log(`Enquiry database: ${databaseFile}`);
});
