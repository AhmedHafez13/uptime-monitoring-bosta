import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the user schema fields
export interface UserAttributes {
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
}

export interface UserDocument extends Document, UserAttributes {
  // Define custom methods or virtuals if needed
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define methods and virtuals
interface UserModel extends Model<UserDocument> {
  // Define custom methods if needed
}

const userSchema: Schema<UserDocument, UserModel> = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Hash user password before saving
userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Define the comparePassword method to validate passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default UserModel;
