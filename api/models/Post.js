const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: { type: Schema.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    img: { type: Schema.ObjectId, ref: 'Image' },
    likes: [{ type: Schema.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.ObjectId, ref: 'Comment' }],
    date: { type: Date, default: Date.now }
});

// Export model
module.exports = mongoose.model('Post', PostSchema);