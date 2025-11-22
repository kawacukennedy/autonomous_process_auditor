import { FastifyInstance } from 'fastify';
import Finding from '../models/Finding';
import Action from '../models/Action';
import AgentTrace from '../models/AgentTrace';

export default async function resultRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/results/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const findings = await Finding.find({ jobId: id });
    const actions = await Action.find({ findingId: { $in: findings.map(f => f._id) } });
    const traces = await AgentTrace.find({ jobId: id }).sort({ stepIndex: 1 });

    return {
      summary: `Analysis complete with ${findings.length} findings`,
      findings,
      actions,
      traces
    };
  });
}