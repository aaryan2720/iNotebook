const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { 
      useNewUrlParser: true,         // Ensure MongoDB uses the new URL parser
      useUnifiedTopology: true,      // Use the new Server Discover and Monitoring engine
      serverSelectionTimeoutMS: 30000,  // Increase timeout for server selection
      autoIndex: true,               // Enable index creation (change back if you want to avoid it)
      connectTimeoutMS: 30000        // Increase connection timeout
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongo;
