import mongoose from 'mongoose';

const whatsappTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    type: String,
    required: true
  }
});

const WhatsappTemplate = mongoose.model('WhatsappTemplate', whatsappTemplateSchema);

export default WhatsappTemplate;