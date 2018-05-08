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
  credit: {type: Number, default: 0}, //블락당 크레딧

  blockNo:  {type: Number, default: 1},
  blockSize: Number,
  blocks: Array,

  completedBlock: {type: Number, default: 0},
});
module.exports = mongoose.model('project', projectSchema);