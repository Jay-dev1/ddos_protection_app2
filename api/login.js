const rateLimit = require('express-rate-limit');
const express = require('express');
const app = express();
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Simulate user login
  return res.status(200).json({ message: 'User logged in successfully' });
});

module.exports = app;
