// Import the service
const bookService = require('../services/bookService');

// Controller uses the service to get data
exports.getAllBooks = async (_req, res, next) => {
  try {
    const items = await bookService.getAllBooks();
    res.status(200).json({
      statusCode: 200,
      data: items,
      message: 'Books retrieved using service'
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const item = await bookService.getBookById(req.params.id);
    if (!item) {
      return res.status(404).json({
        statusCode: 404,
        message: `Book with ID ${req.params.id} not found`
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: item,
      message: 'Book retrieved using service'
    });
  } catch (err) {
    next(err);
  }
};

// ---------------- SAFE WRITE CONTROLLERS ----------------

// POST /api/books -> create new book
exports.createBook = async (req, res, next) => {
  try {
    const allowedFields = ['id', 'title', 'author', 'genre', 'summary', 'publishedYear', 'price', 'currency'];
    const invalidFields = Object.keys(req.body).filter(f => !allowedFields.includes(f));

    if (invalidFields.length > 0) {
      return res.status(400).json({
        statusCode: 400,
        message: `Unexpected fields: ${invalidFields.join(', ')}`
      });
    }

    const createdBook = await bookService.createBook(req.body);
    res.status(201).json({
      statusCode: 201,
      data: createdBook,
      message: 'Book created successfully'
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        statusCode: 400,
        message: err.message
      });
    }
    if (err.code === 11000) { // Duplicate key
      return res.status(409).json({
        statusCode: 409,
        message: 'Duplicate ID or title. Each book must have a unique ID and title.'
      });
    }
    next(err);
  }
};

// PUT /api/books/:id -> update existing book
exports.updateBook = async (req, res, next) => {
  try {
    const allowedFields = ['title', 'author', 'genre', 'summary', 'publishedYear', 'price', 'currency'];
    const invalidFields = Object.keys(req.body).filter(f => !allowedFields.includes(f));

    if (invalidFields.length > 0) {
      return res.status(400).json({
        statusCode: 400,
        message: `Unexpected fields: ${invalidFields.join(', ')}`
      });
    }

    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    if (!updatedBook) {
      return res.status(404).json({
        statusCode: 404,
        message: `Book with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: updatedBook,
      message: 'Book updated successfully'
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        statusCode: 400,
        message: err.message
      });
    }
    next(err);
  }
};
