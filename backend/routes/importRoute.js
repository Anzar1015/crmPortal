import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import {Lead} from '../models/leadModel.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to import leads from Excel
router.post('/import-leads', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const duplicateLeads = [];
    const newLeads = [];

    for (const row of data) {
      const { Name, Company, Email, Phone, Status } = row;
      const existingLead = await Lead.findOne({ $or: [{ email: Email }, { phone: Phone }] });

      if (existingLead) {
        duplicateLeads.push(row);
      } else {
        newLeads.push({
          name: Name,
          company: Company,
          email: Email,
          phone: Phone,
          status: Status,
          createdAt: new Date(),
        });
      }
    }

    if (newLeads.length > 0) {
      await Lead.insertMany(newLeads);
    }

    res.status(200).json({
      message: 'Leads processed successfully.',
      imported: newLeads.length,
      duplicates: duplicateLeads.length,
    });
  } catch (error) {
    console.error('Error importing leads:', error);
    res.status(500).send('Failed to import leads.');
  }
});

export default router;
