const mongoose = require('mongoose');

// Define the Book schema with validation rules
const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Book ID is required.'],
        match: [/^b[A-Za-z0-9_-]+$/, 'Book ID must start with "b" and contain only letters, numbers, dashes, or underscores.'],
        immutable: true,
        unique: true,
        index: true,
        trim: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required.'],
        minlength: [2, 'Title must be at least 2 characters long.'],
        maxlength: [100, 'Title cannot exceed 100 characters.'],
        index: true,
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author name is required.'],
        minlength: [2, 'Author name must be at least 2 characters long.'],
        maxlength: [60, 'Author name cannot exceed 60 characters.'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required.'],
        enum: {
            values: ['Historical Fiction', 'Non-Fiction', 'Science Fiction', 'Classic', 'Fantasy', 'Other'],
            message: 'Genre must be one of: Historical Fiction, Non-Fiction, Science Fiction, Classic, Fantasy, Other.'
        },
        trim: true
    },
    summary: {
        type: String,
        required: [true, 'Summary is required.'],
        maxlength: [500, 'Summary cannot exceed 500 characters.'],
        trim: true
    },
    publishedYear: {
        type: Number,
        required: [true, 'Published year is required.'],
        min: [1450, 'Published year must be after the invention of the printing press (1450).'],
        max: [new Date().getFullYear(), 'Published year cannot be in the future.']
    },
    price: {
        type: mongoose.Decimal128,
        required: [true, 'Price is required.'],
        min: [0.01, 'Price must be at least $0.01.'],
        max: [1000, 'Price cannot exceed $1000.'],
        get: v => v?.toString()
    },
    currency: {
        type: String,
        required: [true, 'Currency code is required.'],
        enum: {
            values: ['AUD'],
            message: 'Currency must be AUD.'
        },
        default: 'AUD',
        trim: true
    }
}, {
    toJSON: {
        getters: true,
        virtuals: false,
        transform(_doc, ret) {
            delete ret.__v;
            return ret;
        }
    },
    toObject: { getters: true, virtuals: false }
});

module.exports = mongoose.model('Book', bookSchema);
