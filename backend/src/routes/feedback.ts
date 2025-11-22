import { FastifyInstance } from 'fastify';

export default async function feedbackRoutes(fastify: FastifyInstance) {
  fastify.post('/api/v1/feedback', async (request, reply) => {
    const { findingId, rating, comment } = request.body as { findingId: string; rating: number; comment: string };
    // Mock save feedback
    return { status: 'saved' };
  });
}