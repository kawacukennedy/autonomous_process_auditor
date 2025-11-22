import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  teamId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  pdfPath: string;
  generatedAt: Date;
}

const ReportSchema: Schema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  pdfPath: { type: String, required: true },
  generatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReport>('Report', ReportSchema);