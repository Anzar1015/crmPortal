import express from 'express'
import axios from 'axios'

const router = express.Router();

const WATI_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNjFmNDExYy0wMTg2LTQ1NmUtYTY3My1kNjZhNzk3NGNlNTQiLCJ1bmlxdWVfbmFtZSI6ImFuemFyYnRwbEBnbWFpbC5jb20iLCJuYW1laWQiOiJhbnphcmJ0cGxAZ21haWwuY29tIiwiZW1haWwiOiJhbnphcmJ0cGxAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDYvMDQvMjAyNCAwOToyNTozOCIsImRiX25hbWUiOiJ3YXRpX2FwcF90cmlhbCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRSSUFMIiwiZXhwIjoxNzE4MTUwNDAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.4_FRg0D90I74JjYexmwYWbAfVo0tAy2HUOn7MeK14bE';
const WATI_URL = 'https://app-server.wati.io/api/v1/sendSessionMessage';

router.post('/', async (req, res) => {
  const { phone, message } = req.body;

  try {
    const response = await axios.post(
      WATI_URL,
      {
         phone,
         message,
      },
      {
        headers: {
          'Authorization': `Bearer ${WATI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.status(200).json({ message: 'WhatsApp message sent successfully', response: response.data });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error sending WhatsApp message' });
  }
});

export default router;