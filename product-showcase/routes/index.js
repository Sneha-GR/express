var express = require('express');
var router = express.Router();
const Product = require('../models/Product');
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
    res.render('home');
});

// ---------------- SHOW PRODUCTS -------------------
router.get('/products', async (req, res) => {
    const products = await Product.find();
    res.render('products', { products });
});


// ---------------- SEND EMAIL ----------------------

router.post('/send-email/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ef0e44ac4f7566",
    pass: "5de2ea28605f7b"
  }
});

    await transport.sendMail({
        from: '"Product Showcase" <no-reply@example.com>',
        to: "your@mailtrap.inbox",
        subject: `Product Info: ${product.name}`,
        text: `Name: ${product.name}\nDescription: ${product.description}\nPrice: ${product.price}`
    });

    res.send("Email sent successfully!");
});

module.exports = router;