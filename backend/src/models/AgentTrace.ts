import mongoose, { Schema, Document } from 'mongoose';

export interface IAgentTrace extends Document {
  agentName: string;
  jobId: mongoose.Types.ObjectId;
  stepIndex: number;
  inputs: object;
  outputs: object;
  toolCalls: object[];
  timestamp: Date;
}

const AgentTraceSchema: Schema = new Schema({
  agentName: { type: String, required: true },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  stepIndex: { type: Number, required: true },
  inputs: { type: Object, required: true },
  outputs: { type: Object, required: true },
  toolCalls: { type: [Object], default: [] },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IAgentTrace>('AgentTrace', AgentTraceSchema);