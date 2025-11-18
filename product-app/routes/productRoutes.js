var express = require('express');
var router = express.Router();
const Product = require('../models/productModel');

// LANDING PAGE
router.get('/', (req, res) => {
    res.render('landing');
});

// ---------------- CREATE ----------------
router.get('/products/create_product', (req, res) => {
    res.render('product/create', { error: null });
});

router.post('/products/create_product', (req, res) => {
    const { name, description, price } = req.body;

    const product = new Product({ name, description, price });

    const validationError = product.validateSync();
    if (validationError) {
        return res.render('product/create', { error: validationError.errors });
    }

    product.save()
        .then(() => res.redirect('/products/retrieve_product'))
        .catch(err => {
            console.error(err);
            res.render('product/create', { error: { general: { message: 'Save failed' } } });
        });
});

// ---------------- READ (Retrieve All) ----------------
router.get('/products/retrieve_product', (req, res) => {
    Product.find()
        .then(data => res.render('product/retrieve', { data }))
        .catch(err => {
            console.error(err);
            res.send('Error fetching products');
        });
});

// ---------------- UPDATE ----------------
router.get('/products/update_product/:id', (req, res) => {
    Product.findById(req.params.id).lean()
        .then(product => {
            if (!product) return res.status(404).send('Product not found');
            res.render('product/update', { product, error: null });
        })
        .catch(err => {
            console.error(err);
            res.send('Error finding product');
        });
});

router.post('/products/update_product/:id', (req, res) => {
    const { name, description, price } = req.body;
    const product = new Product({ name, description, price });
    const validationError = product.validateSync();
    if (validationError) {
        // re-render with submitted data and error messages
        product._id = req.params.id; // keep id for form action
        return res.render('product/update', { product, error: validationError.errors });
    }

    Product.findByIdAndUpdate(req.params.id, { name, description, price })
        .then(() => res.redirect('/products/retrieve_product'))
        .catch(err => {
            console.error(err);
            res.send('Update failed');
        });
});

// ---------------- DELETE ----------------
router.get('/products/delete_product/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) return res.status(404).send('Product not found');
            res.render('product/delete', { product });
        })
        .catch(err => {
            console.error(err);
            res.send('Error finding product');
        });
});

router.post('/products/delete_product/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/products/retrieve_product'))
        .catch(err => {
            console.error(err);
            res.send('Delete failed');
        });
});

// ---------------- PAGINATED LIST ----------------
router.get('/products/listing_page', (req, res) => {
    const { page = 1, limit = 3 } = req.query;

    Product.paginate({}, { page: parseInt(page, 10), limit: parseInt(limit, 10) })
        .then(result => {
            res.render('product/list', {
                products: result.docs,
                pagination: result
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = router;
