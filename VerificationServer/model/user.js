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
  profileUrl: {type: String, default: __dirname+"/../public/profile/default.png"}
});
module.exports = mongoose.model('user', userSchema);