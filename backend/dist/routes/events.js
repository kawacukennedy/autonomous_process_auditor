"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = eventRoutes;
const Event_1 = __importDefault(require("../models/Event"));
const Job_1 = __importDefault(require("../models/Job"));
async function eventRoutes(fastify) {
    fastify.post('/api/v1/events', async (request, reply) => {
        const { connectorId, payload } = request.body;
        const event = new Event_1.default({
            connectorId,
            rawPayload: payload,
            normalizedPayload: payload, // Mock normalization
        });
        await event.save();
        // Mock job creation
        const job = new Job_1.default({
            teamId: 'demo-team-id',
            userId: 'demo-user-id',
            inputRef: event._id.toString(),
        });
        await job.save();
        event.jobId = job._id;
        await event.save();
        return { jobId: job._id };
    });
}
