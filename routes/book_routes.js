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
    res.send(req.body.title);
});

function resCb(err, data) {
    if (err) this.res.send(err);
    this.res.json(data);
}

module.exports = router;