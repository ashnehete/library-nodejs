var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var User = require('./../models/User');

/*
router.get('/', function (req, res) {
    var query = req.query;
    var cb = resCb.bind({res: res});
    if (query.hasOwnProperty('username'))
        User.findByUsername(query.username, cb);
    else if (query.hasOwnProperty('name'))
        User.findByName(query.name, cb);
    else
        User.find(cb);
});

router.get('/:id', function (req, res) {
    User.findById(req.params.id, resCb.bind({res: res}));
});
*/

router.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var cb = resCb.bind({res: res});
    User.login(username, password, cb);
});

router.post('/register', function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.send({message: 'User added.'});
    })
});

router.post('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.send(err);
        }
        for (prop in req.body) {
            user[prop] = req.body[prop];
        }

        user.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.send({message: 'User updated.'})
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