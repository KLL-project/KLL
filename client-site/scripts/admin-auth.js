const apiBase = ['localhost', '127.0.0.1'].includes(location.hostname) ? `${location.protocol}//${location.hostname}:5500` : location.origin;
const apiUrl = (path) => new URL(path, apiBase).toString();
const readApiJson = async (response) => {
  const body = await response.text();
  try { return JSON.parse(body); }
  catch { throw new Error('The backend returned a page instead of JSON. Start server.js and open the app at http://localhost:5500.'); }
};

if (document.body.classList.contains('auth-required')) {
  const response = await fetch(apiUrl('/api/session'), { credentials: 'include' });
  const result = await readApiJson(response);
  if (!result.authenticated) location.replace('admin-login.html');
  else {
    document.body.classList.remove('auth-required');
    document.querySelector('#logout-button')?.addEventListener('click', async () => {
      await fetch(apiUrl('/api/logout'), { method: 'POST', credentials: 'include' });
      location.replace('admin-login.html');
    });
  }
}

document.querySelector('#login-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.querySelector('#login-email').value.trim().toLowerCase();
  const password = document.querySelector('#login-password').value;
  const error = document.querySelector('#login-error');
  error.textContent = '';
  try {
    const response = await fetch(apiUrl('/api/login'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ email, password }) });
    const result = await readApiJson(response);
    if (!response.ok) throw new Error(result.error || 'Sign-in failed.');
    location.replace('admin.html');
  } catch (problem) {
    error.textContent = problem.message || 'Could not reach the admin server. Start it and try again.';
  }
});
