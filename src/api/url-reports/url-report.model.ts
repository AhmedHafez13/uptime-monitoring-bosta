import mongoose, { Document, Model, Schema } from 'mongoose';
import { UrlCheckHistoryItem } from '@app/core/types/app-types';

export interface UrlReportAttributes {
  urlId: mongoose.Types.ObjectId;
  status: 'up' | 'down';
  responseTime: number;
  timestamp: Date;
  availability: number;
  outages: number;
  downtime: number;
  uptime: number;
  history: UrlCheckHistoryItem[];
}

export interface UrlReportDocument extends Document, UrlReportAttributes {
  // Define custom methods or virtuals if needed
}

interface UrlReportModel extends Model<UrlReportDocument> {
  // Define custom methods if needed
}

const urlReportSchema: Schema<UrlReportDocument, UrlReportModel> =
  new mongoose.Schema(
    {
      urlId: { type: Schema.Types.ObjectId, ref: 'Url', required: true },
      status: { type: String, enum: ['up', 'down'], required: true },
      responseTime: { type: Number, required: true },
      timestamp: { type: Date, required: true },
      availability: { type: Number, required: true },
      outages: { type: Number, required: true },
      downtime: { type: Number, required: true },
      uptime: { type: Number, required: true },
      history: [
        {
          timestamp: { type: Date, required: true },
          status: { type: String, enum: ['up', 'down'], required: true },
          responseTime: { type: Number, required: true },
        },
      ],
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
  );

const UrlReportModel = mongoose.model<UrlReportDocument, UrlReportModel>(
  'UrlReport',
  urlReportSchema
);

export default UrlReportModel;
