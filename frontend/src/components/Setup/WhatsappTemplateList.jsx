import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EmailTemplateContext from "../../EmailTemplateContext";

const WhatsappTemplateList = () => {
  const { whatsappTemplates, setWhatsappTemplates } = useContext(EmailTemplateContext);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/whatsapp-templates/${id}`);
      setWhatsappTemplates((prevTemplates) =>
        prevTemplates.filter((template) => template._id !== id)
      );
      toast.success("Template deleted successfully");
    } catch (error) {
      console.error("Error deleting template:", error);
      toast.error("Failed to delete template");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTemplate((prevTemplate) => ({ ...prevTemplate, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/whatsapp-templates/${editingTemplate._id}`,
        editingTemplate
      );
      setWhatsappTemplates((prevTemplates) =>
        prevTemplates.map((template) =>
          template._id === editingTemplate._id ? response.data : template
        )
      );
      setEditingTemplate(null);
      toast.success("Template updated successfully");
    } catch (error) {
      console.error("Error updating template:", error);
      toast.error("Failed to update template");
    }
  };

  const handleEditClick = (template) => {
    setEditingTemplate(template);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Whats App Templates</h2>
      {whatsappTemplates.length === 0 ? (
        <p>No templates available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Body
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {whatsappTemplates.map((template) => (
                <tr key={template._id} className="hover:bg-gray-100">
                  {editingTemplate && editingTemplate._id === template._id ? (
                    <td
                      colSpan="4"
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-300"
                    >
                      <form onSubmit={handleEditSubmit}>
                        <div className="mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Template Name:
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={editingTemplate.name}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 p-2 rounded mt-1"
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Body:
                          </label>
                          <textarea
                            name="body"
                            value={editingTemplate.body}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 p-2 rounded mt-1"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTemplate(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </form>
                    </td>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {template.name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {template.body}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <button
                          onClick={() => handleEditClick(template)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(template._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WhatsappTemplateList;
