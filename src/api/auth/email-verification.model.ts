import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the email verification schema fields
export interface EmailVerificationAttributes {
  userId: mongoose.Types.ObjectId;
  token: string;
}

export interface EmailVerificationDocument
  extends Document,
    EmailVerificationAttributes {}

// Define methods and virtuals
interface EmailVerificationModel extends Model<EmailVerificationDocument> {}

const emailVerificationSchema: Schema<
  EmailVerificationDocument,
  EmailVerificationModel
> = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const EmailVerificationModel = mongoose.model<
  EmailVerificationDocument,
  EmailVerificationModel
>('EmailVerification', emailVerificationSchema);

export default EmailVerificationModel;
