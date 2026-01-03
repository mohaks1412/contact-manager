import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name required'] },
  email: { type: String, required: [true, 'Email required'] },
  phone: { type: String, required: [true, 'Phone required'] },
  message: { type: String},
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', contactSchema);
