const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,

 auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASSWORD
 }
});

async function sendEmail(name, email, message) {

  const mailOptions = {
    from: process.env.EMAIL_USER,

    to: process.env.ADMIN_EMAIL,

    subject: `New Portfolio Contact from ${name}`,

    html: `
      <h2>New Contact Message</h2>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Message:</strong></p>

      <p>${message}</p>
    `
  };

  return await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;