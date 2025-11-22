import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  billingPlaceholder: string;
  createdAt: Date;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  billingPlaceholder: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITeam>('Team', TeamSchema);