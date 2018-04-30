var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadSchema = new Schema({
  projectType: String, // 'image' 'audio' 'text'
  fileNo: Number,
  refineType: String, //radioBox, checkBox, drag
  refineList: Array,
  minimumRefine: Number,
  totalCredit: Number,
  blockSize: Number,
});

module.exports = mongoose.model('upload', uploadSchema);