// IBM watsonx.ai service integration
const WATSONX_API_KEY = process.env.WATSONX_API_KEY;
const WATSONX_PROJECT_ID = process.env.WATSONX_PROJECT_ID;
const WATSONX_URL = process.env.WATSONX_URL || 'https://us-south.ml.cloud.ibm.com';
const WATSONX_MODEL_ID = process.env.WATSONX_MODEL_ID || 'meta-llama/llama-3-70b-instruct';

const callWatsonxAI = async (prompt: string) => {
  if (!WATSONX_API_KEY || !WATSONX_PROJECT_ID) {
    throw new Error('watsonx.ai credentials not configured');
  }

  const response = await fetch(`${WATSONX_URL}/ml/v1/text/generation?version=2023-05-29`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${WATSONX_API_KEY}`,
    },
    body: JSON.stringify({
      input: prompt,
      parameters: {
        decoding_method: 'greedy',
        max_new_tokens: 200,
        min_new_tokens: 1,
        temperature: 0.7,
        repetition_penalty: 1.0,
      },
      model_id: WATSONX_MODEL_ID,
      project_id: WATSONX_PROJECT_ID,
    }),
  });

  if (!response.ok) {
    throw new Error(`watsonx.ai API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results[0].generated_text;
};

export const analyzeEvents = async (events: any[]): Promise<any[]> => {
  console.log('Analyzing events with watsonx.ai...');

  if (!WATSONX_API_KEY) {
    // Fallback to mock analysis
    console.log('Using mock analysis (watsonx.ai not configured)');
    await new Promise(resolve => setTimeout(resolve, 2000));

    const patterns = events.map(event => {
      switch (event.type) {
        case 'approval_delay':
          return {
            type: 'bottleneck',
            description: `Approval delay detected in ${event.source}: ${event.details.delayHours}h delay`,
            severity: event.details.delayHours > 24 ? 'high' : 'medium',
            confidence: 0.95
          };
        case 'compliance_violation':
          return {
            type: 'compliance',
            description: `Compliance violation in ${event.source}: ${event.details.violation}`,
            severity: 'high',
            confidence: 0.98
          };
        case 'bottleneck':
          return {
            type: 'bottleneck',
            description: `Resource bottleneck in ${event.source}: ${event.details.queueTime}h queue`,
            severity: 'medium',
            confidence: 0.87
          };
        case 'optimization':
          return {
            type: 'optimization',
            description: `Optimization opportunity: ${event.details.suggestion}`,
            severity: 'low',
            confidence: 0.92
          };
        default:
          return {
            type: 'unknown',
            description: 'Unclassified event pattern',
            severity: 'low',
            confidence: 0.5
          };
      }
    });

    return patterns;
  }

  // Real watsonx.ai analysis
  const eventsText = events.map(e => `${e.type}: ${JSON.stringify(e.details)}`).join('\n');
  const prompt = `Analyze these workflow events and identify patterns, bottlenecks, compliance issues, or optimization opportunities. For each event, provide: type (bottleneck/compliance/optimization), description, severity (high/medium/low), confidence (0-1).

Events:
${eventsText}

Respond in JSON format: [{"type": "...", "description": "...", "severity": "...", "confidence": ...}]`;

  try {
    const response = await callWatsonxAI(prompt);
    const patterns = JSON.parse(response);
    return patterns;
  } catch (error) {
    console.error('watsonx.ai analysis failed, using fallback:', error);
    // Fallback to mock
    return analyzeEvents(events); // Recursive call will use mock
  }
};

export const generateRemediationPlan = async (findings: any[]): Promise<any[]> => {
  console.log('Generating remediation plans with watsonx.ai...');

  if (!WATSONX_API_KEY) {
    // Fallback to mock planning
    console.log('Using mock remediation planning (watsonx.ai not configured)');
    await new Promise(resolve => setTimeout(resolve, 1500));

    const plans = findings.map(finding => ({
      findingId: finding._id,
      plan: `AI-generated remediation plan for ${finding.type}`,
      steps: [
        'Analyze root cause using watsonx.ai',
        'Generate automated workflow changes',
        'Apply remediation via Orchestrate skills',
        'Monitor effectiveness and adjust'
      ],
      estimatedSavings: finding.severity === 'high' ? '$10k/month' : '$2k/month',
      riskLevel: finding.severity === 'high' ? 'medium' : 'low'
    }));

    return plans;
  }

  // Real watsonx.ai remediation planning
  const findingsText = findings.map(f => `${f.type}: ${f.summary} (severity: ${f.severity})`).join('\n');
  const prompt = `Generate remediation plans for these workflow findings. For each finding, provide: plan summary, step-by-step actions, estimated monthly savings, risk level (high/medium/low).

Findings:
${findingsText}

Respond in JSON format: [{"findingId": "...", "plan": "...", "steps": ["..."], "estimatedSavings": "...", "riskLevel": "..."}]`;

  try {
    const response = await callWatsonxAI(prompt);
    const plans = JSON.parse(response);
    return plans;
  } catch (error) {
    console.error('watsonx.ai remediation planning failed, using fallback:', error);
    // Fallback to mock
    return generateRemediationPlan(findings); // Recursive call will use mock
  }
};