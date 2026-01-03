import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRouter from './routes/contact.js';

dotenv.config();
const app = express();

// Explicit preflight handler first
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://contact-manager-4vxi.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

app.use(cors({
  origin: 'https://contact-manager-4vxi.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Add if needed
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/contacts', contactsRouter);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
