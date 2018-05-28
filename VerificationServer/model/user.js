var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  projects: {type: Array, default: []},
  userId: String,
  password: String,
  usableCredit: {type: Number, default: 0},
  prearrangedCredit: {type: Number, default: 0},
  penalty : {type: Number, default: 0},
  bank: String,
  bankAccount: String,
  profileUrl: {type: String, default: __dirname+"/../public/profile/default.png"},
  creditHistory : {type:Array, default:[]},
  // {note:, credit:, date:, type:}
});
module.exports = mongoose.model('user', userSchema);
/*
var formattedDate = getFormattedDate(new Date());
user.creditHistory.push({note:"과제 등록", credit:parseInt(req.body.totalCredit), date:formattedDate, type:"사용"});


function getFormattedDate(date) {
  return date.getFullYear().toString() + "." + pad2(date.getMonth() + 1) + "." + pad2(date.getDate()) + ", " + pad2(date.getHours()) + ":" + pad2(date.getMinutes());
}

function pad2(n) { return n < 10 ? '0' + n : n }

 */