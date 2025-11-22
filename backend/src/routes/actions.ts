import { FastifyInstance } from 'fastify';

export default async function actionRoutes(fastify: FastifyInstance) {
  fastify.post('/api/v1/actions/:id/execute', async (request, reply) => {
    const { id } = request.params as { id: string };
    // Mock execution
    return { status: 'executed', result: 'Mock remediation applied' };
  });
}