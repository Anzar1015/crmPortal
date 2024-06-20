import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateLead from "./pages/CreateLead";
import ShowLead from "./pages/ShowLead";
import EditLead from "./pages/EditLead";
import DeleteLead from "./pages/DeleteLead";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Main from "./components/Main";
import VerifyEmail from "./components/VerifyEmail";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatusProvider } from "./StatusContext";
import StatusSetup from "./components/Setup/StatusSetup";
import { EmailTemplateProvider } from "./EmailTemplateContext";
import EmailSetup from "./pages/EmailSetup";
import ImportLeads from "./components/ImportLeads";
import MessageSetup from "./pages/MessageSetup";
import WhatsappSetup from "./pages/WhatsappSetup";
import Form from "./pages/Form";
// import UserProfile from "./pages/UserProfile";

const App = () => {
  const user = localStorage.getItem("token");
  return (
    <>
    <EmailTemplateProvider>
      <StatusProvider>
        <Routes>
          {user && <Route path="/" exact element={<Main />} />}
          {user && <Route path="/leads/create" element={<CreateLead />} />}
          {user && <Route path="/leads/details/:id" element={<ShowLead />} />}
          {user && <Route path="/leads/edit/:id" element={<EditLead />} />}
          {user && <Route path="/leads/delete/:id" element={<DeleteLead />} />}
          {user && <Route path="/status-setup" element={<StatusSetup />} />}
          {user && <Route path="/form" element={<Form />} />}
          {user && <Route path="/email-setup" element={<EmailSetup />} />}
          {user && <Route path="/message-setup" element={<MessageSetup />} />}
          {user && <Route path="/whatsapp-setup" element={<WhatsappSetup />} />}
          {user && <Route path="/import-leads" element={<ImportLeads />} />}

          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/verify-email" exact element={<VerifyEmail />} />
          <Route path="/" element={<Navigate replace to={user ? "/" : "/signup"} />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </StatusProvider>
      </EmailTemplateProvider>
    </>
  );
};

export default App;
