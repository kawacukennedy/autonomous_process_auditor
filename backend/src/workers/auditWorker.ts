import { Worker } from 'bullmq';
import Job from '../models/Job';
import Finding from '../models/Finding';
import Action from '../models/Action';
import AgentTrace from '../models/AgentTrace';
import { analyzeEvents, generateRemediationPlan } from '../services/watsonxService';
import { runAuditorAgent, runRecommenderAgent } from '../services/orchestrateService';
import { emitJobUpdate } from '../services/socketService';

// Simulate Orchestrate + watsonx.ai analysis
const simulateAnalysis = async (input: string) => {
  // Parse input as events (mock)
  const events = input.split('\n').map(line => ({ log: line }));

  // Run Auditor Agent
  const auditorResult = await runAuditorAgent(events);

  // Use watsonx.ai for detailed analysis
  const patterns = await analyzeEvents(events);

  // Convert patterns to findings
  const findings = patterns.map(pattern => ({
    severity: pattern.severity,
    summary: pattern.description,
    details: { type: pattern.type },
    suggestedActions: ['Automate remediation', 'Notify stakeholders']
  }));

  return findings;
};

const worker = new Worker('auditJobs', async (job) => {
  const { jobId } = job.data;

  // Update job status to running
  const dbJob = await Job.findById(jobId);
  if (!dbJob) throw new Error('Job not found');
  dbJob.status = 'running';
  await dbJob.save();
  emitJobUpdate(jobId, 'running');

  // Create agent trace for Auditor
  const auditorResult = await runAuditorAgent([{ log: dbJob.inputRef }]);
  const auditorTrace = new AgentTrace({
    agentName: 'Auditor',
    jobId,
    stepIndex: 1,
    inputs: { events: [{ log: dbJob.inputRef }] },
    outputs: auditorResult.trace,
    toolCalls: ['watsonx.ai analyze'],
    timestamp: new Date()
  });
  await auditorTrace.save();

  // Simulate analysis
  const findingsData = await simulateAnalysis(dbJob.inputRef);

  // Create findings
  const createdFindings = [];
  for (const findingData of findingsData) {
    const finding = new Finding({
      jobId,
      ...findingData
    });
    await finding.save();
    createdFindings.push(finding);
  }

  // Generate remediation plans
  const plans = await generateRemediationPlan(createdFindings);

  // Create actions based on plans
  for (const plan of plans) {
    const action = new Action({
      findingId: plan.findingId,
      actionType: 'remediation',
      targetSystem: 'Integrated System',
      status: 'proposed',
      resultJson: { plan: plan.plan, steps: plan.steps }
    });
    await action.save();
  }

  // Run Recommender Agent
  const recommenderResult = await runRecommenderAgent(createdFindings);
  const recommenderTrace = new AgentTrace({
    agentName: 'Recommender',
    jobId,
    stepIndex: 2,
    inputs: { findings: createdFindings },
    outputs: recommenderResult.trace,
    toolCalls: ['watsonx.ai generate plan'],
    timestamp: new Date()
  });
  await recommenderTrace.save();

  // Update job to complete
  dbJob.status = 'complete';
  dbJob.resultRef = 'findings-generated';
  await dbJob.save();
  emitJobUpdate(jobId, 'complete');

  return { success: true };
}, {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  }
});

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed: ${err.message}`);
});

export default worker;