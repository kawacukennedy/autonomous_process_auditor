import { FastifyInstance } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import Connector from '../models/Connector';

export default async function connectorRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/connectors', async (request, reply) => {
    const connectors = await Connector.find({ teamId: 'demo-team-id' });
    return connectors;
  });

  fastify.post('/api/v1/connectors/register', async (request, reply) => {
    const { type, config } = request.body as { type: string; config: object };
    const connector = new Connector({
      teamId: 'demo-team-id', // Mock
      type,
      config,
    });
    await connector.save();
    return { id: connector._id, guid: uuidv4() };
  });

  fastify.put('/api/v1/connectors/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const update = request.body as any;
    const connector = await Connector.findByIdAndUpdate(id, update, { new: true });
    return connector;
  });
}