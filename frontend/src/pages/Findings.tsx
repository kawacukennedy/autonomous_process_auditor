// Findings page with visualizations and remediation plans
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Findings: React.FC = () => {
  const timelineData = [
    { time: '09:00', delays: 2 },
    { time: '10:00', delays: 5 },
    { time: '11:00', delays: 3 },
    { time: '12:00', delays: 8 },
    { time: '13:00', delays: 4 },
    { time: '14:00', delays: 6 },
  ];

  const heatmapData = [
    { process: 'Approval', frequency: 10 },
    { process: 'Review', frequency: 7 },
    { process: 'Final Sign-off', frequency: 3 },
    { process: 'Audit', frequency: 5 },
  ];

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Findings & Recommendations</h1>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Timeline Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Approval Delay Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="delays" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Heatmap Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Delay Frequency by Process</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={heatmapData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="process" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="frequency" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Remediation Plan Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Remediation Plan</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Implement automated approval routing for low-risk requests</li>
          <li>Add escalation triggers for delays over 24 hours</li>
          <li>Introduce parallel review processes for high-volume periods</li>
          <li>Optimize workflow notifications to reduce manual checks</li>
        </ol>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">
          ✅ Apply Now
        </button>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-200">
          📋 Request Approval
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
          📥 Download Report
        </button>
      </div>
    </div>
  );
};

export default Findings;