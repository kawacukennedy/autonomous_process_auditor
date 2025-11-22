"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
async function authRoutes(fastify) {
    fastify.post('/api/v1/auth/login', async (request, reply) => {
        const { email, password } = request.body;
        // Mock login for demo
        if (email === 'demo' && password === 'demo') {
            const token = fastify.jwt.sign({ email, role: 'admin' });
            return { token, user: { email, role: 'admin' } };
        }
        reply.code(401).send({ error: 'Invalid credentials' });
    });
}
