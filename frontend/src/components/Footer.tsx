// Footer component with copyright info
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Autonomous Process Auditor. Powered by IBM watsonx.</p>
      </div>
    </footer>
  );
};

export default Footer;