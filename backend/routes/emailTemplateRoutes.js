import express from 'express';
import EmailTemplate from '../models/EmailTemplate.js';

const router = express.Router();

// Get all email templates
router.get('/', async (req, res) => {
  try {
    const templates = await EmailTemplate.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new email template
router.post('/', async (req, res) => {
  const { name, subject, body } = req.body;

  const template = new EmailTemplate({
    name,
    subject,
    body
  });

  try {
    const newTemplate = await template.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing email template
router.put('/:id', async (req, res) => {
  const { name, subject, body } = req.body;

  try {
    const updatedTemplate = await EmailTemplate.findByIdAndUpdate(
      req.params.id,
      { name, subject, body },
      { new: true }
    );
    res.json(updatedTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an email template
router.delete('/:id', async (req, res) => {
  try {
    await EmailTemplate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Template deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
