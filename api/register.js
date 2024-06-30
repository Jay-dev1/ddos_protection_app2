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

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.set(email, hashedPassword);
  
  res.status(200).send('User registered successfully.');
});

export default app;
