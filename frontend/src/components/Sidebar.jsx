
import React, { useState, useContext } from 'react';
import { FaHome, FaRegFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdSettings } from 'react-icons/md';
import { ThemeContext } from '../ThemeContext';

const Sidebar = ({ sidebarToggle }) => {
  const { theme } = useContext(ThemeContext);
  const [showSetupSubMenu, setShowSetupSubMenu] = useState(false);

  const toggleSetupSubMenu = () => {
    setShowSetupSubMenu(!showSetupSubMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // Optionally, replace with state management to update UI
  };

  return (

    <div className={`sidebar ${sidebarToggle ? 'hidden' : 'block'} w-64 bg-gray-300 dark:bg-gray-900 fixed h-full px-4 py-2`}>
      <div className="my-2 mb-4">
        <h1 className="text-2xl text-black dark:text-white font-bold">Dashboard</h1>
      </div>
      <hr className="border-gray-800 dark:border-gray-500" />
      <ul className="mt-3 text-black dark:text-white font-bold">
        <li className="mb-2 rounded hover:shadow hover:bg-gray-600 dark:hover:bg-gray-700 py-2">
          <Link to="/" className="px-3 flex items-center">
            <FaHome className="w-6 h-6 mr-2 -mt-1" />
            Home
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-600 dark:hover:bg-gray-700 py-2">
          <Link to="/" className="px-3 flex items-center">
            <FaRegFileAlt className="w-6 h-6 mr-2 -mt-1" />
            Leads
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-600 dark:hover:bg-gray-700 py-2">
          <Link to="/form" className="px-3 flex items-center">
            <FaRegFileAlt className="w-6 h-6 mr-2 -mt-1" />
            Form
          </Link>
        </li>
        <li className="relative mb-2">
          <button
            className="sidebar-link flex items-center w-full text-left rounded hover:shadow cursor-pointer py-2 px-3"
            onClick={toggleSetupSubMenu}
          >
            <MdSettings className={`w-6 h-6 mr-2 -mt-1 ${showSetupSubMenu ? 'rotate-0' : 'rotate-90'}`} />
            <span className="mr-2">Setup</span>
            <span className={`arrow ${showSetupSubMenu ? 'rotate-0' : 'rotate-90'}`}>&#9658;</span>
          </button>
          {showSetupSubMenu && (
            <ul className="sub-menu pl-6">
              <li className="mb-2">
                <Link to="/status-setup" className="sub-menu-link px-3 py-1 block rounded hover:bg-gray-600 dark:hover:bg-gray-700">
                  Status Setup
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/email-setup" className="sub-menu-link px-3 py-1 block rounded hover:bg-gray-600 dark:hover:bg-gray-700">
                  Email Templates
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/message-setup" className="sub-menu-link px-3 py-1 block rounded hover:bg-gray-600 dark:hover:bg-gray-700">
                  Message Templates
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/whatsapp-setup" className="sub-menu-link px-3 py-1 block rounded hover:bg-gray-600 dark:hover:bg-gray-700">
                  WhatsApp Templates
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-600 dark:hover:bg-gray-700 py-2">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors w-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

