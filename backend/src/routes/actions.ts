import { FastifyInstance } from 'fastify';
import Action from '../models/Action';

export default async function actionRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/actions/:findingId', async (request, reply) => {
    const { findingId } = request.params as { findingId: string };
    const actions = await Action.find({ findingId });
    return actions;
  });

  fastify.post('/api/v1/actions', async (request, reply) => {
    const { findingId, actionType, targetSystem } = request.body as any;
    const action = new Action({ findingId, actionType, targetSystem });
    await action.save();
    return action;
  });

  fastify.put('/api/v1/actions/:id/execute', async (request, reply) => {
    const { id } = request.params as { id: string };
    const action = await Action.findByIdAndUpdate(id, { status: 'executed', executedAt: new Date() }, { new: true });
    return action;
  });
}