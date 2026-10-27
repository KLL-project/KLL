if (document.body.classList.contains('auth-required')) {
  const response = await fetch('/api/session', { credentials: 'same-origin' });
  const result = await response.json();
  if (!result.authenticated) location.replace('admin-login.html');
  else {
    document.body.classList.remove('auth-required');
    document.querySelector('#logout-button')?.addEventListener('click', async () => {
      await fetch('/api/logout', { method: 'POST', credentials: 'same-origin' });
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
    const response = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify({ email, password }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Sign-in failed.');
    location.replace('admin.html');
  } catch (problem) {
    error.textContent = problem.message || 'Could not reach the admin server. Start it and try again.';
  }
});
