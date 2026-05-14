require('dotenv').config({ path: './server/.env' });
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const sendEmail = require('./config/mailer');

dotenv.config({ path: './server/.env' });


const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {

  try {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {

      return res.status(400).json({
        success: false,
        message: 'All fields required'
      });
    }

    await sendEmail(name, email, message);

    console.log('Email sent successfully');

    res.json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {

    console.error('Email Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to send email'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});