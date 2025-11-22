import { FastifyInstance } from 'fastify';

export default function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error);
    reply.code(500).send({ error: 'Internal Server Error' });
  });
}