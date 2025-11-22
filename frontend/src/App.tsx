// Main App component with routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import ProcessConfig from './pages/ProcessConfig';
import Input from './pages/Input';
import Findings from './pages/Findings';
import AgentConsole from './pages/AgentConsole';
import Auth from './pages/Auth';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        {/* Main content area */}
        <main className="flex-grow">
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
  );
}

export default App;
