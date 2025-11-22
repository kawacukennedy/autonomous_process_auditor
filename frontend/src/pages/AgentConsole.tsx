// AgentConsole page for viewing agent traces
import React from 'react';

interface TraceStep {
  step: number;
  action: string;
  input: string;
  output: string;
  timestamp: string;
}

const AgentConsole: React.FC = () => {
  const trace: TraceStep[] = [
    { step: 1, action: 'Analyze Event', input: 'Approval delay detected', output: 'Bottleneck identified', timestamp: '10:00:00' },
    { step: 2, action: 'Generate Plan', input: 'Bottleneck data', output: 'Remediation steps', timestamp: '10:00:05' },
    { step: 3, action: 'Execute Action', input: 'Remediation steps', output: 'Action applied', timestamp: '10:00:10' },
    { step: 4, action: 'Log Results', input: 'Execution outcome', output: 'Results logged', timestamp: '10:00:15' },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Agent Console / Orchestrate Trace</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Agent: Auditor Agent</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
            🔄 Replay
          </button>
        </div>
        <div className="space-y-4">
          {trace.map(step => (
            <div key={step.step} className="border-l-4 border-blue-500 pl-4">
              <div className="flex justify-between">
                <h4 className="font-medium">Step {step.step}: {step.action}</h4>
                <span className="text-sm text-gray-500">{step.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600">Input: {step.input}</p>
              <p className="text-sm text-gray-600">Output: {step.output}</p>
            </div>
          ))}
        </div>
      </div>
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