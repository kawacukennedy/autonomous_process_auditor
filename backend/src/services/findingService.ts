import Finding from '../models/Finding';

export class FindingService {
  static async createFinding(jobId: string, severity: string, summary: string, details: object, suggestedActions: string[]) {
    const finding = new Finding({ jobId, severity, summary, details, suggestedActions });
    await finding.save();
    return finding;
  }

  static async getFindingsByJob(jobId: string) {
    return await Finding.find({ jobId });
  }
}