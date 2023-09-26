const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config'); // Your configuration file

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS for your API
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev')); // Logging middleware for development (you can configure it as needed)

// Connect to MongoDB
mongoose.connect(config.mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import and use your authentication routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/', authRoutes);

// Error handling middleware (You can add this after defining routes)
const { handleError } = require('./src/utils/errorHandlers');
app.use((err, req, res, next) => {
  handleError(res, err);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
