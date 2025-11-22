import { FastifyInstance } from 'fastify';
import Report from '../models/Report';

export default async function reportRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/reports/:teamId', async (request, reply) => {
    const { teamId } = request.params as { teamId: string };
    const reports = await Report.find({ teamId });
    return reports;
  });

  fastify.post('/api/v1/reports', async (request, reply) => {
    const { teamId, jobId, pdfPath } = request.body as any;
    const report = new Report({ teamId, jobId, pdfPath });
    await report.save();
    return report;
  });
}