var express = require('express');
var router = express.Router();

const multer = require('multer');
const UserProfile = require('../models/fileUpload');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// 1️⃣ Show the form
router.get('/create_profile', (req, res) => {
  res.render('fileUpload');
});


// 2️⃣ POST route to create profile (UPLOAD IMAGE)
router.post('/create_profile', upload.single('display_picture'), (req, res) => {
  const { pname, price, desc } = req.body;
  const display_picture = req.file.buffer.toString('base64');

  const userPr = new UserProfile({
    pname, price, desc,display_picture
  });

  userPr.save()
    .then(() => {
      res.redirect('/users/profile/' + userPr._id);   // Redirect to details page
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
      res.status(500).send('Internal Server Error');
    });
});


// 3️⃣ Show profile details
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await UserProfile.findById(req.params.id);
    res.render('profileDetails', { user });
  } catch (err) {
    res.status(500).send("Error loading profile");
  }
});

module.exports = router;