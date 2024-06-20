import React, { useContext, useEffect } from "react";
import EmailTemplateContext from "../../EmailTemplateContext";
import Spinner from "../Spinner";

const WhatsappPopup = ({
  whatsappContent,
  setWhatsappContent,
  handleSendWhatsapp,
  setIsWhatsappPopupOpen,
  loading,
  currentLeadName,
}) => {
  const {
    whatsappTemplates,
    whatsappSelectedTemplate,
    setWhatsappSelectedTemplate,
  } = useContext(EmailTemplateContext);

  useEffect(() => {
    if (whatsappSelectedTemplate) {
      setWhatsappContent((prevContent) => ({
        ...prevContent,
        body: `Dear ${currentLeadName},\n\n${whatsappSelectedTemplate.body}`,
      }));
      setWhatsappSelectedTemplate("");
    }
  }, [whatsappSelectedTemplate, setWhatsappContent, currentLeadName]);

  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    const template = whatsappTemplates.find((t) => t._id === templateId);
    setWhatsappSelectedTemplate(template);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWhatsappContent((prevContent) => ({ ...prevContent, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Send WhatsApp Message</h2>
        {loading ? <Spinner /> : null}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Template:</label>
          <select
            onChange={handleTemplateChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            <option value="">Select a template</option>
            {whatsappTemplates.map(template => (
              <option key={template._id} value={template._id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone:
          </label>
          <input
            type="text"
            name="to"
            value={whatsappContent.to}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            readOnly
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Message:
          </label>
          <textarea
            name="body"
            value={whatsappContent.body}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            required
          />
        </div>
        <button
          onClick={handleSendWhatsapp}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
        <button
          onClick={() => setIsWhatsappPopupOpen(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WhatsappPopup;
