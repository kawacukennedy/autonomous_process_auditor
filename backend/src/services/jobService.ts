import Job from '../models/Job';

export class JobService {
  static async createJob(teamId: string, userId: string, inputRef: string) {
    const job = new Job({ teamId, userId, inputRef });
    await job.save();
    return job;
  }

  static async getJobStatus(jobId: string) {
    const job = await Job.findById(jobId);
    return job?.status;
  }
}