import { FastifyInstance } from 'fastify';
import Job from '../models/Job';
import { auditQueue } from '../services/queueService';

export default async function processRoutes(fastify: FastifyInstance) {
  fastify.post('/api/v1/process', async (request, reply) => {
    const { input } = request.body as { input: string };
    const job = new Job({
      teamId: 'demo-team-id',
      userId: 'demo-user-id',
      inputRef: input,
    });
    await job.save();

    // Add to queue
    await auditQueue.add('processAudit', { jobId: job._id });

    return { jobId: job._id, eta: 10 }; // Estimated time with queue
  });
}