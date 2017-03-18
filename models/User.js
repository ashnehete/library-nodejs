var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.findByUsername = function (username, callback) {
    return this.find({username: username}, callback);
};

userSchema.statics.findByName = function (name, callback) {
    return this.find({name: new RegExp(name, 'gi')}, callback);
};

userSchema.statics.login = function (username, password, callback) {
    return this.find({username: username, password: password}, callback);
};

var User = mongoose.model('User', userSchema);

module.exports = User;