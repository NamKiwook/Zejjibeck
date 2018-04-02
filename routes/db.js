var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var userInfo = mongoose.model('userinfo',{userId:String,userPassword:String,userName:String});
/* GET home page. */
router.get('/', function(req, res, next) {
  userInfo.find({},function (err,posts) {
    console.log(posts);
  })
});

module.exports = router;
