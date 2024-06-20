import express from 'express';
import WhatsappTemplate from '../models/whatsappTemplate.js';

const router = express.Router();

// Get all whatsapp templates
router.get('/', async (req, res) => {
  try {
    const templates = await WhatsappTemplate.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new whatsapp template
router.post('/', async (req, res) => {
  const { name, body } = req.body;

  const template = new WhatsappTemplate({
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

// Update a existing whatsapp template
router.put('/:id', async (req, res) => {
  const { name, body } = req.body;

  try {
    const updatedTemplate = await WhatsappTemplate.findByIdAndUpdate(
      req.params.id,
      { name, body },
      { new: true }
    );
    res.json(updatedTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a whatsapp template
router.delete('/:id', async (req, res) => {
  try {
    await WhatsappTemplate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Template deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
