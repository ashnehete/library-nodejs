var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Issue = require('./../models/Issue');

router.get('/', function (req, res) {
    var query = req.query;
    console.log(query);
    var cb = resCb.bind({res: res});
    if (query.hasOwnProperty('user_id'))
        Issue.findByUser(query.user_id, cb);
    else if (query.hasOwnProperty('book_id'))
        Issue.findByBook(query.book_id, cb);
    else
        Issue.find(cb);
});

router.get('/:id', function (req, res) {
    Issue.findById(req.params.id, resCb.bind({res: res}));
});

router.post('/', function (req, res) {
    var issue = new Issue(req.body);
    issue.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.send({message: 'Issue added.'});
    })
});

router.post('/:id', function (req, res) {
    Issue.findById(req.params.id, function (err, issue) {
        if (err) {
            return res.send(err);
        }
        for (prop in req.body) {
            issue[prop] = req.body[prop];
        }

        issue.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.send({message: 'Issue updated.'})
        })
    })
});

function resCb(err, data) {
    if (err) this.res.send(err);
    console.log(data);
    this.res.json(data);
}

function errorMessage(message) {
    return {'error': message};
}

module.exports = router;