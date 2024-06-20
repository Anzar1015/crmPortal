import express from 'express';
import {User} from '../models/user.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();

    // Generate a verification token
    const token = jwt.sign({ userId: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: '1d' });

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.USER,
      to: user.email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: ${verificationUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered successfully, please check your email for verification link' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

export default router;


