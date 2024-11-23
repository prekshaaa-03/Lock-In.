const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model so it can be used in other files
module.exports = User;
