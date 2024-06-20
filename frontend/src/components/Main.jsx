import React, { useState } from "react";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Main = () => {
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
          <Home />
        </div>
      </div>
    </div>
  );
};

export default Main;
