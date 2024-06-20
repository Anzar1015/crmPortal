import express from 'express';
import { Status } from '../models/setupStatus.js';

const router = express.Router();

// Create status
router.post('/', async (req, res) => {
  try {
    const status = new Status({ name: req.body.name });
    await status.save();
    res.status(201).send(status);
  } catch (error) {
    res.status(500).send({ message: 'Error creating status', error });
  }
});

// Read statuses
router.get('/', async (req, res) => {
  try {
    const statuses = await Status.find();
    res.send(statuses);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching statuses', error });
  }
});

// Update status
router.put('/:id', async (req, res) => {
  try {
    const status = await Status.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!status) return res.status(404).send({ message: 'Status not found' });
    res.send(status);
  } catch (error) {
    res.status(500).send({ message: 'Error updating status', error });
  }
});

// Delete status
router.delete('/:id', async (req, res) => {
  try {
    const status = await Status.findByIdAndDelete(req.params.id);
    if (!status) return res.status(404).send({ message: 'Status not found' });
    res.send({ message: 'Status deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting status', error });
  }
});

export default router;
