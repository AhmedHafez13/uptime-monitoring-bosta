import mongoose, { Document, Model, Schema } from 'mongoose';

export interface UrlAttributes {
  user: mongoose.Types.ObjectId;
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
  fullUrl: string;
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
    timeout: { type: Number, default: 5000 }, // in milliseconds
    interval: { type: Number, default: 600 }, // in seconds
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
  { timestamps: true }
);

// Define the virtual property 'fullUrl'
urlSchema.virtual('fullUrl').get(function () {
  const protocol = this.protocol.toLowerCase();
  const host = this.url;
  const path = this.path || '';
  const port = this.port ? `:${this.port.toString().toLowerCase()}` : '';

  return `${protocol}://${host}${port}${path}`;
});

const UrlModel = mongoose.model<UrlDocument, UrlModel>('Url', urlSchema);

export default UrlModel;
