import { FastifyInstance } from 'fastify';
import User from '../models/User';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/api/v1/auth/login', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    // Mock login for demo
    if (email === 'demo' && password === 'demo') {
      const token = fastify.jwt.sign({ email, role: 'admin' });
      return { token, user: { email, role: 'admin' } };
    }
    reply.code(401).send({ error: 'Invalid credentials' });
  });
}