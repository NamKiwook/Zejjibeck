var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blockInfoSchema = new Schema({
    property : String,
    maxCollect: Number,
    isValidate: String,
    finished: {type:Array, default:[]},
    running: {type:Array, default:[]},
    countResult: {type:Array, default:[]},
    textResult: {type:Array, default:[]},
    coordinateResult: {type:Array, default:[]},
});

module.exports = mongoose.model('blockInfo', blockInfoSchema);