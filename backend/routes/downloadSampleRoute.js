import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import path from 'path';
import os from 'os';

const router = express.Router();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to download sample Excel file
router.get('/', (req, res) => {
    const sampleData = [
      { Name: 'John Doe', Company: 'Company A', Email: 'john@example.com', Phone: '1234567890', Status: 'New' },
      { Name: 'Jane Smith', Company: 'Company B', Email: 'jane@example.com', Phone: '0987654321', Status: 'Contacted' },
    ];
  
    const worksheet = xlsx.utils.json_to_sheet(sampleData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Leads');
  
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'sample_leads.xlsx');
    xlsx.writeFile(workbook, filePath);
  
    res.download(filePath, 'sample_leads.xlsx', (err) => {
      if (err) {
        console.error('Error downloading sample file:', err);
        res.status(500).send('Error downloading sample file.');
      }
    });
  });
  
  export default router;