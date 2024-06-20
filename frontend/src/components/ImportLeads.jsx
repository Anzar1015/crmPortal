import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const ImportLeads = () => {
  const [file, setFile] = useState(null);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/api/leads/import-leads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const { imported, duplicates } = response.data;
      toast.success(`Leads imported successfully. Imported: ${imported}, Duplicates: ${duplicates}`);
      navigate('/');
    } catch (error) {
      console.error('Error importing leads:', error);
      toast.error('Failed to import leads.');
    }
  };

  const handleDownloadSample = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/leads/download-sample', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sample_leads.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading sample file:', error);
      toast.error('Failed to download sample file.');
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
          className={`${sidebarToggle ? "" : "ml-64"} transition-all duration-300 ease-in-out`}
        >
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Import Leads</h2>
            <p className="mb-4">
              Please ensure your Excel file has the following columns:
              <br />
              <strong>Name, Company, Email, Phone, Status</strong>
              
            </p>
            <button
              onClick={handleDownloadSample}
              className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
              Download Sample Excel
            </button>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Import Leads
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportLeads;
