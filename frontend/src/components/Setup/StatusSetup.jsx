import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStatus } from "../../StatusContext";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const StatusSetup = () => {
  const {
    statusOptions,
    addStatusOption,
    updateStatusOption,
    removeStatusOption,
    setStatusOptions,
  } = useStatus();
  const [newStatus, setNewStatus] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/status");
        setStatusOptions(response.data);
      } catch (error) {
        console.log("Error fetching status options:", error);
      }
    };

    fetchStatusOptions();
  }, [setStatusOptions]);

  const handleAddStatus = async () => {
    if (newStatus.trim() && !statusOptions.some(status => status.name === newStatus.trim())) {
      try {
        const response = await axios.post("http://localhost:3000/api/status", { name: newStatus.trim() });
        addStatusOption(response.data);
        setNewStatus("");
      } catch (error) {
        console.error("Error adding status:", error);
      }
    }
  };

  const handleEditStatus = (index) => {
    setEditingIndex(index);
    setEditingStatus(statusOptions[index].name);
  };

  const handleSaveEdit = async () => {
    if (editingStatus.trim() && !statusOptions.some(status => status.name === editingStatus.trim())) {
      const statusId = statusOptions[editingIndex]._id;
      try {
        const response = await axios.put(`http://localhost:3000/api/status/${statusId}`, { name: editingStatus.trim() });
        updateStatusOption(editingIndex, response.data);
        setEditingIndex(null);
        setEditingStatus("");
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingStatus("");
  };

  const handleRemoveStatus = async (index) => {
    const statusId = statusOptions[index]._id;
    try {
      await axios.delete(`http://localhost:3000/api/status/${statusId}`);
      removeStatusOption(index);
      toast.success("Deleted successfully!");
      navigate("/setup");
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar sidebarToggle={sidebarToggle} />
      <div className="flex flex-col w-full">
        <Navbar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <div
          className={`${
            sidebarToggle ? "" : "ml-64"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="p-6">
            <h2 className="text-2xl mb-4">Status Setup</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sr no
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {statusOptions.map((status, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editingIndex === index ? (
                          <input
                            type="text"
                            value={editingStatus}
                            onChange={(e) => setEditingStatus(e.target.value)}
                            className="border p-2 w-full"
                          />
                        ) : (
                          status.name
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editingIndex === index ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="text-green-500 mr-2"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-500"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => handleEditStatus(index)}
                                className="text-blue-500 mr-2"
                              >
                                <AiOutlineEdit className="text-yellow-600 cursor-pointer" />
                              </button>
                              <button
                                onClick={() => handleRemoveStatus(index)}
                                className="text-red-500"
                              >
                                <MdOutlineDelete className="text-red-600 cursor-pointer" />
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border p-2 flex-grow mr-2 w-full md:w-auto"
                placeholder="Enter new status"
              />
              <button
                onClick={handleAddStatus}
                className="bg-gray-700 text-white p-2 mt-2 md:mt-0"
              >
                Add Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSetup;

