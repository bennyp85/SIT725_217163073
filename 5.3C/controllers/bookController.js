// Import the service
const bookService = require('../services/bookService');

//Controller uses the service to get data
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
