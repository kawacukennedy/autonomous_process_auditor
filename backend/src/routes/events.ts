import { FastifyInstance } from 'fastify';
import Event from '../models/Event';
import Job from '../models/Job';

export default async function eventRoutes(fastify: FastifyInstance) {
  fastify.post('/api/v1/events', async (request, reply) => {
    const { connectorId, payload } = request.body as { connectorId: string; payload: object };
    const event = new Event({
      connectorId,
      rawPayload: payload,
      normalizedPayload: payload, // Mock normalization
    });
    await event.save();
    // Mock job creation
    const job = new Job({
      teamId: 'demo-team-id',
      userId: 'demo-user-id',
      inputRef: event._id.toString(),
    });
    await job.save();
    event.jobId = job._id;
    await event.save();
    return { jobId: job._id };
  });
}