import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: String, required: true },
    month: { type: String, required: true },
    time: { type: String, required: true },
    number: { type: String, required: true },
    color: { type: String, required: true },
    select: { type: String, required: true },
  });

  export const FormData = mongoose.model('FormData', formDataSchema);