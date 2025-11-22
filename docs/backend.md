# Backend Documentation

## Overview
The backend is built with Node.js, Fastify, and TypeScript, using MongoDB for data storage.

## API Endpoints
- `/api/v1/auth/login` - User authentication
- `/api/v1/connectors/*` - Connector management
- `/api/v1/events` - Event ingestion
- `/api/v1/process` - Process analysis
- `/api/v1/jobs/*` - Job status
- `/api/v1/results/*` - Analysis results
- `/api/v1/actions/*` - Action execution
- `/api/v1/feedback` - User feedback
- `/api/v1/teams` - Team management
- `/api/v1/findings/*` - Findings retrieval
- `/api/v1/agent-traces/*` - Agent trace logs
- `/api/v1/reports/*` - Report generation

## Models
- User
- Team
- Connector
- Event
- Job
- Finding
- Action
- AgentTrace
- Report
- Feedback

## Running
```bash
cd backend
npm install
npm run dev
```