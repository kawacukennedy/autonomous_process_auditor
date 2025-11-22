# API Documentation

## Authentication
POST /api/v1/auth/login
- Body: { email, password }
- Response: { token, user }

## Connectors
POST /api/v1/connectors/register
- Body: { type, config }
- Response: { id, guid }

## Events
POST /api/v1/events
- Body: { connectorId, payload }
- Response: { jobId }

## Process
POST /api/v1/process
- Body: { input }
- Response: { jobId, eta }

## Jobs
GET /api/v1/jobs/:id/status
- Response: { status, progress }

## Results
GET /api/v1/results/:id
- Response: { summary, recommendations, traces }

## Actions
POST /api/v1/actions/:id/execute
- Response: { status, result }

## Feedback
POST /api/v1/feedback
- Body: { findingId, rating, comment }
- Response: { status }

## Teams
GET /api/v1/teams
- Response: [teams]

POST /api/v1/teams
- Body: { name }
- Response: team

## Findings
GET /api/v1/findings/:jobId
- Response: [findings]

POST /api/v1/findings
- Body: { jobId, severity, summary, details, suggestedActions }
- Response: finding

## Agent Traces
GET /api/v1/agent-traces/:jobId
- Response: [traces]

POST /api/v1/agent-traces
- Body: { agentName, jobId, stepIndex, inputs, outputs, toolCalls }
- Response: trace

## Reports
GET /api/v1/reports/:teamId
- Response: [reports]

POST /api/v1/reports
- Body: { teamId, jobId, pdfPath }
- Response: report