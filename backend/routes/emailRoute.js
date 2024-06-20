import express from 'express'
import nodemailer from 'nodemailer'

const router = express.Router();

router.post('/', async (req, res) => {
  const { to, subject, body } = req.body;

  // Configure nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anzarbtpl@gmail.com',
      pass: 'uivc wdvz pzbs fhax',
    },
  });

  const mailOptions = {
    from: 'anzarbtpl@gmail.com',
    to,
    subject,
    text: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to send email', error });
  }
});


export default router;