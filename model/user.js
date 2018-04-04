var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    projects: Array,
    userId: String,
    password: String,
    credit: Number
});
module.exports = mongoose.model('user', userSchema);