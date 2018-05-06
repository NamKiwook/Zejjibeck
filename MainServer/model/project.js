var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  projectName: String,
  projectType: String, // 'image' 'audio' 'text'

  uploadTime: Number,

  outputInfo: String,

  description: String,
  fileNo: Number,
  refineType: String, //radioBox, checkBox, drag
  refineList: Array,

  minimumRefine: Number,

  totalCredit: Number,

  blockNo: Number,
  blockSize: Number,
  blocks: Array,

  completedBlock:Number,
});
module.exports = mongoose.model('project', projectSchema);