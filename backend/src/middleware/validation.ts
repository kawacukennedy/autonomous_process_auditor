import { FastifyRequest, FastifyReply } from 'fastify';

export function validateBody(schema: any) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Basic validation placeholder
      if (!request.body) {
        reply.code(400).send({ error: 'Body required' });
      }
    } catch (err) {
      reply.code(400).send({ error: 'Validation failed' });
    }
  };
}