const foodItems = require('../models/bookModel');
const { get } = require('../routes/books');

async function getAllBooks() {
    return foodItems.find({}).lean({getters: true});
}

module.exports = {
    getAllBooks
};