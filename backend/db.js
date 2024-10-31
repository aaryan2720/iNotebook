const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://aryan:shalini2720@cluster0.0sltc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message || error);
    process.exit(1); // Exit process if unable to connect
  }
};

module.exports = connectToMongo;
