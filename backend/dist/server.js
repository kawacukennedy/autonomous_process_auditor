"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const connectors_1 = __importDefault(require("./routes/connectors"));
const events_1 = __importDefault(require("./routes/events"));
const process_1 = __importDefault(require("./routes/process"));
const jobs_1 = __importDefault(require("./routes/jobs"));
const results_1 = __importDefault(require("./routes/results"));
const actions_1 = __importDefault(require("./routes/actions"));
const feedback_1 = __importDefault(require("./routes/feedback"));
dotenv_1.default.config();
const fastify = (0, fastify_1.default)({ logger: true });
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apa')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// Register plugins
fastify.register(cors_1.default);
fastify.register(jwt_1.default, { secret: process.env.JWT_SECRET || 'secret' });
// Register routes
fastify.register(auth_1.default);
fastify.register(connectors_1.default);
fastify.register(events_1.default);
fastify.register(process_1.default);
fastify.register(jobs_1.default);
fastify.register(results_1.default);
fastify.register(actions_1.default);
fastify.register(feedback_1.default);
// Routes
fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
});
// Start server
const start = async () => {
    try {
        await fastify.listen({ port: 3001, host: '0.0.0.0' });
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
