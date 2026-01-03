import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRouter from './api/routes/contact.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URI,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/contacts', contactsRouter);

app.listen(process.env.PORT || 5000, () => console.log(`Server on port ${process.env.PORT || 5000}`));