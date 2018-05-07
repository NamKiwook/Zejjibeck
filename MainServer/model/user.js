var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  projects: Array,
  userId: String,
  password: String,
  usableCredit: Number,
  prearrangedCredit: Number,
  penalty : Number,
  bank: String,
  bankAccount: String
});
module.exports = mongoose.model('user', userSchema);