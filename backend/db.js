const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/inotebook';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 30000 });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongo;
