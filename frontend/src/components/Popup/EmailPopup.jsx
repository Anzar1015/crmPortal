import React, { useContext, useEffect } from 'react';
import EmailTemplateContext from '../../EmailTemplateContext';
import Spinner from '../Spinner';

const EmailPopup = ({ emailContent, setEmailContent, handleSendEmail, setIsPopupOpen, loading, currentLeadName }) => {
  const { templates, selectedTemplate, setSelectedTemplate } = useContext(EmailTemplateContext);

  useEffect(() => {
    if (selectedTemplate) {
      setEmailContent((prevContent) => ({
        ...prevContent,
        subject: selectedTemplate.subject,
        body: `Dear ${currentLeadName},\n\n${selectedTemplate.body}`,
      }));
      setSelectedTemplate("")
    }
  }, [selectedTemplate, setEmailContent, currentLeadName]);

  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    const template = templates.find(t => t._id === templateId);
    setSelectedTemplate(template);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Send Email</h2>
        {loading && <Spinner/>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Template:</label>
          <select
            onChange={handleTemplateChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            <option value="">Select a template</option>
            {templates.map(template => (
              <option key={template._id} value={template._id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">To:</label>
          <input
            type="email"
            name="to"
            value={emailContent.to}
            onChange={handleChange}
            readOnly
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subject:</label>
          <input
            type="text"
            name="subject"
            value={emailContent.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Body:</label>
          <textarea
            name="body"
            value={ emailContent.body}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() =>  setIsPopupOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSendEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
