import express from 'express';
import {User} from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/', async (req, res) => {
  const { token } = req.query;

  try {
    const { userId } = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    user.verified = true;
    await user.save();

    // Redirect to the verification page with a success flag
    res.redirect(`${process.env.FRONTEND_URL}verify-email?status=success`);
  } catch (error) {
    // Redirect to the verification page with an error flag
    res.redirect(`${process.env.FRONTEND_URL}verify-email?status=error`);
  }
});

export default router;
