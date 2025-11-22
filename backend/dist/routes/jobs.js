"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = jobRoutes;
const Job_1 = __importDefault(require("../models/Job"));
async function jobRoutes(fastify) {
    fastify.get('/api/v1/jobs/:id/status', async (request, reply) => {
        const { id } = request.params;
        const job = await Job_1.default.findById(id);
        if (!job)
            return reply.code(404).send({ error: 'Job not found' });
        return { status: job.status, progress: job.status === 'complete' ? 100 : 50 };
    });
}
