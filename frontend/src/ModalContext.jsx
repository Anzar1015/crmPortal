import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [showCreateLead, setShowCreateLead] = useState(false);

    const openCreateLeadModal = () => {
      setShowCreateLead(true);
    };
  
    const closeCreateLeadModal = () => {
      setShowCreateLead(false);
    };
  

  return (
    <ModalContext.Provider value={{ showCreateLead, setShowCreateLead, openCreateLeadModal, closeCreateLeadModal }}>
      {children}
    </ModalContext.Provider>
  );
};