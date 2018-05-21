var express = require('express');
var router = express.Router();
var projectSchema = require('../model/project');
var userSchema = require('../model/user');
var blockSchema = require('../model/blockInfo');

router.get('/', async function(req, res, next) {
  var Id = req.decoded.userId;
  var userInfo = await userSchema.findOne({userId: Id});
  var tempList = userInfo.projects;
  var projectList = [];
  for(var i = tempList.length-1; i>=0; i--){
    var project2 = await projectSchema.findOne({_id : tempList[i].project_dbid});
    var project3 = JSON.stringify(project2);
    var project = JSON.parse(project3);

    if(project.projectState == "Refine"){
      project.totalBlock = project.refineBlocks.length;
      var currentBlock = 0;

      for(var j = 0 ; j < project.refineBlocks.length ; j++){
        var block = await blockSchema.find({_id:project.refineBlocks[j]});
        if(block.isValidate == "Done") currentBlock++;
      }

      project.currentBlock = currentBlock;
    }
    else if(project.projectState == "Collect"){
      var block = await blockSchema.findOne({_id:project.collectBlock});
      var currentCollect = 0;

      for(var j = 0 ; j < block.finished.length ; j++){
        if(block.finished[j].upload == true) currentCollect++;
      }

      project.currentCollect = currentCollect;
    }
    else {
      if(project.projectType == "Collect"){
        project.currentCollect  = project.maxCollect;
      }
      else{
        project.totalBlock = project.refineBlocks.length;
        project.currentBlock = project.refineBlocks.length;
      }
    }
    projectList.push(project);
  }

  res.send({
      userInfo: userInfo,
      projectsInfoList: projectList
  });
});


module.exports = router;