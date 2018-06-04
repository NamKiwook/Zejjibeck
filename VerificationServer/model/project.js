var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  owner: String,
  projectName: String,
  question: String,
  projectType: String,
  dataType: String,
  uploadTime: Number,

  outputInfo: String,

  description: String,
  fileNo: Number,
  fileExtension: {type:String, default:""},

  refineType: String,
  refineList: Array,

  minimumRefine: Number,

  totalCredit: Number,

  stateCredit: {type:Number, default: 0},
  collectCredit: {type: Number, default: 0},
  refineCredit: {type: Number, default : 0},

  blockNo:  {type: Number, default: 1},
  blockSize: Number,
  refineBlocks: Array,
  collectBlock: String,

  projectState : {type: String, default: "Collect"},
  completedBlock: {type: Number, default: 0},
  maxCollect : Number,

  checkBoxResult: {type: Array, default: []},
  totalCountResult: {type: Array, default: []},
  totalTextResult: {type: Array, default: []},
  totalCoordinateResult: {type: Array, default: []},

  originalFileNames: {type:Array, default: []},
});

module.exports = mongoose.model('project', projectSchema);