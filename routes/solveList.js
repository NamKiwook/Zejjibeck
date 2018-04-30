var express = require('express');
var router = express.Router();
var proj
var userSchema = require('../model/user');
var projectSchema = require('../../model/project');
var uploadSchema = require('../../model/upload');

var session = require('express-session'); // 세션정보는 메모리에 저장함

router.get('/getList', async function(req,res,next){
  var page = 1; // req.params.page;

  try{
    var compare = await userSchema.find({userId: id, password: password});
    if(compare.toString())
    {
      req.session.user = user;
      res.send({pass:'ok'});
    }
    else
      res.send({pass:'no'});
  }catch (err){
    res.send({pass:'no'});
  }
});
router.post('/logout', function(req,res,next){
  req.session.destroy();
  res.clearCookie('zjb');
  res.end();
});

module.exports = router;