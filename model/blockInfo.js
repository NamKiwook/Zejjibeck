var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blockInfoSchema = new Schema({
    isValidate: Number, // 0:Not Validate, 1:Validating, 2:Done
    AnswerLists: Array, // 30
    finished: Number, // 28
    running: Number, // 2
    lastAssignTime: Number,
});

module.exports = mongoose.model('blockInfo', blockInfoSchema);
