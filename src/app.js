const express = require('express');
const { Notice, Event } = require('./config');  // Import Notice and Event from config.js
const Image = require('./imageConfig');  // Import Image from imageConfig.js
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');  // For file uploads

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));  // Ensure uploads folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // Generate unique filename
  }
});
const upload = multer({ storage: storage });

// Serve the staff dashboard (GET request)
app.get('/', (req, res) => {
  res.render('staffDash');
});

// Serve the Add Notice page (GET request)
app.get('/add-notice', (req, res) => {
  res.render('add-notice');
});

// Handle Add Notice form submission (POST request)
app.post('/add-notice', async (req, res) => {
  try {
    const newNotice = new Notice({
      notice: req.body.notice
    });

    await newNotice.save();  // Save the notice to the database
    res.redirect('/add-notice');
  } catch (err) {
    console.error('Error saving notice:', err);
    res.status(500).send('Error saving notice');
  }
});

// Serve the Add Image page (GET request)
app.get('/add-image', (req, res) => {
  res.render('add-image');
});

// Handle image upload (POST request)
app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const newImage = new Image({
      filename: req.file.filename,
      description: req.body.description
    });

    await newImage.save();  // Save the image to the database
    res.redirect('/add-image');
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).send('Error saving image');
  }
});

// Serve the Calendar page (GET request)
app.get('/calendar', async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Event.find({});
    console.log('Rendering Calendar with events:', events);

    // Render the calendar page and pass the events data to the view
    res.render('calendar', { events });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).send('Error fetching events');
  }
});
app.get('/calendar', async (req, res) => {
  try {
    // Fetch events from the database
    const events = await Event.find({});
    console.log('Events fetched:', events);

    // Render the calendar.ejs and pass the events
    res.render('calendar', { events });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).send('Error fetching events');
  }
});


// Handle Add Event form submission (POST request)
app.post('/add-event', async (req, res) => {
  try {
    const newEvent = new Event({
      name: req.body.name,
      date: req.body.date,
      type: req.body.type,
      description: req.body.description
    });

    await newEvent.save();  // Save the event to the database
    res.redirect('/calendar');
  } catch (err) {
    console.error('Error saving event:', err);
    res.status(500).send('Error saving event');
  }
});

// Start the server
const port = 2000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// Serve the View Notices page (GET request)
app.get('/view-notice', async (req, res) => {
  try {
    // Fetch all notices from the database
    const notices = await Notice.find({});
    console.log('Fetched Notices:', notices);

    // Render the view-notices.ejs page and pass the notices to the view
    res.render('view-notice', { notices });
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).send('Error fetching notices');
  }
});

// Serve the View Images page (GET request)
app.get('/view-images', async (req, res) => {
  try {
    // Fetch all images from the database
    const images = await Image.find({});
    console.log('Rendering view-images with images:', images);

    // Render the view-images.ejs and pass the images data to the view
    res.render('view-images', { images });
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).send('Error fetching images');
  }
});

app.get('/parents', (req, res) => {
  res.render('parents');  // This assumes parents.ejs is inside the views folder
});
