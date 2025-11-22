import { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';

export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/health', async (request, reply) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus,
        server: 'running'
      },
      version: process.env.npm_package_version || '1.0.0'
    };
  });

  fastify.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });
}