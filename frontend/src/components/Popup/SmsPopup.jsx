import React, { useContext, useEffect } from 'react';
import EmailTemplateContext from '../../EmailTemplateContext';
import Spinner from '../Spinner';

const SmsPopup = ({ smsContent, setSmsContent, handleSendSms, setIsPopupOpen, loading, currentLeadName }) => {

  const { messageTemplates, messageSelectedTemplate, setMessageSelectedTemplate } = useContext(EmailTemplateContext);

  useEffect(() => {
    if (messageSelectedTemplate) {
      setSmsContent((prevContent) => ({
        ...prevContent,
        body: `Dear ${currentLeadName},\n\n${messageSelectedTemplate.body}`,
      }));
      setMessageSelectedTemplate("")
    }
  }, [messageSelectedTemplate, setSmsContent, currentLeadName]);

  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    const template = messageTemplates.find(t => t._id === templateId);
    setMessageSelectedTemplate(template);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSmsContent((prevContent) => ({ ...prevContent, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Send SMS</h2>
        {loading ? <Spinner /> : null}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Template:</label>
          <select
            onChange={handleTemplateChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            <option value="">Select a template</option>
            {messageTemplates.map(template => (
              <option key={template._id} value={template._id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">To:</label>
          <input
            type="text"
            name="to"
            value={smsContent.to}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Message:</label>
          <textarea
            name="body"
            value={smsContent.body}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsPopupOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSendSms}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmsPopup;
