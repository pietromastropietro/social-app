const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    // posts: [{ type: Schema.ObjectId, ref: 'Post'}]
});

// Virtual for this user URL
UserSchema.virtual('url').get(function () {
    return `/user/${this._id}`;
});

// Virtual for this user full name.
UserSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// TODO Virtual for this user age

// Export model
module.exports = mongoose.model('User', UserSchema);