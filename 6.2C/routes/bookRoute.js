const express = require('express');
const router = express.Router();

// Import controllers via index.js
const Controllers = require('../controllers');

// ---------------- READ ROUTES ----------------

// GET /api/books - Retrieve all books
router.get('/', Controllers.bookController.getAllBooks);

// GET /api/books/:id - Retrieve a specific book by ID
router.get('/:id', Controllers.bookController.getBookById);

// ---------------- SAFE WRITE ROUTES ----------------

// POST /api/books - Create a new book (safe write)
router.post('/', Controllers.bookController.createBook);

// PUT /api/books/:id - Update an existing book (safe write)
router.put('/:id', Controllers.bookController.updateBook);

module.exports = router;
