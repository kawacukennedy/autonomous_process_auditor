import { FastifyInstance } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import Connector from '../models/Connector';

export default async function connectorRoutes(fastify: FastifyInstance) {
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
}