# KLL Financial & Marketing Services website

A responsive lead-generation website with a sample Node.js backend and persistent JSON enquiry database.

## Run locally

Install Node.js LTS. From the project folder, build the static site and start the app:

```powershell
node scripts\build-static.mjs
node server.js
```

Open `http://localhost:5500`. The website and admin pages must be served by `server.js` so their API requests and sign-in work.

The build creates the website files in `client-site`; `server.js` serves them together with the API.

## Client-demo pages

- `#/` Home
- `#/services` Full service catalogue and every loan category
- `#/service/home-purchase-loans` Individual loan-page example
- `#/insurance`, `#/income-tax`, `#/property-management`
- `#/about`, `#/resources`, `#/faq`, `#/contact`
- `admin-login.html` Demo admin sign-in
- `admin.html` Enquiry management preview (sample data only)

Open `/admin-login.html` and sign in with the local sample account: `admin@kllfm.com` / `KLLdemo2026!`. The admin page lists enquiries saved in `data/enquiries.json`; status and notes updates are saved there too. Public enquiry forms submit to the backend. The sample server binds to `127.0.0.1` and is for local demonstration only.

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and optionally `PORT` in the environment to change the local sample account or port. Do not expose this sample server to the public internet; use a production database, HTTPS, secret management, stronger abuse protection, and deployment review before handling real customer information.

## Production configuration

Edit `scripts/config.js` before deployment:

- Set `analyticsId` and initialize the preferred analytics provider through the deployment environment.
- Replace any marked placeholders with approved business details and legal copy.

The backend validates enquiry fields and includes basic local sign-in throttling. A production deployment still needs a hardened server setup and operational security controls.
