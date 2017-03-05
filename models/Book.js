var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');

var bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    acc_no: {
        type: Number,
        required: true
    },
    isbn: {
        type: String,
        default: "Not Available"
    }
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;