const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Security Middleware
app.use(helmet());
const ALLOWED_ORIGINS = (process.env.FRONTEND_URL || 'https://hamzakamran.tech')
  .split(',')
  .map(o => o.trim().replace(/[/]+$/, ''))
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Allow same-origin / server-to-server requests that send no Origin.
    if (!origin) return callback(null, true);
    const normalised = origin.replace(/[/]+$/, '');
    return ALLOWED_ORIGINS.includes(normalised)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'));
  },
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});
app.use('/api/contact', limiter);

// Logging
app.use(morgan('dev'));

// Body parser
app.use(express.json({ limit: '10kb' }));

// Escape user input before it is interpolated into the HTML email body.
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

// Create transporter with retry mechanism
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

let transporter = createTransporter();

// Verify transporter connection
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('Email transporter verified successfully');
  } catch (error) {
    console.error('Email transporter verification failed:', error);
    setTimeout(() => {
      transporter = createTransporter();
      verifyTransporter();
    }, 5000);
  }
};

verifyTransporter();

// Contact form endpoint with validation
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Input validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 100),
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 4000)
    };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: sanitizedData.email,
      subject: `Portfolio Contact: ${sanitizedData.subject}`,
      text: `
        Name: ${sanitizedData.name}
        Email: ${sanitizedData.email}
        Subject: ${sanitizedData.subject}
        Message: ${sanitizedData.message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(sanitizedData.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(sanitizedData.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(sanitizedData.subject)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(sanitizedData.message)}</pre>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true,
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to send email. Please try again later.' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Something went wrong!' 
  });
});

// Export for Vercel serverless
module.exports = app;