# Environment Configuration Guide

This portfolio project uses environment variables for sensitive data and configuration. Follow this guide to set up your environment.

## Setup Steps

### 1. Create `.env` File

Copy the example file in the `server` folder:

```bash
cp server/.env.example server/.env
```

Or manually create `server/.env` with the following variables:

```env
PORT=5000
NODE_ENV=development
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=your-email@gmail.com
```

### 2. Configure Gmail for Email Sending

To send emails from your portfolio contact form:

#### a) Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Look for "2-Step Verification" 
3. Click "Enable" and follow the prompts

#### b) Generate App Password
1. Go to [Google Account App passwords](https://support.google.com/accounts/answer/185833)
2. Select **Mail** and **Windows Computer** (or your device type)
3. Google will generate a 16-character password
4. Copy this password (it will look like: `abcd efgh ijkl mnop`)

#### c) Update `.env` File
Replace the placeholders in `server/.env`:

```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
ADMIN_EMAIL=your-actual-email@gmail.com
```

**Note:** Remove any spaces from the password. Use `abcdefghijklmnop` not `abcd efgh ijkl mnop`.

### 3. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- `dotenv` - Loads environment variables from `.env`
- `nodemailer` - Sends emails
- `express` - Web framework
- `cors` - Enable cross-origin requests

### 4. Start the Server

```bash
npm start
```

You should see:
```
✓ Server running on http://localhost:5000
✓ Environment: development
✓ Email service: gmail
✓ Email configured: your-email@gmail.com
```

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment type | `development` or `production` |
| `EMAIL_SERVICE` | Email provider | `gmail` |
| `EMAIL_USER` | Email address to send from | `name@gmail.com` |
| `EMAIL_PASSWORD` | Gmail App Password (16 chars) | `abcdefghijklmnop` |
| `ADMIN_EMAIL` | Email to receive contact forms | `name@gmail.com` |

## Security Notes

⚠️ **Never commit `.env` to version control!**

- `.env` is listed in `.gitignore` to prevent accidental commits
- Keep your `.env` file locally only
- Never share your `EMAIL_PASSWORD` with others
- Use App Passwords (not your actual Gmail password) for better security

## Troubleshooting

### "Email credentials not configured"
- Check that all email variables are set in `.env`
- Verify App Password is 16 characters without spaces
- Ensure 2-factor authentication is enabled on Gmail

### "Failed to send message"
- Check server logs for error details
- Verify `.env` file is in the `server` folder
- Test credentials at [Gmail Account Security](https://myaccount.google.com/security)

### "Cannot find module dotenv"
- Run `npm install` to install dependencies
- Check that `package.json` has `dotenv` in dependencies

## Alternative Email Services

To use a different email service, update:

1. `EMAIL_SERVICE` in `.env` to: `sendgrid`, `mailgun`, `outlook`, etc.
2. Update `EMAIL_PASSWORD` with appropriate credentials
3. See [Nodemailer Services](https://nodemailer.com/smtp/well-known/) for support

## Production Deployment

For production:

1. Set `NODE_ENV=production` in `.env`
2. Use strong email credentials
3. Consider environment variable management services:
   - Heroku Config Vars
   - AWS Systems Manager Parameter Store
   - Azure Key Vault
   - Environment-specific `.env` files on server

## Quick Start Checklist

- [ ] Node.js installed (v14 or higher)
- [ ] `npm install` completed
- [ ] Gmail 2-factor authentication enabled
- [ ] App Password generated from Google
- [ ] `.env` file created in `server` folder
- [ ] Environment variables filled in `.env`
- [ ] `npm start` runs without errors
- [ ] Email configured message appears in console
