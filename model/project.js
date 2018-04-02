var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    projectId: String,
    uploadInfo: String,
    outputInfo: String,
    description: String
});
module.exports = mongoose.model('project', projectSchema);