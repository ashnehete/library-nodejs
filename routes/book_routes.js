var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Book = require('./../models/Book');

router.get('/', function (req, res) {
    var query = req.query;
    var cb = resCb.bind({res: res});
    if (query.hasOwnProperty('title'))
        Book.findByTitle(query.title, cb);
    else if (query.hasOwnProperty('author'))
        Book.findByAuthor(query.author, cb);
    else if (query.hasOwnProperty('isbn'))
        Book.findByIsbn(query.isbn, cb);
    else if (query.hasOwnProperty('issued'))
        Book.findByIssued(query.issued, cb);
    else
        Book.find(cb);
});

router.get('/:id', function (req, res) {
    Book.findById(req.params.id, resCb.bind({res: res}));
});

router.post('/', function (req, res) {
    var book = new Book(req.body);
    book.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.send({message: 'Book added.'});
    })
});

router.post('/:id', function (req, res) {
    Book.findById(req.params.id, function (err, book) {
        if (err) {
            return res.send(err);
        }
        for (prop in req.body) {
            book[prop] = req.body[prop];
        }

        book.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.send({message: 'Book updated.'})
        })
    })
});

function resCb(err, data) {
    if (err) this.res.send(err);
    this.res.json(data);
}

function errorMessage(message) {
    return {'error': message};
}

module.exports = router;