var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  projectName: String,
  uploadInfo: String,
  outputInfo: String,
  description: String,
  uploadTime: Number,
});
module.exports = mongoose.model('project', projectSchema);