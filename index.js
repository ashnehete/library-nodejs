var express = require('express');
var app = express();

var Book = require('./models/Book');
var User = require('./models/User');
var Issue = require('./models/Issue');

app.configure(function () {
    app.use(express.log('dev'));
    app.use(express.bodyParser());
});

app.get('/', function (req, res) {
    res.send('Something');
});

app.listen(3000, function () {
    console.log('Running at port 3000...');
});