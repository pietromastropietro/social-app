const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    data: Buffer,
    contentType: String
});

// Export model
module.exports = mongoose.model('Image', ImageSchema);