# Portfolio Website

A professional portfolio website with a working contact form built with Node.js and Express.

## Project Structure

```
portfolio/
├── client/                    # Frontend (HTML, CSS, JS)
│   ├── index.html            # Main page
│   ├── css/
│   │   └── styles.css        # Styling
│   ├── js/
│   │   └── script.js         # Client-side logic & form handling
│   └── assets/
│       └── images/           # Image assets
├── server/                    # Backend (Node.js)
│   ├── server.js             # Express server entry point
│   ├── routes/
│   │   └── contactRoutes.js  # Contact form routes
│   ├── controllers/
│   │   └── contactController.js  # Form validation & business logic
│   ├── config/
│   │   └── mailer.js         # Email configuration
│   └── .env                  # Environment variables
├── package.json              # Dependencies
└── .gitignore               # Git ignore rules
```

## Features

- ✅ Responsive design
- ✅ Working contact form with validation
- ✅ Email notifications (admin + user auto-reply)
- ✅ Clean, production-ready code structure
- ✅ XSS protection & input validation
- ✅ Error handling
- ✅ CORS enabled

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- **express** - Web framework
- **nodemailer** - Email sending
- **dotenv** - Environment variables
- **body-parser** - Request parsing
- **cors** - Cross-origin requests

### 2. Configure Email (Gmail Example)

1. Enable 2-factor authentication on your Google account
2. Generate an [App Password](https://support.google.com/accounts/answer/185833)
3. Edit `server/.env`:

```env
PORT=3000
NODE_ENV=development
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=your-email@gmail.com
```

### 3. Run the Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## How It Works

1. **Frontend Form** - User fills out contact form in `client/index.html`
2. **Client-side Validation** - `client/js/script.js` validates and sends data to backend
3. **Backend Processing** - `server/server.js` receives request
4. **Validation** - `server/controllers/contactController.js` validates form data
5. **Email Sending** - `server/config/mailer.js` sends emails via Nodemailer
6. **Response** - User gets success/error feedback

## Security Features

- ✅ Email validation (RFC format)
- ✅ Input sanitization (XSS protection)
- ✅ Required field validation
- ✅ Error messages don't expose sensitive info
- ✅ Environment variables for sensitive data (.env in .gitignore)

## Alternative Email Services

Change `EMAIL_SERVICE` in `.env` to:
- `sendgrid` - SendGrid
- `mailgun` - Mailgun
- `outlook` - Outlook
- `yahoo` - Yahoo Mail

Adjust authentication in `server/config/mailer.js` if needed.

## Development

- Frontend code: `client/` folder
- Backend code: `server/` folder
- Run with `npm start`
- Add images to `client/assets/images/`

## Notes

- Never commit `.env` file to version control
- Images should be optimized before adding to `assets/images/`
- Customize portfolio content in `client/index.html`
- Modify styling in `client/css/styles.css`
