require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  mongodb_uri: process.env.MONGODB_URI, // MongoDB connection URI
  jwt_secret: process.env.JWT_SECRET,     // JWT secret key
  port: process.env.PORT || 3000,        // Application port (default to 3000 if not specified)
};
