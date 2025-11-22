// Header component with navigation
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 p-4 mb-6 shadow-lg transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-100 transition-colors duration-200">
          APA
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link
              to="/"
              className={`text-white hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-200 ${
                isActive('/') ? 'bg-blue-500 dark:bg-blue-700 shadow-md' : ''
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/processes"
              className={`text-white hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-200 ${
                isActive('/processes') ? 'bg-blue-500 dark:bg-blue-700 shadow-md' : ''
              }`}
            >
              Processes
            </Link>
          </li>
          <li>
            <Link
              to="/input"
              className={`text-white hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-200 ${
                isActive('/input') ? 'bg-blue-500 dark:bg-blue-700 shadow-md' : ''
              }`}
            >
              Input
            </Link>
          </li>
          <li>
            <Link
              to="/findings"
              className={`text-white hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-200 ${
                isActive('/findings') ? 'bg-blue-500 dark:bg-blue-700 shadow-md' : ''
              }`}
            >
              Findings
            </Link>
          </li>
          <li>
            <Link
              to="/agents"
              className={`text-white hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-200 ${
                isActive('/agents') ? 'bg-blue-500 dark:bg-blue-700 shadow-md' : ''
              }`}
            >
              Agents
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className={`text-white hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-200 ${
                isActive('/reports') ? 'bg-blue-500 dark:bg-blue-700 shadow-md' : ''
              }`}
            >
              Reports
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={`text-white hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-200 ${
                isActive('/login') ? 'bg-blue-500 dark:bg-blue-700 shadow-md' : ''
              }`}
            >
              Login
            </Link>
          </li>
          <li>
            <button
              onClick={toggleDarkMode}
              className="text-white hover:text-blue-200 p-2 rounded-md hover:bg-blue-500 dark:hover:bg-blue-700 transition-all duration-200 flex items-center justify-center w-10 h-10"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;