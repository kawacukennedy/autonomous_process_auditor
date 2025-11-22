"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = resultRoutes;
async function resultRoutes(fastify) {
    fastify.get('/api/v1/results/:id', async (request, reply) => {
        const { id } = request.params;
        // Mock result
        return {
            summary: 'Mock analysis summary',
            recommendations: ['Fix bottleneck in approval process'],
            traces: []
        };
    });
}
