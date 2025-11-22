import { FastifyInstance } from 'fastify';
import AgentTrace from '../models/AgentTrace';

export default async function agentTraceRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/agent-traces/:jobId', async (request, reply) => {
    const { jobId } = request.params as { jobId: string };
    const traces = await AgentTrace.find({ jobId }).sort({ stepIndex: 1 });
    return traces;
  });

  fastify.post('/api/v1/agent-traces', async (request, reply) => {
    const { agentName, jobId, stepIndex, inputs, outputs, toolCalls } = request.body as any;
    const trace = new AgentTrace({ agentName, jobId, stepIndex, inputs, outputs, toolCalls });
    await trace.save();
    return trace;
  });
}