// AgentConsole page for viewing agent traces
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

const AgentConsole: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();

  const { data: results, isLoading } = useQuery({
    queryKey: ['results', agentId],
    queryFn: () => apiClient.get(`/api/v1/results/${agentId}`),
    enabled: !!agentId,
  });

  if (isLoading) return <div>Loading...</div>;

  const traces = results?.traces || [];

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Agent Console / Orchestrate Trace</h1>
      {/* Agent Trace Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Agent Traces</h3>
          <button
            onClick={() => alert('Replaying trace (mock animation)')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            🔄 Replay
          </button>
        </div>
        {/* Trace Steps */}
        <div className="space-y-4">
          {traces.map((trace: any) => (
            <div key={trace._id} className="border-l-4 border-blue-500 pl-4">
              <div className="flex justify-between">
                <h4 className="font-medium">Agent: {trace.agentName} - Step {trace.stepIndex}</h4>
                <span className="text-sm text-gray-500">{new Date(trace.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-sm text-gray-600">Inputs: {JSON.stringify(trace.inputs)}</p>
              <p className="text-sm text-gray-600">Outputs: {JSON.stringify(trace.outputs)}</p>
              <p className="text-sm text-gray-600">Tool Calls: {JSON.stringify(trace.toolCalls)}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Raw Logs Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Raw Logs</h3>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`[2025-11-22 10:00:00] Auditor Agent: Starting analysis...
[2025-11-22 10:00:05] Recommender Agent: Plan generated...
[2025-11-22 10:00:10] Executor Agent: Action executed successfully.`}
        </pre>
      </div>
    </div>
  );
};

export default AgentConsole;