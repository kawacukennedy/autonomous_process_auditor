import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  role: string;
  passwordHash?: string;
  oauthId?: string;
  createdAt: Date;
  lastLogin: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  passwordHash: String,
  oauthId: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);