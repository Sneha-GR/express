var express = require('express');
var router = express.Router();
const Product = require('../models/productModel');

// Show the form page
router.get('/', function(req, res) {
  res.render('index', { message: null });
});

// Handle form submission
router.post('/add', (req, res) => {
  const { name, price, description } = req.body;

  const newProduct = new Product({
    name,
    price,
    description
  });

  newProduct.save()
    .then(() => {
      res.render('success', { message: "Product saved successfully!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error saving product");
    });
});

module.exports = router;
