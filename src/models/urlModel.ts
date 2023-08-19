import mongoose, { Document, Model, Schema } from 'mongoose';
import UserModel, { UserDocument } from './userModel';

export interface UrlAttributes {
  user: UserDocument['_id'];
  name: string;
  url: string;
  protocol: 'HTTP' | 'HTTPS' | 'TCP';
  path?: string;
  port?: number;
  webhook?: string;
  timeout?: number;
  interval?: number;
  threshold?: number;
  authentication?: {
    username: string;
    password: string;
  };
  httpHeaders?: { [key: string]: string };
  assert?: {
    statusCode: number;
  };
  tags?: string[];
  ignoreSSL?: boolean;
}

interface UrlModel extends Model<UrlDocument> {}

export interface UrlDocument extends Document, UrlAttributes {
  // Additional methods or virtuals if needed
}

const urlSchema: Schema<UrlDocument, UrlModel> = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    protocol: { type: String, required: true, enum: ['HTTP', 'HTTPS', 'TCP'] },
    path: { type: String },
    port: { type: Number },
    webhook: { type: String },
    timeout: { type: Number, default: 5000 },
    interval: { type: Number, default: 600000 },
    threshold: { type: Number, default: 1 },
    authentication: {
      username: { type: String },
      password: { type: String },
    },
    httpHeaders: { type: Map, of: String },
    assert: {
      statusCode: { type: Number },
    },
    tags: [{ type: String }],
    ignoreSSL: { type: Boolean, default: false },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const UrlModel = mongoose.model<UrlDocument, UrlModel>('Url', urlSchema);

export default UrlModel;
