import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRouter from '../routes/contact.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URI,  // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

  console.log("near contacts");
  
app.use('/contacts', contactsRouter);


console.log("Rest of the routes");


app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;