// Input page for uploading logs and selecting scenarios
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';

const Input: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedScenario, setSelectedScenario] = useState('');
  const [threshold, setThreshold] = useState(5);
  const [autoRemediate, setAutoRemediate] = useState(false);
  const [policySet, setPolicySet] = useState('default');
  const [scope, setScope] = useState('full');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: { input: string; settings: any }) => apiClient.post('/api/v1/process', data),
    onSuccess: (data) => {
      navigate(`/findings/${data.jobId}`);
    },
  });

  const handleSubmit = () => {
    const input = inputText || `Scenario: ${selectedScenario}`;
    const settings = { threshold, autoRemediate, policySet, scope };
    mutation.mutate({ input, settings });
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 enterprise-bg">
      <h1 className="text-2xl font-bold mb-6">Core Feature Input</h1>
      {/* Upload Logs Section */}
      <div className="card mb-8">
        <h3 className="text-large mb-6">Upload Sample Logs</h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your workflow logs here..."
          className="input-field h-40 resize-none"
        />
      </div>
      {/* Scenario Selection */}
      <div className="card mb-8">
        <h3 className="text-large mb-6">Select Demo Scenario</h3>
        <select
          value={selectedScenario}
          onChange={(e) => setSelectedScenario(e.target.value)}
          className="input-field"
        >
          <option value="">Choose a scenario...</option>
          <option value="hr-approval">HR Approval Delays</option>
          <option value="finance-compliance">Finance Compliance</option>
          <option value="it-ticketing">IT Ticketing Bottlenecks</option>
          <option value="supply-chain">Supply Chain Delays</option>
        </select>
      </div>
      {/* Settings Section */}
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-large">Analysis Settings</h3>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
          >
            {showAdvanced ? 'Hide Advanced ▲' : 'Show Advanced ▼'}
          </button>
        </div>
        <div className={`space-y-4 overflow-hidden transition-all duration-300 ${showAdvanced ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div>
            <label className="block text-sm font-medium mb-2">Sensitivity Threshold: {threshold}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Policy Set</label>
            <select
              value={policySet}
              onChange={(e) => setPolicySet(e.target.value)}
              className="input-field"
            >
              <option value="default">Default Policies</option>
              <option value="strict">Strict Compliance</option>
              <option value="lenient">Lenient Monitoring</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Remediation Scope</label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="input-field"
            >
              <option value="full">Full Automation</option>
              <option value="partial">Partial Automation</option>
              <option value="manual">Manual Only</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="auto-remediate"
              checked={autoRemediate}
              onChange={(e) => setAutoRemediate(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="auto-remediate">Enable Auto-Remediation</label>
          </div>
        </div>
      </div>
        <div className={`space-y-4 ${showAdvanced ? 'block' : 'hidden'} transition-all duration-300`}>
          <div>
            <label className="block text-sm font-medium mb-2">Sensitivity Threshold: {threshold}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full"
            />
        </div>
        <div className={`space-y-4 ${showAdvanced ? 'block' : 'hidden'} transition-all duration-300`}>
          <div>
            <label className="block text-sm font-medium mb-2">Sensitivity Threshold: {threshold}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Policy Set</label>
            <select
              value={policySet}
              onChange={(e) => setPolicySet(e.target.value)}
              className="input-field"
            >
              <option value="default">Default Policies</option>
              <option value="strict">Strict Compliance</option>
              <option value="lenient">Lenient Monitoring</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Remediation Scope</label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="input-field"
            >
              <option value="full">Full Automation</option>
              <option value="partial">Partial Automation</option>
              <option value="manual">Manual Only</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="auto-remediate"
              checked={autoRemediate}
              onChange={(e) => setAutoRemediate(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="auto-remediate">Enable Auto-Remediation</label>
          </div>
        </div>
       </div>
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={mutation.isPending}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
        >
           {mutation.isPending ? (
             <>
               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
               <span>Analyzing...</span>
             </>
           ) : (
             <>
               <span>🤖</span>
               <span>Analyze & Recommend</span>
             </>
           )}
         </button>
         {mutation.isPending && (
           <div className="mt-4">
             <div className="w-full bg-gray-200 rounded-full h-2">
               <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
             </div>
             <p className="text-sm text-gray-600 mt-2">Processing your input...</p>
           </div>
         )}
       </div>
    </div>
  );
};

export default Input;