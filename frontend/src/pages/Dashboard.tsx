// Dashboard page with KPIs and audit feed
import React from 'react';
import KPICard from '../components/KPICard';
import AuditFeed from '../components/AuditFeed';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KPICard title="Open Issues" value={12} change="+2 from last week" icon="⚠️" />
        <KPICard title="Avg Approval Delay" value="24h" change="-5h improvement" icon="⏱️" />
        <KPICard title="Monthly Cost Savings" value="$50k" change="+10% increase" icon="💰" />
      </div>
      {/* Audit Feed and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AuditFeed />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <p className="text-gray-600">Activity list here...</p>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
          🔍 Run Live Audit
        </button>
        <button className="ml-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200">
          🎭 Simulate Event
        </button>
      </div>
    </div>
  );
};

export default Dashboard;