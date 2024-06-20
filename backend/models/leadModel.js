import mongoose from 'mongoose';

const leadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Enforce unique email
    },
    phone: {
      type: String,
      required: true,
      unique: true, // Enforce unique phone number
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Lead = mongoose.model('Lead', leadSchema);
