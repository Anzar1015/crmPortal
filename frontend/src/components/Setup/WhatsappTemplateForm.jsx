import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import EmailTemplateContext from '../../EmailTemplateContext';

const WhatsappTemplateForm = () => {
  const { setWhatsappTemplates } = useContext(EmailTemplateContext);
  const [formData, setFormData] = useState({ name: '', body: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/whatsapp-templates', formData);
      setWhatsappTemplates((prevTemplates) => [...prevTemplates, response.data]);
      setFormData({ name: '', body: '' });
      toast.success('Template created successfully');
    } catch (error) {
      console.error('Error creating template:', error);
      toast.error('Failed to create template');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Whats App Template</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Template Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Body:</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Create Template
        </button>
      </form>
    </div>
  );
};

export default WhatsappTemplateForm;
