var mongoose = require('mongoose');

var issueSchema = new mongoose.Schema({
    book_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    issue_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    return_date: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true
    }
});

issueSchema.statics.findByUser = function (user_id, callback) {
    return this.find({user_id: user_id}, callback);
};

issueSchema.statics.findByBook = function (book_id, callback) {
    return this.find({book_id: book_id}, callback);
};

var Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;