import { Queue } from 'bullmq';

export const auditQueue = new Queue('auditJobs', {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});