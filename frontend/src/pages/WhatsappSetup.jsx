import React, { useState } from "react";
import Navbar from "../components/Navbar";
import WhatsappTemplateForm from "../components/Setup/WhatsappTemplateForm";
import WhatsappTemplateList from "../components/Setup/WhatsappTemplateList";
import Sidebar from "../components/Sidebar";

const WhatsappSetup = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
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
            
            <WhatsappTemplateList />
            <WhatsappTemplateForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsappSetup;
