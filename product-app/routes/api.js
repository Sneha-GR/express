var express = require('express');
var router = express.Router();
const Product = require('../models/productModel');


router.get('/', async (req, res) => {
    res.status(200).json({ message: "API is working!" });
});

// API: Create Product
router.post('/create_product_api', async (req, res) => {
    try {
        const { name, price, description } = req.body;

        const newProduct = new Product({
            name,
            price,
            description
        });

        await newProduct.save();

        res.json({ message: "Product saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

module.exports = router;
