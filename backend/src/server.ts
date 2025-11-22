import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
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
import errorHandler from './middleware/errorHandler';

// Load environment variables
dotenv.config();

// Create Fastify instance with logging
const fastify = Fastify({ logger: true });

// Connect to MongoDB
connectDB();

// Register plugins
fastify.register(cors);
fastify.register(jwt, { secret: process.env.JWT_SECRET || 'secret' });

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

// Routes
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Server startup function
const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();