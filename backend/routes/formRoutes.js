import express from 'express';
import { FormData } from '../models/FormData.js';

const router = express.Router();

// Get all form data
router.get('/', async (req, res) => {
  try {
    const data = await FormData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single form data by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await FormData.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Data not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new form data
router.post('/', async (req, res) => {
  const formData = new FormData(req.body);
  try {
    const savedData = await formData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update form data by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedData = await FormData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedData) return res.status(404).json({ message: 'Data not found' });
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete form data by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedData = await FormData.findByIdAndDelete(req.params.id);
    if (!deletedData) return res.status(404).json({ message: 'Data not found' });
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
