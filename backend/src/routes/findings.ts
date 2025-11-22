import { FastifyInstance } from 'fastify';
import Finding from '../models/Finding';

export default async function findingRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/findings/:jobId', async (request, reply) => {
    const { jobId } = request.params as { jobId: string };
    const findings = await Finding.find({ jobId });
    return findings;
  });

  fastify.post('/api/v1/findings', async (request, reply) => {
    const { jobId, severity, summary, details, suggestedActions } = request.body as any;
    const finding = new Finding({ jobId, severity, summary, details, suggestedActions });
    await finding.save();
    return finding;
  });
}