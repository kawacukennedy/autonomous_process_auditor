// AuditFeed component for displaying live audit events
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

interface Job {
  _id: string;
  status: string;
  createdAt: string;
}

const AuditFeed: React.FC = () => {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => apiClient.get('/api/v1/jobs'),
    refetchInterval: 5000, // Poll every 5 seconds for real-time
  });

  const events = jobs?.slice(0, 10).map((job: Job) => ({
    id: job._id,
    type: 'job',
    message: `Job ${job.status}: Audit processing`,
    timestamp: job.createdAt,
    severity: job.status === 'complete' ? 'low' : 'medium' as 'low' | 'medium' | 'high',
  })) || [];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md m-2">
      <h3 className="text-lg font-semibold mb-4">Live Audit Feed</h3>
      <ul className="space-y-2">
        {events.map(event => (
          <li key={event.id} className="flex justify-between items-center p-2 border-b">
            <div>
              <p className="font-medium">{event.message}</p>
              <p className="text-sm text-gray-500">{event.timestamp}</p>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${
              event.severity === 'high' ? 'bg-red-100 text-red-800' :
              event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {event.severity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditFeed;