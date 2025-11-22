import { FastifyInstance } from 'fastify';
import { createApp } from '../src/server'; // Assume export app

describe('Process Routes', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createApp(); // Mock or real
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a job', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/process',
      payload: { input: 'test input' }
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty('jobId');
  });
});