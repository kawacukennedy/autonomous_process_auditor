import { FastifyInstance } from 'fastify';

export default async function resultRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/results/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    // Mock result
    return {
      summary: 'Mock analysis summary',
      recommendations: ['Fix bottleneck in approval process'],
      traces: []
    };
  });
}