import express from 'express';
import MessageTemplate from '../models/messageTemplate.js';

const router = express.Router();

// Get all message templates
router.get('/', async (req, res) => {
  try {
    const templates = await MessageTemplate.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new message template
router.post('/', async (req, res) => {
  const { name, body } = req.body;

  const template = new MessageTemplate({
    name,
    body
  });

  try {
    const newTemplate = await template.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a existing message template
router.put('/:id', async (req, res) => {
  const { name, body } = req.body;

  try {
    const updatedTemplate = await MessageTemplate.findByIdAndUpdate(
      req.params.id,
      { name, body },
      { new: true }
    );
    res.json(updatedTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a message template
router.delete('/:id', async (req, res) => {
  try {
    await MessageTemplate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Template deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
