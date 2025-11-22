// AgentConsole page for viewing agent traces
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

const AgentConsole: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const [replayIndex, setReplayIndex] = useState(-1);
  const [isReplaying, setIsReplaying] = useState(false);
  const [showRawLogs, setShowRawLogs] = useState(false);

  const { data: results, isLoading } = useQuery({
    queryKey: ['results', agentId],
    queryFn: () => apiClient.get(`/api/v1/results/${agentId}`),
    enabled: !!agentId,
  });

  if (isLoading) return <div>Loading...</div>;

  const traces = results?.traces || [];

  const handleReplay = () => {
    setIsReplaying(true);
    setReplayIndex(0);
  };

  useEffect(() => {
    if (isReplaying && replayIndex < traces.length) {
      const timer = setTimeout(() => {
        setReplayIndex(replayIndex + 1);
      }, 2000); // 2 seconds per step
      return () => clearTimeout(timer);
    } else if (replayIndex >= traces.length) {
      setIsReplaying(false);
      setReplayIndex(-1);
    }
  }, [replayIndex, isReplaying, traces.length]);

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">Agent Console / Orchestrate Trace</h1>
      {/* Agent Trace Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Agent Traces</h3>
          <button
            onClick={handleReplay}
            disabled={isReplaying}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isReplaying ? 'Replaying...' : '🔄 Replay'}
          </button>
        </div>
        {/* Trace Steps */}
        <div className="space-y-4">
          {traces.map((trace: any, index: number) => (
            <div
              key={trace._id}
              className={`border-l-4 pl-4 transition-all duration-500 ${
                index <= replayIndex ? 'border-green-500 bg-green-50' : 'border-blue-500'
              }`}
            >
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
      {/* Logs Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{showRawLogs ? 'Raw Logs' : 'Summarized Explanation'}</h3>
          <button
            onClick={() => setShowRawLogs(!showRawLogs)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {showRawLogs ? '📊 Show Summary' : '📋 Show Raw Logs'}
          </button>
        </div>
        {showRawLogs ? (
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-x-auto">
{`[2025-11-22 10:00:00] Auditor Agent: Starting analysis...
[2025-11-22 10:00:05] Recommender Agent: Plan generated...
[2025-11-22 10:00:10] Executor Agent: Action executed successfully.`}
          </pre>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Auditor Agent Summary</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">Analyzed workflow events and identified 3 potential bottlenecks with high confidence.</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded">
              <h4 className="font-medium text-green-800 dark:text-green-200">Recommender Agent Summary</h4>
              <p className="text-sm text-green-600 dark:text-green-300">Generated 2 remediation plans focusing on approval delays and resource allocation.</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Executor Agent Summary</h4>
              <p className="text-sm text-purple-600 dark:text-purple-300">Successfully executed automated workflow changes with safety guardrails.</p>
            </div>
          </div>
        )}
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