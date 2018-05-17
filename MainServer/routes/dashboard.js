var express = require('express');
var router = express.Router();
var projectSchema = require('../model/project');
var userSchema = require('../model/user');

router.get('/', async function(req, res, next) {

  console.log("??");
  var Id = req.decoded.userId;
  var userInfo = await userSchema.findOne({userId: Id});
  var tempList = userInfo.projects;
  var projectList = [];
  for(var i = tempList.length-1; i>=0; i--){
    var project = await projectSchema.findOne({_id : tempList[i].project_dbid});
    projectList.push(project);
  }

  console.log(projectList);


  res.send({
      userInfo: userInfo,
      projectsInfoList: projectList
  });
});

router.get('/getMyProjectList', async function(req,res,next){

  console.log("!!");

  var page = req.query.page;
  var unit = 10;
  var projectList = await projectSchema.find().sort({"uploadTime":-1}).skip((page-1)*unit).limit(unit);

  res.send(projectList);
});


module.exports = router;