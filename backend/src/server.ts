import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';
import connectorRoutes from './routes/connectors';
import eventRoutes from './routes/events';
import processRoutes from './routes/process';
import jobRoutes from './routes/jobs';
import resultRoutes from './routes/results';
import actionRoutes from './routes/actions';
import feedbackRoutes from './routes/feedback';
import teamRoutes from './routes/teams';
import findingRoutes from './routes/findings';
import agentTraceRoutes from './routes/agentTraces';
import reportRoutes from './routes/reports';
import healthRoutes from './routes/health';
import errorHandler from './middleware/errorHandler';
import './workers/auditWorker';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

// Load environment variables
dotenv.config();

// Initialize OpenTelemetry
const sdk = new NodeSDK({
  serviceName: 'apa-backend',
  traceExporter: new JaegerExporter({
    endpoint: 'http://localhost:14268/api/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Create Fastify instance with logging
const fastify = Fastify({ logger: true });

// Create HTTP server for Socket.IO
const server = createServer(fastify.server);

// Attach Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Set socket service
import { setSocketServer } from './services/socketService';
setSocketServer(io);

// Connect to MongoDB
connectDB();

// Register plugins
fastify.register(cors);
fastify.register(jwt, { secret: process.env.JWT_SECRET || 'secret' });
fastify.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute'
});

// Register error handler
fastify.register(errorHandler);

// Register API routes
fastify.register(authRoutes);
fastify.register(connectorRoutes);
fastify.register(eventRoutes);
fastify.register(processRoutes);
fastify.register(jobRoutes);
fastify.register(resultRoutes);
fastify.register(actionRoutes);
fastify.register(feedbackRoutes);
fastify.register(teamRoutes);
fastify.register(findingRoutes);
fastify.register(agentTraceRoutes);
fastify.register(reportRoutes);
fastify.register(healthRoutes);

// Routes
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Server startup function
const start = async () => {
  try {
    server.listen(3001, '0.0.0.0', () => {
      console.log('Server listening on port 3001');
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();