// Main App component with routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header'; // Header component
import Footer from './components/Footer'; // Footer component
import Dashboard from './pages/Dashboard';
import ProcessConfig from './pages/ProcessConfig';
import Input from './pages/Input';
import Findings from './pages/Findings';
import AgentConsole from './pages/AgentConsole';
import Auth from './pages/Auth';
import Reports from './pages/Reports'; // Reports page

const queryClient = new QueryClient();

// App function component
function App() {
  return (
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
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
