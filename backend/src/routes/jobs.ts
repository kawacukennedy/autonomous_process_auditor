import { FastifyInstance } from 'fastify';
import Job from '../models/Job';

export default async function jobRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/jobs', async (request, reply) => {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(20);
    return jobs;
  });

  fastify.get('/api/v1/jobs/:id/status', async (request, reply) => {
    const { id } = request.params as { id: string };
    const job = await Job.findById(id);
    if (!job) return reply.code(404).send({ error: 'Job not found' });
    return { status: job.status, progress: job.status === 'complete' ? 100 : 50 };
  });
}