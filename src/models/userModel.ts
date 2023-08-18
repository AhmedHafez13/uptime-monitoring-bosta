import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Define user schema fields
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
