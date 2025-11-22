"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = feedbackRoutes;
async function feedbackRoutes(fastify) {
    fastify.post('/api/v1/feedback', async (request, reply) => {
        const { findingId, rating, comment } = request.body;
        // Mock save feedback
        return { status: 'saved' };
    });
}
