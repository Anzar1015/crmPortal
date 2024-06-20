import express from "express";
import { User, validate } from "../models/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get current user data
router.get("/", auth,  async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).send("User not found.");
    res.send(user);
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
});

// Update current user data
router.put("/", auth,  async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).send("User not found.");
    res.send(user);
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
});

export default router;
