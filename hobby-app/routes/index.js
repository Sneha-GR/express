var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    hobbyTitle: 'Photography',
    hobbyDescription: 'Capturing moments from around the world through my lens.'
  });
});

module.exports = router;
