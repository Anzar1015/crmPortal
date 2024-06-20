// src/context/EmailTemplateContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const EmailTemplateContext = createContext();

export const EmailTemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [messageTemplates, setMessageTemplates] = useState([]);
  const [messageSelectedTemplate, setMessageSelectedTemplate] = useState(null);

  const [whatsappTemplates, setWhatsappTemplates] = useState([]);
  const [whatsappSelectedTemplate, setWhatsappSelectedTemplate] = useState(null);

  useEffect(() => {
    const fetchEmailTemplates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/email-templates');
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching Email templates:', error);
      }
    };

    fetchEmailTemplates();
  }, []);

  useEffect(() => {
    const fetchMessageTemplates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/message-templates');
        setMessageTemplates(response.data);
      } catch (error) {
        console.error('Error fetching Message templates:', error);
      }
    };

    fetchMessageTemplates();
  }, []);

  useEffect(() => {
    const fetchWhatsappTemplates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/whatsapp-templates');
        setWhatsappTemplates(response.data);
      } catch (error) {
        console.error('Error fetching Whatsapp templates:', error);
      }
    };

    fetchWhatsappTemplates();
  }, []);

  return (
    <EmailTemplateContext.Provider value={{ 
      templates, selectedTemplate, setSelectedTemplate,setTemplates,
      messageTemplates, setMessageTemplates, messageSelectedTemplate, setMessageSelectedTemplate,
      whatsappTemplates, setWhatsappTemplates, whatsappSelectedTemplate, setWhatsappSelectedTemplate
    }}>
      {children}
    </EmailTemplateContext.Provider>
  );
};

export default EmailTemplateContext;
