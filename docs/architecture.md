# Architecture Overview

## Components
- Frontend: React + TypeScript
- Backend: Node.js + Fastify + MongoDB
- Orchestrate: IBM watsonx Orchestrate
- AI: watsonx.ai Granite models

## Data Flow
1. Events from connectors -> Backend
2. Backend queues jobs -> Orchestrate agents
3. Agents analyze -> Generate findings
4. Frontend displays results

## Security
- JWT authentication
- Input validation
- CORS enabled