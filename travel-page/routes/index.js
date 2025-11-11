var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  // Create a list of 3 travel places
  const places = [
    { 
      name: 'Dubai', 
      country: 'United Arab Emirates', 
      isPopular: true,
      image: '/images/dubai.png'
    },
    { 
      name: 'Bali', 
      country: 'Indonesia', 
      isPopular: true,
      image: '/images/bali.png'
    },
    { 
      name: 'Switzerland', 
      country: 'Switzerland', 
      isPopular: true,
      image: '/images/switzer.png'
    }
  ];

  // Send data to the view
  res.render('index', { 
    title: 'Beyond Boundaries',
    places: places
  });
});

module.exports = router;
