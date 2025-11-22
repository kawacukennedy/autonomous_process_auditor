# 🚀 Autonomous Process Auditor (APA)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5+-green.svg)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

> **Continuously audit, detect, and autonomously remediate workflow inefficiency, compliance drift, and bottlenecks across enterprise systems using IBM watsonx Orchestrate.**

APA is an AI-powered enterprise automation platform that transforms how organizations manage and optimize their business processes. By leveraging IBM watsonx Orchestrate and watsonx.ai, APA provides continuous monitoring, intelligent analysis, and autonomous remediation of workflow inefficiencies.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [💻 Usage](#-usage)
- [🔌 API Documentation](#-api-documentation)
- [🐳 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)

## ✨ Features

### 🔍 **Continuous Process Auditing**
- Real-time monitoring of enterprise workflows
- Automated detection of bottlenecks and inefficiencies
- Compliance drift identification and alerting

### 🤖 **AI-Powered Analysis**
- IBM watsonx.ai Granite models for pattern recognition
- Machine learning-based anomaly detection
- Natural language processing for log analysis

### ⚡ **Autonomous Remediation**
- Automated workflow optimization suggestions
- Policy-based action execution
- Human-in-the-loop approval workflows

### 📊 **Enterprise Dashboard**
- Real-time KPIs and metrics visualization
- Interactive process flow diagrams
- Executive reporting and analytics

### 🔗 **Multi-System Integration**
- RESTful APIs for seamless integration
- Webhook support for event-driven updates
- Connector framework for various enterprise systems

### 🛡️ **Security & Compliance**
- JWT-based authentication and authorization
- Input validation and sanitization
- Audit trails and compliance logging

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   React + TS    │◄──►│   Node.js       │◄──►│   MongoDB       │
│   Tailwind CSS  │    │   Fastify + TS  │    │   Atlas         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Orchestrate   │    │   watsonx.ai    │    │   Connectors    │
│   IBM SaaS      │    │   Granite ML    │    │   Webhooks      │
│   Multi-Agent   │    │   Inference     │    │   APIs          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow
1. **Event Ingestion**: External systems send events via webhooks/APIs
2. **Processing Queue**: Events are queued and processed asynchronously
3. **AI Analysis**: watsonx.ai analyzes patterns and identifies issues
4. **Orchestration**: watsonx Orchestrate coordinates remediation actions
5. **Feedback Loop**: Results are stored and visualized in the dashboard

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Query (TanStack)
- **Charts**: Recharts
- **Routing**: React Router

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Fastify with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with @fastify/jwt
- **Validation**: Built-in Fastify validation
- **Logging**: Pino logger

### DevOps & Deployment
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitLab CI (planned)
- **Orchestration**: Kubernetes (future)
- **Monitoring**: OpenTelemetry (planned)

### AI & Integration
- **Orchestration**: IBM watsonx Orchestrate
- **AI Models**: IBM watsonx.ai Granite family
- **APIs**: RESTful with OpenAPI spec
- **Webhooks**: Event-driven integrations

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB** (local or Atlas)
- **Git** for version control
- **Docker** (optional, for containerized deployment)

### IBM watsonx Requirements
- IBM Cloud account with watsonx access
- watsonx Orchestrate instance
- API keys and credentials (for production)

## 🚀 Installation

### Quick Start with Docker
```bash
# Clone the repository
git clone https://gitlab.com/kawacukennedy/autonomous_process_auditor.git
cd autonomous_process_auditor

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

### Manual Installation

#### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Build and start
npm run build
npm start
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/apa

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# IBM watsonx (for production)
WATSONX_API_KEY=your-api-key
WATSONX_PROJECT_ID=your-project-id
ORCHESTRATE_INSTANCE_URL=your-orchestrate-url

# Server
PORT=3001
NODE_ENV=development
```

## 💻 Usage

### Development Mode
```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend
cd frontend && npm run dev
```

### Production Mode
```bash
# Build and start services
docker-compose -f docker-compose.prod.yml up -d
```

### Demo Mode
The application includes comprehensive demo data:

```bash
# Use demo datasets
cd demo-data/
# Sample events, policies, findings, and traces are available
```

### Key Workflows

#### 1. Process Configuration
- Navigate to `/processes`
- Add new workflow connectors
- Configure monitoring parameters

#### 2. Event Analysis
- Upload or simulate workflow events
- View real-time analysis results
- Review AI-generated insights

#### 3. Remediation Actions
- Approve or reject suggested fixes
- Monitor autonomous execution
- Track remediation success

## 🔌 API Documentation

### Authentication
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/jobs/:id/status` | Get job processing status |
| POST | `/api/v1/process` | Submit analysis request |
| GET | `/api/v1/results/:id` | Retrieve analysis results |
| POST | `/api/v1/actions/:id/execute` | Execute remediation action |
| GET | `/api/v1/findings/:jobId` | Get findings for a job |
| POST | `/api/v1/feedback` | Submit user feedback |

### Webhook Integration
```http
POST /api/v1/events
X-API-Key: your-webhook-key
Content-Type: application/json

{
  "connectorId": "connector-uuid",
  "payload": {
    "eventType": "approval_delay",
    "data": { ... }
  }
}
```

For complete API documentation, see [docs/api.md](docs/api.md).

## 🐳 Deployment

### Docker Deployment
```bash
# Build images
docker-compose build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale backend=3
```

### Kubernetes Deployment
```bash
# Apply manifests
kubectl apply -f k8s/

# Check status
kubectl get pods
kubectl get services
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/apa
JWT_SECRET=production-secret-key
WATSONX_API_KEY=prod-api-key
LOG_LEVEL=info
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
npm run test:watch
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

### Integration Tests
```bash
# Run full stack tests
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/contributing.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Merge Request

### Code Standards
- Use TypeScript for all new code
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Project Maintainers**

- **Lead Developer**: [Your Name]
- **Email**: contact@apa-project.com
- **GitLab**: [@kawacukennedy](https://gitlab.com/kawacukennedy)
- **LinkedIn**: [Your LinkedIn]

**Community**
- **Issues**: [GitLab Issues](https://gitlab.com/kawacukennedy/autonomous_process_auditor/-/issues)
- **Discussions**: [GitLab Discussions](https://gitlab.com/kawacukennedy/autonomous_process_auditor/-/discussions)
- **Wiki**: [Project Wiki](https://gitlab.com/kawacukennedy/autonomous_process_auditor/-/wikis/home)

---

<div align="center">

**Made with ❤️ for enterprise automation**

⭐ Star us on GitLab | 📖 Read the docs | 🚀 Get started

</div>
