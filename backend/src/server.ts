import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import connectorRoutes from './routes/connectors';
import eventRoutes from './routes/events';
import processRoutes from './routes/process';
import jobRoutes from './routes/jobs';
import resultRoutes from './routes/results';
import actionRoutes from './routes/actions';
import feedbackRoutes from './routes/feedback';

dotenv.config();

const fastify = Fastify({ logger: true });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apa')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Register plugins
fastify.register(cors);
fastify.register(jwt, { secret: process.env.JWT_SECRET || 'secret' });

// Register routes
fastify.register(authRoutes);
fastify.register(connectorRoutes);
fastify.register(eventRoutes);
fastify.register(processRoutes);
fastify.register(jobRoutes);
fastify.register(resultRoutes);
fastify.register(actionRoutes);
fastify.register(feedbackRoutes);

// Routes
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();