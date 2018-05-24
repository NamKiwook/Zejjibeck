var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    owner: String,
    projectName: String,
    question: String,
    projectType: String, // 'Refine' 'Collect' 'Refine&Collect'
    dataType: String, // 'Image' 'Audio' 'Text'
    uploadTime: Number,

    outputInfo: String,

    description: String,
    fileNo: Number, // upload 된 파일 수
    fileExtension: {type:String, default:""},

    refineType: String, //RadioBox, CheckBox, Drag, Text
    refineList: Array,

    minimumRefine: Number,

    totalCredit: Number,

    stateCredit: {type:Number, default: 0},
    collectCredit: {type: Number, default: 0}, //블락당 크레딧
    refineCredit: {type: Number, default : 0}, //파일당 크레딧

    blockNo:  {type: Number, default: 1},
    blockSize: Number,
    refineBlocks: Array,
    collectBlock: String,

    projectState : {type: String, default: "Collect"}, // Collect, Refine, cValidate, rValidate finished
    completedBlock: {type: Number, default: 0},
    maxCollect : Number,

    totalCountResult: {type: Array, default: []}, // [{5, 2, 4, 1}] minimumrefine 12    ----- for radio , check
    totalTextResult: {type: Array, default: []},
    totalCoordinateResult: {type: Array, default: []}

});
module.exports = mongoose.model('project', projectSchema);