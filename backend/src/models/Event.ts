import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  connectorId: mongoose.Types.ObjectId;
  rawPayload: object;
  normalizedPayload: object;
  receivedAt: Date;
  processedAt?: Date;
  jobId?: mongoose.Types.ObjectId;
}

const EventSchema: Schema = new Schema({
  connectorId: { type: Schema.Types.ObjectId, ref: 'Connector', required: true },
  rawPayload: { type: Object, required: true },
  normalizedPayload: { type: Object, required: true },
  receivedAt: { type: Date, default: Date.now },
  processedAt: Date,
  jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
});

export default mongoose.model<IEvent>('Event', EventSchema);