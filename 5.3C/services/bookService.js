const bookItems = require('../models/bookModel');

async function getAllBooks() {
    return bookItems.find({}).lean({getters: true});
}

module.exports = {
    getAllBooks
};