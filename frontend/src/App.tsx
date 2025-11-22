import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-white text-xl font-bold">APA</h1>
            <ul className="flex space-x-4">
              <li><a href="/" className="text-white">Dashboard</a></li>
              <li><a href="/processes" className="text-white">Processes</a></li>
              <li><a href="/input" className="text-white">Input</a></li>
              <li><a href="/findings" className="text-white">Findings</a></li>
              <li><a href="/agents" className="text-white">Agents</a></li>
              <li><a href="/reports" className="text-white">Reports</a></li>
              <li><a href="/login" className="text-white">Login</a></li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/processes" element={<ProcessConfig />} />
          <Route path="/input" element={<Input />} />
          <Route path="/findings/:id" element={<Findings />} />
          <Route path="/agents/:agentId" element={<AgentConsole />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
