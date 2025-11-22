// Reports page for generating and downloading reports
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api/client';

interface Report {
  id: string;
  name: string;
  description: string;
  lastGenerated: string;
}

const Reports: React.FC = () => {
  const [reports] = useState<Report[]>([
    { id: 'weekly-summary', name: 'Weekly Summary', description: 'Overview of weekly audit activities', lastGenerated: '2025-11-22' },
    { id: 'risk-exposures', name: 'Risk Exposures', description: 'Identified risks and mitigation plans', lastGenerated: '2025-11-20' },
    { id: 'savings-forecast', name: 'Savings Forecast', description: 'Projected cost savings from optimizations', lastGenerated: '2025-11-18' },
    { id: 'compliance-report', name: 'Compliance Report', description: 'Detailed compliance audit results', lastGenerated: '2025-11-15' },
    { id: 'performance-metrics', name: 'Performance Metrics', description: 'Key performance indicators and trends', lastGenerated: '2025-11-12' },
  ]);

  const generateMutation = useMutation({
    mutationFn: (type: string) => apiClient.post(`/api/v1/reports/generate/${type}`, {}),
    onSuccess: (data) => alert(data.message),
  });

  const generateReport = (type: string) => {
    generateMutation.mutate(type);
  };

  const downloadReport = (type: string) => {
    // Mock download
    const link = document.createElement('a');
    link.href = `/mock-reports/${type}.pdf`; // In real, use API
    link.download = `${type}.pdf`;
    link.click();
  };

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      {/* Pre-built Reports Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Pre-built Reports</h3>
        {/* Report List */}
        <ul className="space-y-4">
          {reports.map(report => (
            <li key={report.id} className="flex justify-between items-center p-4 border rounded">
              <div>
                <p className="font-medium">{report.name}</p>
                <p className="text-sm text-gray-600">{report.description}</p>
                <p className="text-xs text-gray-500">Last generated: {report.lastGenerated}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => generateReport(report.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                >
                  ⚙️ Generate
                </button>
                <button
                  onClick={() => downloadReport(report.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
                >
                  📥 Download
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Schedule Export Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Schedule Export</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Frequency</label>
            <select className="w-full p-3 border rounded">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Recipients</label>
            <input
              type="email"
              placeholder="Enter email addresses"
              className="w-full p-3 border rounded"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
            📅 Schedule Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;