import mongoose, { Schema, Document } from 'mongoose';

export interface IFinding extends Document {
  jobId: mongoose.Types.ObjectId;
  severity: 'low' | 'medium' | 'high';
  summary: string;
  details: object;
  suggestedActions: string[];
  createdAt: Date;
}

const FindingSchema: Schema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
  summary: { type: String, required: true },
  details: { type: Object, required: true },
  suggestedActions: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFinding>('Finding', FindingSchema);