var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');

var issueSchema = new mongoose.Schema({
    book_id: {
        type: ObjectId,
        required: true
    },
    user_id: {
        type: ObjectId,
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

var Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;