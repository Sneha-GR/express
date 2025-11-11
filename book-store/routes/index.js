var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { title: '1984', author: 'George Orwell' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee' }
  ];
  res.render('index', { storeName: 'My Book Store', books: books });
});

module.exports = router;
