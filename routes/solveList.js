var express = require('express');
var router = express.Router();
var userSchema = require('../model/user');
var projectSchema = require('../../model/project');
var uploadSchema = require('../../model/upload');

var session = require('express-session'); // 세션정보는 메모리에 저장함

router.get('/getProjectList', async function(req,res,next){
  var page = req.query.page;
  var filter; // TODO :
  var unit = 10;
  var projectList = await projectSchema.find().sort({"uploadTime":-1}).skip((page-1)*unit).limit(unit);
  var totalList = await projectSchema.find().length();

  //TODO: SEND ONLY JSON TYPE
  res.send({
        projectList: projectList,
        totalList: totalList,
  });
});

router.post('/logout', function(req,res,next){
  req.session.destroy();
  res.clearCookie('zjb');
  res.end();
});

module.exports = router;