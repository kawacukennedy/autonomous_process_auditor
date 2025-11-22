import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  userId: mongoose.Types.ObjectId;
  findingId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  findingId: { type: Schema.Types.ObjectId, ref: 'Finding', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);