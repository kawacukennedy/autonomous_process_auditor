"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = processRoutes;
const Job_1 = __importDefault(require("../models/Job"));
async function processRoutes(fastify) {
    fastify.post('/api/v1/process', async (request, reply) => {
        const { input } = request.body;
        const job = new Job_1.default({
            teamId: 'demo-team-id',
            userId: 'demo-user-id',
            inputRef: input,
        });
        await job.save();
        // Mock processing
        setTimeout(async () => {
            job.status = 'complete';
            job.resultRef = 'mock-result-id';
            await job.save();
        }, 5000);
        return { jobId: job._id, eta: 5 };
    });
}
