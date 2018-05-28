var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var creditSchema = new Schema({
  userId: String,
  projectId:String,
  projectName:String,
  credit:Number,
  state:String,
  date:String,
  description:String, // for distinct collect/refine or project registration
});
module.exports = mongoose.model('user', userSchema);