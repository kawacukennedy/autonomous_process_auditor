// Main App component with routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import Header from './components/Header'; // Header component
import Footer from './components/Footer'; // Footer component
import Notification from './components/Notification';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import ProcessConfig from './pages/ProcessConfig';
import Input from './pages/Input';
import Findings from './pages/Findings';
import AgentConsole from './pages/AgentConsole';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import Reports from './pages/Reports'; // Reports page

const queryClient = new QueryClient();

// Connect to Socket.IO
const socket = io('http://localhost:3001');

interface NotificationType {
  message: string;
  type: 'success' | 'error' | 'info';
}

// App function component
function App() {
  const [notification, setNotification] = useState<NotificationType | null>(null);

  useEffect(() => {
    socket.on('jobUpdate', (data) => {
      setNotification({ message: `Job ${data.jobId} updated to ${data.status}`, type: 'info' });
    });

    return () => {
      socket.off('jobUpdate');
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
            <Header />
            {/* Main content area */}
            <main className="flex-grow">
              {/* Application Routes */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/processes" element={<ProcessConfig />} />
                <Route path="/input" element={<Input />} />
                <Route path="/findings/:id" element={<Findings />} />
                 <Route path="/agents/:agentId" element={<AgentConsole />} />
                 <Route path="/login" element={<Auth />} />
                 <Route path="/forgot-password" element={<ForgotPassword />} />
                 <Route path="/reports" element={<Reports />} />
              </Routes>
            </main>
            <Footer />
            {notification && (
              <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(null)}
              />
            )}
          </div>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
