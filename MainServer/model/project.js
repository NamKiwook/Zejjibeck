var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  owner: String,
  projectName: String,
  projectType: String, // 'Refine' 'Collect' 'Refine&Collect'
  dataType: String, // 'Image' 'Audio' 'Text'
  uploadTime: Number,

  question: String,

  outputInfo: String,

  description: String,
  fileNo: Number, // upload 된 파일 수
  fileExtension: {type:String, default:""},

  refineType: String, //RadioBox, CheckBox, Drag, Text
  refineList: Array,

  minimumRefine: Number,

  totalCredit: Number,

  collectCredit: {type: Number, default: 0}, //블락당 크레딧
  refineCredit: {type: Number, default : 0}, //파일당 크레딧

  blockNo:  {type: Number, default: 1},
  blockSize: Number,
  refineBlocks: Array,
  collectBlock: String,

  projectState : {type: String, default: "Collect"}, // Collect, CollectValidation, Refine, finished
  completedBlock: {type: Number, default: 0},
  maxCollect : Number,
});
module.exports = mongoose.model('project', projectSchema);