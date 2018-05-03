var express = require('express');
var router = express.Router();
var projectSchema = require('../../model/project');

router.get('/getProjectList', async function(req,res,next){
  var page = req.query.page;

  // TODO things..
  // var filter;

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