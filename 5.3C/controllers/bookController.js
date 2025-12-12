const path = require('path');
const bookService = require('../services/bookService');

// Controller to handle retrieving all books
exports.getAllBooks = async (req, res) => {
    const items = bookService.getAllBooks();

    // Serve a browsable page unless the client explicitly asks for JSON
    if (req.query.format === 'json' || req.headers.accept?.includes('application/json')) {
        return res.json({
            status: 'success',
            data: items,
            message: 'Books retrieved successfully'
        });
    }

    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
};
