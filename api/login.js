import { NowRequest, NowResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import express from 'express';

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);

const users = new Map(); // In-memory store, replace with a database in production

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  const hashedPassword = users.get(email);

  if (!hashedPassword || !(await bcrypt.compare(password, hashedPassword))) {
    return res.status(401).send('Invalid email or password.');
  }

  res.status(200).send('User logged in successfully.');
});

export default app;
