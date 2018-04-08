var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadSchema = new Schema({
  type: String, // 'image' 'audio' 'text'
  files: Number,
  tagType: String, //radioBox, checkBox, drag
  tagValue: Array,
  minTag: Number,
  totalCredit: Number,
  blockSize: Number
});
module.exports = mongoose.model('upload', uploadSchema);