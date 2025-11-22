import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  teamId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  status: 'pending' | 'running' | 'failed' | 'complete';
  inputRef: string;
  resultRef?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'running', 'failed', 'complete'], default: 'pending' },
  inputRef: { type: String, required: true },
  resultRef: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IJob>('Job', JobSchema);