import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/status');
        setStatusOptions(response.data.map(status => status.name));
      } catch (error) {
        console.error('Error fetching status options:', error);
      }
    };

    fetchStatusOptions();
  }, []);

  const addStatusOption = (newStatus) => {
    setStatusOptions([...statusOptions, newStatus]);
  };

  const updateStatusOption = (index, newStatus) => {
    setStatusOptions((prev) => prev.map((status, i) => (i === index ? newStatus : status)));
  };

  const removeStatusOption = (status) => {
    setStatusOptions(statusOptions.filter(s => s !== status));
  };

  return (
    <StatusContext.Provider value={{ statusOptions, addStatusOption, removeStatusOption, updateStatusOption, setStatusOptions }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
