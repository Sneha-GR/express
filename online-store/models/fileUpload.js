const mongoose = require('mongoose');


const UserProfileSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
    maxlength: 200
  },
  price: {
    type: String,
    required: true,
    maxlength: 200
  },
  desc: {
    type: String,
    maxlength: 500
  },
  display_picture: {
    type: String,
    required: true
  }
});


const UserProfile = mongoose.model('UserProfile', UserProfileSchema);


module.exports = UserProfile;