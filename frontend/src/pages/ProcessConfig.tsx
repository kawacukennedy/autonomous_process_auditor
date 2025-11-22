// ProcessConfig page for managing connectors
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';

interface Connector {
  _id: string;
  type: string;
  config: any;
  lastHealthCheck: Date;
}

const ProcessConfig: React.FC = () => {
  const queryClient = useQueryClient();
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [newConnector, setNewConnector] = useState({
    type: '',
    dataSource: '',
    mapping: {},
    thresholds: { sensitivity: 5, autoRemediate: false, notifyChannels: [] }
  });

  const { data: connectors, isLoading } = useQuery({
    queryKey: ['connectors'],
    queryFn: () => apiClient.get('/api/v1/connectors'),
  });

  const registerMutation = useMutation({
    mutationFn: (data: any) => apiClient.post('/api/v1/connectors/register', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['connectors'] }),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiClient.put(`/api/v1/connectors/${id}`, { lastHealthCheck: status === 'active' ? new Date() : null }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['connectors'] }),
  });

  const handleCreate = () => {
    registerMutation.mutate({
      type: newConnector.dataSource,
      config: { mapping: newConnector.mapping, thresholds: newConnector.thresholds }
    });
    setNewConnector({
      type: '',
      dataSource: '',
      mapping: {},
      thresholds: { sensitivity: 5, autoRemediate: false, notifyChannels: [] }
    });
    setShowWizard(false);
    setWizardStep(1);
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toggleMutation.mutate({ id, status: newStatus });
  };

  if (isLoading) return <div>Loading connectors...</div>;

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">Process Configuration</h1>
      <div className="mb-8 card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create New Monitor</h3>
          <button
            onClick={() => setShowWizard(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Start Wizard
          </button>
        </div>
        {showWizard && (
          <div className="border-t pt-4">
            <div className="flex mb-4">
              {[1, 2, 3].map(step => (
                <div key={step} className={`flex-1 text-center ${wizardStep >= step ? 'text-blue-600' : 'text-gray-400'}`}>
                  Step {step}
                </div>
              ))}
            </div>
            {wizardStep === 1 && (
              <div className="space-y-4">
                <h4 className="font-medium">Select Data Source</h4>
                <select
                  value={newConnector.dataSource}
                  onChange={(e) => setNewConnector({ ...newConnector, dataSource: e.target.value })}
                  className="w-full p-3 border rounded"
                >
                  <option value="">Choose data source...</option>
                  <option value="hr-system">HR System</option>
                  <option value="finance-system">Finance System</option>
                  <option value="it-ticketing">IT Ticketing</option>
                  <option value="google-sheets">Google Sheets</option>
                </select>
                <button
                  onClick={() => setWizardStep(2)}
                  disabled={!newConnector.dataSource}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
            {wizardStep === 2 && (
              <div className="space-y-4">
                <h4 className="font-medium">Configure Mapping</h4>
                <input
                  type="text"
                  placeholder="Field mapping (JSON)"
                  value={JSON.stringify(newConnector.mapping)}
                  onChange={(e) => setNewConnector({ ...newConnector, mapping: JSON.parse(e.target.value || '{}') })}
                  className="w-full p-3 border rounded"
                />
                <div className="flex space-x-2">
                  <button onClick={() => setWizardStep(1)} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                  <button onClick={() => setWizardStep(3)} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
                </div>
              </div>
            )}
            {wizardStep === 3 && (
              <div className="space-y-4">
                <h4 className="font-medium">Set Thresholds</h4>
                <div>
                  <label className="block text-sm mb-2">Sensitivity: {newConnector.thresholds.sensitivity}</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newConnector.thresholds.sensitivity}
                    onChange={(e) => setNewConnector({
                      ...newConnector,
                      thresholds: { ...newConnector.thresholds, sensitivity: Number(e.target.value) }
                    })}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newConnector.thresholds.autoRemediate}
                    onChange={(e) => setNewConnector({
                      ...newConnector,
                      thresholds: { ...newConnector.thresholds, autoRemediate: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <label>Auto-Remediate</label>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => setWizardStep(2)} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                  <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-large mb-6">Monitored Workflows</h3>
        <ul className="space-y-4">
          {connectors?.map((connector: Connector) => (
            <li key={connector._id} className="flex justify-between items-center p-6 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">{connector.type}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last check: {connector.lastHealthCheck ? new Date(connector.lastHealthCheck).toLocaleDateString() : 'Never'}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  connector.lastHealthCheck ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {connector.lastHealthCheck ? 'active' : 'inactive'}
                </span>
                <button
                  onClick={() => toggleStatus(connector._id, connector.lastHealthCheck ? 'active' : 'inactive')}
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