// ProcessConfig page for managing connectors
import React, { useState } from 'react';

interface Connector {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
}

const ProcessConfig: React.FC = () => {
  const [connectors, setConnectors] = useState<Connector[]>([
    { id: '1', name: 'HR System', type: 'API', status: 'active' },
    { id: '2', name: 'Finance System', type: 'Webhook', status: 'inactive' },
  ]);

  const toggleStatus = (id: string) => {
    setConnectors(connectors.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Process Configuration</h1>
      <div className="mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
          ➕ Create New Monitor
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Monitored Workflows Section */}
        <h3 className="text-lg font-semibold mb-4">Monitored Workflows</h3>
        <ul className="space-y-4">
          {connectors.map(connector => (
            <li key={connector.id} className="flex justify-between items-center p-4 border rounded">
              <div>
                <p className="font-medium">{connector.name}</p>
                <p className="text-sm text-gray-500">{connector.type}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  connector.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {connector.status}
                </span>
                <button
                  onClick={() => toggleStatus(connector.id)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Toggle
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProcessConfig;