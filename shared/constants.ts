// Shared constants

export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';

export const SEVERITY_LEVELS = ['low', 'medium', 'high'] as const;

export const JOB_STATUSES = ['pending', 'running', 'failed', 'complete'] as const;