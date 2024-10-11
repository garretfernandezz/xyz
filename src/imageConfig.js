const mongoose = require('mongoose');

// Connect to the image database
mongoose.connect('mongodb://localhost:27017/imageUploads', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Image Database connected successfully'))
  .catch(err => console.error('Image Database connection error:', err));

// Define schema for images
const ImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

// Create image model for the image database
const Image = mongoose.model('Image', ImageSchema);

// Export the Image model
module.exports = Image;
