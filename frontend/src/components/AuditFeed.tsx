// AuditFeed component for displaying live audit events
import React from 'react';

interface AuditEvent {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

const AuditFeed: React.FC = () => {
  const events: AuditEvent[] = [
    { id: '1', type: 'approval_delay', message: 'Approval delayed in HR system', timestamp: '2025-11-22T10:00:00Z', severity: 'medium' },
    { id: '2', type: 'compliance', message: 'Compliance check passed', timestamp: '2025-11-22T09:30:00Z', severity: 'low' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
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