import React, { useState } from 'react';

const Input: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedScenario, setSelectedScenario] = useState('');

  const handleSubmit = () => {
    // Mock submit
    alert('Analysis started!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Core Feature Input</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Upload Sample Logs</h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your workflow logs here..."
          className="w-full h-32 p-3 border rounded resize-none"
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Select Demo Scenario</h3>
        <select
          value={selectedScenario}
          onChange={(e) => setSelectedScenario(e.target.value)}
          className="w-full p-3 border rounded"
        >
          <option value="">Choose a scenario...</option>
          <option value="hr-approval">HR Approval Delays</option>
          <option value="finance-compliance">Finance Compliance</option>
          <option value="it-ticketing">IT Ticketing Bottlenecks</option>
        </select>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Sensitivity Threshold</label>
            <input type="range" min="1" max="10" className="w-full" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="auto-remediate" className="mr-2" />
            <label htmlFor="auto-remediate">Enable Auto-Remediation</label>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Analyze & Recommend
        </button>
      </div>
    </div>
  );
};

export default Input;