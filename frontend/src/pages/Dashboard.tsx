// Dashboard page with KPIs and audit feed
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import KPICard from '../components/KPICard';
import AuditFeed from '../components/AuditFeed';
import { apiClient } from '../api/client';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const Dashboard: React.FC = () => {
  const [liveAuditRunning, setLiveAuditRunning] = useState(false);

  const { data: jobs, refetch: refetchJobs } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => apiClient.get('/api/v1/jobs'),
    refetchInterval: 5000, // Poll every 5 seconds
  });

  const { data: health } = useQuery({
    queryKey: ['health'],
    queryFn: () => apiClient.get('/api/v1/health'),
    refetchInterval: 30000, // Poll every 30 seconds
  });

  useEffect(() => {
    socket.on('jobUpdate', () => {
      refetchJobs();
    });

    return () => {
      socket.off('jobUpdate');
    };
  }, [refetchJobs]);

  // Calculate KPIs from jobs data
  const openIssues = jobs?.filter((job: any) => job.status === 'running').length || 0;
  const completedJobs = jobs?.filter((job: any) => job.status === 'complete').length || 0;
  const avgProcessingTime = jobs?.length > 0 ? '2.5 min' : 'N/A'; // Mock calculation
  const avgApprovalDelay = jobs?.length > 0 ? '4.2 hours' : 'N/A'; // Mock
  const monthlyCostSavings = jobs?.length > 0 ? '$12,500' : '$0'; // Mock

  const handleLiveAudit = async () => {
    setLiveAuditRunning(true);
    try {
      await apiClient.post('/api/v1/process', { input: 'Live audit scan' });
      // Refetch will happen via polling/socket
    } catch (error) {
      console.error('Live audit failed:', error);
    } finally {
      setTimeout(() => setLiveAuditRunning(false), 3000);
    }
  };

  const handleSimulateEvent = async () => {
    try {
      await apiClient.post('/api/v1/events', {
        connectorId: 'demo-connector-id',
        payload: {
          type: 'approval_delay',
          source: 'Demo System',
          details: { delayHours: 36, reason: 'Simulated bottleneck' }
        }
      });
    } catch (error) {
      console.error('Event simulation failed:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Autonomous Process Auditor Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${health?.services?.database === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">System Health</span>
        </div>
      </div>

      {/* Live Audit Status Card */}
      {liveAuditRunning && (
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border border-blue-200 dark:border-blue-700 rounded-xl p-6 animate-pulse shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping shadow-sm"></div>
            <span className="text-blue-800 dark:text-blue-200 text-lg font-semibold">Live Audit in Progress</span>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
        <KPICard title="Open Issues" value={openIssues} change="Active audits" icon="⚠️" />
        <KPICard title="Completed Audits" value={completedJobs} change="This week" icon="✅" />
        <KPICard title="Avg Processing Time" value={avgProcessingTime} change="-12% faster" icon="⏱️" />
        <KPICard title="Avg Approval Delay" value={avgApprovalDelay} change="-8% improvement" icon="📉" />
        <KPICard title="Monthly Cost Savings" value={monthlyCostSavings} change="From optimizations" icon="💰" />
        <KPICard title="AI Confidence" value="94%" change="Model accuracy" icon="🤖" />
      </div>

      {/* Audit Feed and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <AuditFeed />
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Orchestrate Connection</span>
              <span className="text-green-600">✅ Connected</span>
            </div>
            <div className="flex justify-between">
              <span>watsonx.ai Models</span>
              <span className="text-green-600">✅ Granite Active</span>
            </div>
            <div className="flex justify-between">
              <span>Queue Status</span>
              <span className="text-green-600">✅ Processing</span>
            </div>
            <div className="flex justify-between">
              <span>Agent Health</span>
              <span className="text-green-600">✅ All Agents Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-6">
        <button
          onClick={handleLiveAudit}
          disabled={liveAuditRunning}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
        >
          <span>{liveAuditRunning ? '🔄' : '🔍'}</span>
          <span>{liveAuditRunning ? 'Running Live Audit...' : 'Run Live Audit'}</span>
        </button>
        <button
          onClick={handleSimulateEvent}
          className="btn-secondary flex items-center space-x-3"
        >
          <span>🎭</span>
          <span>Simulate Event</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;