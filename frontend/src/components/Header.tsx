import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-xl font-bold">APA</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-blue-200">Dashboard</Link></li>
          <li><Link to="/processes" className="text-white hover:text-blue-200">Processes</Link></li>
          <li><Link to="/input" className="text-white hover:text-blue-200">Input</Link></li>
          <li><Link to="/findings" className="text-white hover:text-blue-200">Findings</Link></li>
          <li><Link to="/agents" className="text-white hover:text-blue-200">Agents</Link></li>
          <li><Link to="/reports" className="text-white hover:text-blue-200">Reports</Link></li>
          <li><Link to="/login" className="text-white hover:text-blue-200">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;