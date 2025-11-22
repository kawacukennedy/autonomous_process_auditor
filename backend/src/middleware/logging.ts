import { FastifyRequest, FastifyReply } from 'fastify';

export async function logRequest(request: FastifyRequest, reply: FastifyReply) {
  console.log(`${request.method} ${request.url} - ${new Date().toISOString()}`);
}