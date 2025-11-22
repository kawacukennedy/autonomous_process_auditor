import mongoose, { Schema, Document } from 'mongoose';

export interface IConnector extends Document {
  teamId: mongoose.Types.ObjectId;
  type: string;
  config: object;
  lastHealthCheck: Date;
  createdAt: Date;
}

const ConnectorSchema: Schema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, required: true },
  config: { type: Object, required: true },
  lastHealthCheck: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IConnector>('Connector', ConnectorSchema);