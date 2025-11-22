"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = actionRoutes;
async function actionRoutes(fastify) {
    fastify.post('/api/v1/actions/:id/execute', async (request, reply) => {
        const { id } = request.params;
        // Mock execution
        return { status: 'executed', result: 'Mock remediation applied' };
    });
}
