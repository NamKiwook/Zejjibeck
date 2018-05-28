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
  // {note: "충전", "프로잭트이름", credit: 숫자 , date: "yyyy.mm.dd, MM.ss", type:"적립","충전","사용","출금", }
});
module.exports = mongoose.model('user', userSchema);
