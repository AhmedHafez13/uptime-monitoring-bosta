import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  // Define URL schema fields
});

const UrlModel = mongoose.model('Url', urlSchema);

export default UrlModel;
