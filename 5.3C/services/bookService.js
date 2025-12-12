const bookItems = require('../models/bookModel');

async function getAllBooks() {
    return bookItems.find({});
}

module.exports = {
    getAllBooks
};
