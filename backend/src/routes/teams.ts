import { FastifyInstance } from 'fastify';
import Team from '../models/Team';

export default async function teamRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/teams', async (request, reply) => {
    const teams = await Team.find();
    return teams;
  });

  fastify.post('/api/v1/teams', async (request, reply) => {
    const { name } = request.body as { name: string };
    const team = new Team({ name });
    await team.save();
    return team;
  });
}