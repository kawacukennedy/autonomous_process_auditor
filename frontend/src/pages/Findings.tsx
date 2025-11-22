// Findings page with visualizations and remediation plans
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { apiClient } from '../api/client';
import jsPDF from 'jspdf';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Findings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const { data: results, isLoading, error, refetch } = useQuery({
    queryKey: ['results', id],
    queryFn: () => apiClient.get(`/api/v1/results/${id}`),
    enabled: !!id,
  });

  if (error) return <div className="p-8">Error loading findings.</div>;

  const feedbackMutation = useMutation({
    mutationFn: (data: any) => apiClient.post('/api/v1/feedback', data),
    onSuccess: () => alert('Feedback submitted!'),
  });

  const executeAction = async (actionId: string) => {
    try {
      await apiClient.put(`/api/v1/actions/${actionId}/execute`, { approved: true });
      alert('Action executed successfully!');
      // Refetch results
      refetch();
    } catch (error) {
      alert('Action execution failed. Manual approval may be required.');
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text('Autonomous Process Auditor Report', 20, 20);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Summary: ${results?.summary || 'Audit completed'}`, 20, 50);
    doc.text('Key Findings:', 20, 70);
    results?.findings?.forEach((finding: any, index: number) => {
      const y = 90 + index * 20;
      doc.text(`${index + 1}. ${finding.summary}`, 20, y);
      doc.text(`Severity: ${finding.severity}`, 30, y + 10);
    });
    doc.text('Recommended Actions:', 20, 150);
    results?.actions?.forEach((action: any, index: number) => {
      const y = 170 + index * 15;
      doc.text(`- ${action.resultJson?.plan || 'Remediation action'}`, 20, y);
    });
    doc.save(`apa-report-${id}.pdf`);
  };

  if (isLoading) return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      <LoadingSkeleton className="h-8 w-64 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="card">
          <LoadingSkeleton className="h-6 w-48 mb-6" />
          <LoadingSkeleton className="h-64 w-full" />
        </div>
        <div className="card">
          <LoadingSkeleton className="h-6 w-48 mb-6" />
          <LoadingSkeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );

  // Generate charts from findings data
  const findings = results?.findings || [];
  const severityCount = findings.reduce((acc: any, finding: any) => {
    acc[finding.severity] = (acc[finding.severity] || 0) + 1;
    return acc;
  }, {});

  const timelineData = [
    { time: '09:00', delays: severityCount.high || 0 },
    { time: '10:00', delays: severityCount.medium || 0 },
    { time: '11:00', delays: severityCount.low || 0 },
    { time: '12:00', delays: severityCount.high || 0 },
    { time: '13:00', delays: severityCount.medium || 0 },
    { time: '14:00', delays: severityCount.low || 0 },
    { time: '15:00', delays: severityCount.high || 0 },
  ];

  const heatmapData = [
    { process: 'Approval', frequency: severityCount.high || 0 },
    { process: 'Review', frequency: severityCount.medium || 0 },
    { process: 'Final Sign-off', frequency: severityCount.low || 0 },
    { process: 'Audit', frequency: severityCount.high || 0 },
    { process: 'Validation', frequency: severityCount.medium || 0 },
  ];

  // Swimlane data: stages with delays
  const swimlaneData = [
    { stage: 'Initiation', start: 0, end: 2, delay: severityCount.low || 0 },
    { stage: 'Approval', start: 2, end: 5, delay: severityCount.high || 0 },
    { stage: 'Review', start: 5, end: 7, delay: severityCount.medium || 0 },
    { stage: 'Completion', start: 7, end: 8, delay: severityCount.low || 0 },
  ];

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 enterprise-bg animate-slide-up">
      <h1 className="text-2xl font-bold mb-6">Findings & Recommendations</h1>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="animate-stagger">
          <div className="card">
        {/* Timeline Chart */}
        <div className="card animate-stagger">
          <h3 className="text-large mb-6">Approval Delay Timeline</h3>
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
        <div className="card animate-stagger">
          <h3 className="text-large mb-6">Delay Frequency by Process</h3>
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
        {/* Swimlane Chart */}
        <div className="card animate-stagger">
          <h3 className="text-large mb-6">Process Swimlane (Stuck Approvals)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={swimlaneData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="stage" type="category" />
              <Tooltip />
              <Bar dataKey="delay" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Remediation Plan Section */}
      <div className="card mb-8">
        <h3 className="text-large mb-6">Remediation Plan</h3>
        <ol className="list-decimal list-inside space-y-2">
          {results?.actions?.map((action: any, index: number) => (
            <li key={index}>{action.resultJson?.plan || 'Remediation action'}</li>
          )) || <li>No actions available</li>}
        </ol>
      </div>
      {/* Action Control */}
      <div className="card mb-8">
        <h3 className="text-large mb-6">Remediation Control</h3>
         <div className="flex items-center space-x-4 mb-4">
           <label className="flex items-center">
             <input type="radio" name="actionMode" value="propose" defaultChecked className="mr-2" />
             Propose Only
           </label>
           <label className="flex items-center">
             <input type="radio" name="actionMode" value="apply" className="mr-2" />
             Apply Now
           </label>
         </div>
         <div className="flex space-x-4">
           {results?.actions?.map((action: any) => (
             <button
               key={action._id}
               onClick={() => executeAction(action._id)}
               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
             >
               ✅ Execute: {action.actionType}
             </button>
           ))}
           <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-200">
             📋 Request Manual Approval
           </button>
           <button
             onClick={downloadReport}
             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
           >
             📥 Download Executive Report
           </button>
         </div>
       </div>
      {/* Feedback Section */}
      <div className="card">
        <h3 className="text-large mb-6">Provide Feedback</h3>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            feedbackMutation.mutate({ userId: 'demo-user', findingId: results?.findings?.[0]?._id, rating, comment });
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-3 border rounded"
            >
              <option value="">Select rating</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="neutral">Neutral</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Comments</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-20 p-3 border rounded"
              placeholder="Your feedback..."
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Findings;