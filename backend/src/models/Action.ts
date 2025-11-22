import mongoose, { Schema, Document } from 'mongoose';

export interface IAction extends Document {
  findingId: mongoose.Types.ObjectId;
  actionType: string;
  targetSystem: string;
  status: 'pending' | 'executed' | 'failed';
  executedBy: mongoose.Types.ObjectId;
  executedAt?: Date;
  result: object;
}

const ActionSchema: Schema = new Schema({
  findingId: { type: Schema.Types.ObjectId, ref: 'Finding', required: true },
  actionType: { type: String, required: true },
  targetSystem: { type: String, required: true },
  status: { type: String, enum: ['pending', 'executed', 'failed'], default: 'pending' },
  executedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  executedAt: Date,
  result: { type: Object },
});

export default mongoose.model<IAction>('Action', ActionSchema);