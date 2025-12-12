const express = require('express');
const router = express.Router();

// import all controllers via index.js
const Controllers = require('../controllers');

// GET /books - Retrieve a list of all books
router.get('/', Controllers.bookController.getAllBooks);

module.exports = router;

router.get('/_debug', (_req, res) => res.json({ ok: true }));