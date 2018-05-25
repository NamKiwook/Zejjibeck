var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blockInfoSchema = new Schema({
  property : String, // collect or refine
  maxCollect: Number, // collect -> collect
  isValidate: String, // Not Validate, Done -> for refine
  finished: {type:Array, default:[]}, // refine, collect {userId, assignTime, finishedTime, answerList}
  running: {type:Array, default:[]}, // {userId, AssignTime}

  countResult: {type:Array, default:[]},
  textResult: {type:Array, default:[]},
  coordinateResult: {type:Array, default:[]},
});

//users 없애고 finished 리스트로

module.exports = mongoose.model('blockInfo', blockInfoSchema);

/*
answerLists: 각 인덱스마다 한 사용자가 제공한 정답 리스트들을 가지고 있음

ex)
AnswerLists = {{1,2,3,4,5}, {2,3,1,3,5}, {2,2,3,1,3} .. }
Users = {"cho", "nam", "pyeon" .. },

 */
