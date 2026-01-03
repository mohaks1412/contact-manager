import mongoose from 'mongoose';
import cors from 'cors';
import contactsRouter from './routes/contact.js';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

let conn = null; // cache DB connection

export default async function handler(req, res) {
  // Run CORS per request
  await new Promise((resolve, reject) => {
    cors({ origin: true })(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Connect to MongoDB once
  if (!conn) {
    conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  }

  // Simple routing for demo
  if (req.url.startsWith('/contacts')) {
    return contactsRouter(req, res);
  }

  res.status(404).json({ message: 'Route not found' });
}
