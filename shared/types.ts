// Shared types for the application

// User interface
export interface User {
  id: string;
  email: string;
  role: string;
}

// Connector interface
export interface Connector {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
}

// Event interface
export interface Event {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

// Job interface
export interface Job {
  id: string;
  status: 'pending' | 'running' | 'failed' | 'complete';
  inputRef: string;
  resultRef?: string;
}

export interface Finding {
  id: string;
  severity: 'low' | 'medium' | 'high';
  summary: string;
  suggestedActions: string[];
}