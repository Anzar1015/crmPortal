import express from 'express';
import { Lead } from '../models/leadModel.js';

const router = express.Router();

// Validate email format using a regular expression
const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Validate phone number format (simple validation)
const validatePhone = (phone) => {
  const phonePattern = /^[0-9]+$/;
  return phonePattern.test(phone);
};

// Route for creating a new lead
router.post('/', async (req, res) => {
  try {
    const { name, company, email, phone, status } = req.body;

    // Check for required fields
    if (!name || !company || !email || !phone || !status) {
      return res.status(400).send({
        message: 'All fields are required.',
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).send({
        message: 'Invalid email format.',
      });
    }

    // Validate phone number format
    if (!validatePhone(phone)) {
      return res.status(400).send({
        message: 'Invalid phone number format.',
      });
    }

    const newLead = { name, company, email, phone, status };
    const lead = await Lead.create(newLead);

    return res.status(201).send(lead);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).send({
        message: `The ${field} must be unique. The provided ${field} is already in use.`,
      });
    }
    console.log(error.message);
    res.status(500).send({ message: 'An error occurred while creating the lead.' });
  }
});


// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const lead = await Lead.find({});

    return response.status(200).json({
      count: lead.length,
      data: lead,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const lead = await Lead.findById(id);

    return response.status(200).json(lead);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a lead
router.put('/:id', async (req, res) => {
  try {
    const { name, company, email, phone, status } = req.body;
    const { id } = req.params;

    // Check for required fields
    if (!name || !company || !email || !phone || !status) {
      return res.status(400).send({
        message: 'All fields are required.',
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).send({
        message: 'Invalid email format.',
      });
    }

    // Validate phone number format
    if (!validatePhone(phone)) {
      return res.status(400).send({
        message: 'Invalid phone number format.',
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    return res.status(200).send({ message: 'Lead updated successfully', updatedLead });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).send({
        message: `The ${field} must be unique. The provided ${field} is already in use.`,
      });
    }
    console.log(error.message);
    res.status(500).send({ message: 'An error occurred while updating the lead.' });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Lead.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Lead not found' });
    }

    return response.status(200).send({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
