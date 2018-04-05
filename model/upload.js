var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadSchema = new Schema({
    type: String, // 'image' 'audio' 'text'
    extension: String, // '.img' '.mp3' '.txt'
    files: Number,
    tagType: String, //radioBox, checkBox, drag
    tagValue: Array,
    minTag: Number,
    totalCredit: Number,
    blockSize: Number
});
module.exports = mongoose.model('upload', uploadSchema);