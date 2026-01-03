import express from 'express';
import Contact from '../../models/Contact.js';

const router = express.Router();

/**
 * @route   POST /api/contacts
 * @desc    Create a new contact
 */
router.post('/', async (req, res) => {
  try {

    const {name, email, phone, message} = req.body;
    const contact = await Contact.create({name, email, phone, message});
    
    return res.status(201).json(contact);
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

/**
 * @route   GET /api/contacts
 * @desc    Get all contacts
 */
router.get('/', async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json(contacts);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error'
    });
  }
});

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Delete contact by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        error: 'Contact not found'
      });
    }

    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({
      error: 'Invalid contact ID'
    });
  }
});

export default router;
