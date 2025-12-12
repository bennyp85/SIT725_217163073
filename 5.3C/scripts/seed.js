const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const foodItems = require('../models/bookModel');

const sampleBooks = [
  { title: 'Book One', author: 'Author A', publishedYear: 2001, price: 19.99, currency: 'AUD' },
  { title: 'Book Two', author: 'Author B', publishedYear: 2005, price: 29.99, currency: 'AUD' },
  { title: 'Book Three', author: 'Author C', publishedYear: 2010, price: 39.99, currency: 'AUD' },
];

(async () => {
  try {
    await bookItems.collection.createIndex({ title: 1 }, { unique: true });

    await bookItems.deleteMany({});
    console.log('Cleared existing book items.');

    await bookItems.insertMany(sampleBooks);
    console.log('Inserted sample book items.');

    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
})();