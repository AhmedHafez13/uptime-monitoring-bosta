import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    const MONGO_IP = process.env.MONGO_IP || 'localhost';
    const MONGO_PORT = process.env.MONGO_PORT || '27017';
    const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'uptime-monitoring';
    const MONGODB_URI = `mongodb://${MONGO_IP}:${MONGO_PORT}/${MONGO_DB_NAME}`;

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectToDatabase;
