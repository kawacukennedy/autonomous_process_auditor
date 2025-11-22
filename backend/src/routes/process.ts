import { FastifyInstance } from 'fastify';
import Job from '../models/Job';

export default async function processRoutes(fastify: FastifyInstance) {
  fastify.post('/api/v1/process', async (request, reply) => {
    const { input } = request.body as { input: string };
    const job = new Job({
      teamId: 'demo-team-id',
      userId: 'demo-user-id',
      inputRef: input,
    });
    await job.save();
    // Mock processing
    setTimeout(async () => {
      job.status = 'complete';
      job.resultRef = 'mock-result-id';
      await job.save();
    }, 5000);
    return { jobId: job._id, eta: 5 };
  });
}