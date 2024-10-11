const mongoose = require('mongoose');

// Connect to MongoDB (local database)
mongoose.connect('mongodb://localhost:27017/AddNotices')
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Define the Notice schema
const NoticeSchema = new mongoose.Schema({
  notice: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Define the Event schema
const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the models
const Notice = mongoose.model('Notice', NoticeSchema);
const Event = mongoose.model('Event', EventSchema);

// Export the models
module.exports = { Notice, Event };
