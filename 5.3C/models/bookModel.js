const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        unique: true,
        index: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    price : {
        type: mongoose.Decimal128,
        required: true,
        get : v => v?.tostring()
    }, 
    currency : {
        type: String,
        required: true,
        default : 'AUD'
    }
    }, {
        toJSON:   { getters: true, virtuals: false, transform(_doc, ret){ delete ret.__v; return ret; } },
        toObject: { getters: true, virtuals: false }

    });
    
module.exports = mongoose.model('Book', bookSchema);