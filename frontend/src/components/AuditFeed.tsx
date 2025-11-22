// AuditFeed component for displaying live audit events
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

interface Job {
  _id: string;
  status: string;
  createdAt: string;
}

interface Event {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

const AuditFeed: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const { data: jobs, refetch } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => apiClient.get('/api/v1/jobs'),
  });

  useEffect(() => {
    socket.on('jobUpdate', () => {
      refetch();
    });

    return () => {
      socket.off('jobUpdate');
    };
  }, [refetch]);

  const allEvents: Event[] = jobs?.slice(0, 10).map((job: Job) => ({
    id: job._id,
    type: 'job',
    message: `Job ${job.status}: Audit processing`,
    timestamp: job.createdAt,
    severity: job.status === 'complete' ? 'low' : 'medium' as 'low' | 'medium' | 'high',
  })) || [];

  const events = filter === 'all' ? allEvents : allEvents.filter(e => e.severity === filter);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-large">Live Audit Feed</h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'low' | 'medium' | 'high')}
          className="input-field text-sm max-w-xs"
        >
          <option value="all">All Severities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>
      <ul className="space-y-4 animate-slide-up">
        {events.map(event => (
          <li key={event.id} className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md hover:scale-105 animate-fade-in">
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white mb-1">{event.message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{event.timestamp}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              event.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {event.severity.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditFeed;