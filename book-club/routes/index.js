const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.render('register', { errors: [], name: '', email: '' });
});

router.post('/register', [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Enter a valid email address'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('register', {
      errors: errors.array(),
      name: req.body.name,
      email: req.body.email
    });
  }

  res.render('welcome', {
    name: req.body.name,
    email: req.body.email
  });
});

module.exports = router;
