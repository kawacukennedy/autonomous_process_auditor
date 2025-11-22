"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectorRoutes;
const uuid_1 = require("uuid");
const Connector_1 = __importDefault(require("../models/Connector"));
async function connectorRoutes(fastify) {
    fastify.post('/api/v1/connectors/register', async (request, reply) => {
        const { type, config } = request.body;
        const connector = new Connector_1.default({
            teamId: 'demo-team-id', // Mock
            type,
            config,
        });
        await connector.save();
        return { id: connector._id, guid: (0, uuid_1.v4)() };
    });
}
