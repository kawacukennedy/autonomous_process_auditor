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
  const [newConnector, setNewConnector] = useState({ type: '', config: {} });

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
    registerMutation.mutate(newConnector);
    setNewConnector({ type: '', config: {} });
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toggleMutation.mutate({ id, status: newStatus });
  };

  if (isLoading) return <div>Loading connectors...</div>;

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Process Configuration</h1>
      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Create New Monitor</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Connector Type"
            value={newConnector.type}
            onChange={(e) => setNewConnector({ ...newConnector, type: e.target.value })}
            className="w-full p-3 border rounded"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Create
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Monitored Workflows</h3>
        <ul className="space-y-4">
          {connectors?.map((connector: Connector) => (
            <li key={connector._id} className="flex justify-between items-center p-4 border rounded">
              <div>
                <p className="font-medium">{connector.type}</p>
                <p className="text-sm text-gray-500">Last check: {connector.lastHealthCheck ? new Date(connector.lastHealthCheck).toLocaleDateString() : 'Never'}</p>
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