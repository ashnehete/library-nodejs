var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var User = require('./../models/User');

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