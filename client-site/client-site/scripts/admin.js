let enquiries = [];

const rows = document.querySelector('#enquiry-rows');
const search = document.querySelector('#search-input');
const serviceFilter = document.querySelector('#service-filter');
const statusFilter = document.querySelector('#status-filter');
const dialog = document.querySelector('#detail-dialog');
const serviceNames = [...new Set(enquiries.map((item) => item.service))].sort();
for (const name of serviceNames) {
  const option = document.createElement('option');
  option.value = name;
  option.textContent = name;
  serviceFilter.append(option);
}

const statusClass = (status) => `status-${status.toLowerCase().replaceAll(' ', '-')}`;
const initials = (name) => name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
const dateLabel = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · ${date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}`;
};

function fillServiceFilter() {
  const selected = serviceFilter.value;
  const options = [...new Set(enquiries.map((item) => item.service))].sort();
  serviceFilter.replaceChildren(new Option('All services', ''));
  for (const name of options) serviceFilter.append(new Option(name, name));
  serviceFilter.value = options.includes(selected) ? selected : '';
}

async function loadEnquiries() {
  const response = await fetch('/api/enquiries', { credentials: 'same-origin' });
  if (response.status === 401) { location.replace('admin-login.html'); return; }
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Could not load enquiries.');
  enquiries = result.enquiries;
  fillServiceFilter();
  render();
}

function updateStats() {
  document.querySelector('#stat-total').textContent = enquiries.length;
  document.querySelector('#stat-new').textContent = enquiries.filter((item) => item.status === 'New').length;
  document.querySelector('#stat-progress').textContent = enquiries.filter((item) => item.status === 'In progress').length;
  document.querySelector('#stat-closed').textContent = enquiries.filter((item) => item.status === 'Closed').length;
}

function render() {
  const query = search.value.trim().toLowerCase();
  const filtered = enquiries.filter((item) => {
    const matchesSearch = [item.name, item.email, item.phone, item.service, item.message].some((value) => value.toLowerCase().includes(query));
    return matchesSearch && (!serviceFilter.value || item.service === serviceFilter.value) && (!statusFilter.value || item.status === statusFilter.value);
  });
  rows.replaceChildren();
  for (const item of filtered) {
    const tr = document.createElement('tr');
    tr.tabIndex = 0;
    tr.setAttribute('aria-label', `Open enquiry from ${item.name}`);
    const contact = document.createElement('td');
    const contactWrap = document.createElement('div');
    contactWrap.className = 'contact-cell';
    const avatar = document.createElement('span');
    avatar.className = 'contact-avatar';
    avatar.textContent = initials(item.name);
    const info = document.createElement('span');
    info.className = 'contact-info';
    const contactName = document.createElement('strong');
    contactName.textContent = item.name;
    const contactEmail = document.createElement('small');
    contactEmail.textContent = item.email;
    info.append(contactName, contactEmail);
    contactWrap.append(avatar, info);
    contact.append(contactWrap);
    const service = document.createElement('td');
    service.innerHTML = '<span class="service-chip"></span>';
    service.firstElementChild.textContent = item.service;
    const received = document.createElement('td');
    received.textContent = dateLabel(item.createdAt);
    const status = document.createElement('td');
    status.innerHTML = '<span class="status-pill"></span>';
    status.firstElementChild.textContent = item.status;
    status.firstElementChild.classList.add(statusClass(item.status));
    const action = document.createElement('td');
    action.innerHTML = '<span class="row-open" aria-hidden="true">›</span>';
    tr.append(contact, service, received, status, action);
    tr.addEventListener('click', () => openDetail(item.id));
    tr.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDetail(item.id); } });
    rows.append(tr);
  }
  document.querySelector('#empty-state').hidden = filtered.length !== 0;
  document.querySelector('#result-count').textContent = `Showing ${filtered.length} of ${enquiries.length} enquiries`;
  updateStats();
}

function openDetail(id) {
  const item = enquiries.find((enquiry) => enquiry.id === id);
  if (!item) return;
  dialog.dataset.enquiryId = id;
  document.querySelector('#detail-name').textContent = item.name;
  document.querySelector('#detail-service').textContent = item.service;
  const status = document.querySelector('#detail-status');
  status.textContent = item.status;
  status.className = `status-pill ${statusClass(item.status)}`;
  const phone = document.querySelector('#detail-phone');
  phone.href = `tel:${item.phone.replace(/[^+\d]/g, '')}`;
  phone.textContent = item.phone;
  const email = document.querySelector('#detail-email');
  email.href = `mailto:${item.email}`;
  email.textContent = item.email;
  document.querySelector('#detail-message').textContent = item.message;
  document.querySelector('#detail-status-select').value = item.status;
  document.querySelector('#detail-notes').value = item.notes || '';
  document.querySelector('#save-feedback').textContent = '';
  dialog.showModal();
}

function save() {
  const item = enquiries.find((enquiry) => enquiry.id === dialog.dataset.enquiryId);
  if (!item) return;
  const feedback = document.querySelector('#save-feedback');
  feedback.textContent = 'Saving...';
  fetch(`/api/enquiries/${encodeURIComponent(item.id)}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify({ status: document.querySelector('#detail-status-select').value, notes: document.querySelector('#detail-notes').value }) })
    .then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not save enquiry.');
      Object.assign(item, result.enquiry);
      document.querySelector('#detail-status').textContent = item.status;
      document.querySelector('#detail-status').className = `status-pill ${statusClass(item.status)}`;
      feedback.textContent = 'Saved to database';
      render();
    })
    .catch((error) => { feedback.textContent = error.message; });
}

function exportCsv() {
  const columns = ['ID', 'Name', 'Phone', 'Email', 'Service', 'Message', 'Status', 'Received', 'Staff notes'];
  const escapeCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const content = [columns, ...enquiries.map((item) => [item.id, item.name, item.phone, item.email, item.service, item.message, item.status, item.createdAt, item.notes || ''])]
    .map((line) => line.map(escapeCell).join(',')).join('\r\n');
  const blob = new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'kll-enquiries-demo.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}

search.addEventListener('input', render);
serviceFilter.addEventListener('change', render);
statusFilter.addEventListener('change', render);
document.querySelector('#save-detail').addEventListener('click', save);
document.querySelector('#export-button').addEventListener('click', exportCsv);
loadEnquiries().catch((error) => {
  document.querySelector('#empty-state').hidden = false;
  document.querySelector('#empty-state strong').textContent = 'Could not load enquiries';
  document.querySelector('#empty-state p').textContent = error.message;
});
