var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'sneha' });
});

router.get('/login', function(req, res, next) {
  res.send('hello world');
});

router.get('/home', function(req, res, next) {
  res.render('home', {names:'hello'});
});

router.get('/mashup', function(req, res, next) {
  res.render('home', {names:'mashupstack'});
});

router.get('/sample', function(req, res, next) {
  res.render('home', {names:'mashupstack'});
});

module.exports = router;
