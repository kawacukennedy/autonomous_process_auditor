import { FastifyRequest, FastifyReply } from 'fastify';

const requests = new Map<string, number[]>();

export function rateLimit(maxRequests: number, windowMs: number) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const ip = request.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!requests.has(ip)) {
      requests.set(ip, []);
    }

    const userRequests = requests.get(ip)!;
    const recentRequests = userRequests.filter(time => time > windowStart);

    if (recentRequests.length >= maxRequests) {
      reply.code(429).send({ error: 'Too many requests' });
      return;
    }

    recentRequests.push(now);
    requests.set(ip, recentRequests);
  };
}