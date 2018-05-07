var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  projectName: String,
  projectType: String, // 'Refine' 'Collect' 'Refine&Collect'
  dataType: String, // 'Image' 'Audio' 'Text'

  uploadTime: Number,

  outputInfo: String,

  description: String,
  fileNo: Number,
  refineType: String, //RadioBox, CheckBox, Drag, Text
  refineList: Array,

  minimumRefine: Number,

  totalCredit: Number,

  blockNo: Number,
  blockSize: Number,
  blocks: Array,

  completedBlock:Number,
});
module.exports = mongoose.model('project', projectSchema);