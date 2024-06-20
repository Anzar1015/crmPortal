// // Navbar.jsx

import React, { useContext } from 'react';
import { FaBars, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../ThemeContext';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // Optionally, replace with state management to update UI
  };

  return (

    <nav className={`bg-gray-300 dark:bg-gray-900 border-b border-gray-400 dark:border-gray-800 px-4 py-3 flex justify-between`}>
      <div className={`flex items-center text-xl ${sidebarToggle ? '' : 'ml-64'}`}>
        <FaBars
          className="text-black dark:text-white me-4 cursor-pointer"
          onClick={() => {
            setSidebarToggle(!sidebarToggle);
          }}
        />
        <span className="text-black dark:text-white font-semibold">Leads</span>
      </div>
      <div className="flex items-center gap-x-5">
        <button onClick={toggleTheme} className="text-black dark:text-white">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        <div className="relative">
          <button className="text-black dark:text-white group">
            <FaUserCircle className="w-6 h-6 mt-1" />
            <div className="z-10 hidden absolute rounded-lg bg-gray-900 dark:bg-white shadow w-32 group-focus:block top-full right-0">
              <ul className="py-2 text-sm bg-red-600 text-black dark:text-white hover:bg-red-700 rounded-md">
                <li onClick={handleLogout} className="cursor-pointer">
                  Log out
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
