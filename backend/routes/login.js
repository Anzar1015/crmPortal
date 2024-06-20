// routes/login.js
// import express from 'express';
// import {User} from '../models/user.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';

// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     if (!user.verified) {
//       // Generate a verification token
//       const token = jwt.sign({ userId: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: '1d' });

//       // Send verification email
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.USER,
//           pass: process.env.PASS,
//         },
//       });

//       const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

//       const mailOptions = {
//         from: process.env.USER,
//         to: user.email,
//         subject: 'Email Verification',
//         text: `Please verify your email by clicking the following link: ${verificationUrl}`,
//       };

//       await transporter.sendMail(mailOptions);

//       return res.status(403).json({ message: 'Email not verified. Verification link sent to your email.' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: '1d' });

//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// });

// export default router;


import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "Invalid email or password" });

    if (!user.verified) {
      // Generate a verification token
      const token = jwt.sign({ userId: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: "1d" });

      // Send verification email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });

      const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

      const mailOptions = {
        from: process.env.USER,
        to: user.email,
        subject: "Email Verification",
        text: `Please verify your email by clicking the following link: ${verificationUrl}`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(403).json({ message: "Email not verified. Verification link sent to your email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: "1d" });

    res.status(200).json({ token, databaseName: user.databaseName });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export default router;
