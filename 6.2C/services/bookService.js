const Book = require('../models/bookModel');

// Retrieve all books
async function getAllBooks() {
  return Book.find({});
}

// Retrieve a single book by ID
async function getBookById(id) {
  return Book.findOne({ id });
}

// Create a new book (safe write)
async function createBook(data) {
  const newBook = new Book(data);
  return newBook.save();
}

// Update an existing book (safe write)
async function updateBook(id, data) {
  if (data.id) {
    delete data.id;
  }

  // `runValidators: true` ensures Mongoose re-applies schema validation
  const updated = await Book.findOneAndUpdate(
    { id },
    data,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  );

  return updated; // null if not found
}

// Pure conversion function: AUD to INR (no DB access)
function convertAUDtoINR(audValue) {
  const AUD_TO_INR_RATE = 55;
  return audValue * AUD_TO_INR_RATE;
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  convertAUDtoINR
};
