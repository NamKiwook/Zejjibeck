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
    var project = await projectSchema.findOne({_id : tempList[i].project_dbid});

    if(project.projectState == "Refine"){
      project.totalBlock = project.refineBlocks.length;
      var currentBlock = 0;

      for(var i = 0 ; i < project.refineBlocks.length ; i++){
        var block = await blockSchema.find({_id:project.refineBlocks[i]});
        if(block.isValidate == "Done") currentBlock++;
      }

      project.currentBlock = currentBlock;
    }
    else if(project.projectState == "Collect"){
      var block = await blockSchema.find({_id:project.collectBlock});
      var currentCollect = 0;

      for(var i = 0 ; i < block.finished.length ; i++){
        if(block.finished[i].upload == true) currentCollect++;
      }

      project.currnetCollect = currentCollect;
    }
    else { // Done
      if(project.projectType == "Collect"){
        project.currnetCollect = project.maxCollect;
      }
      else{
        project.totalBlock = project.refineBlocks.length;
        project.currentBlock = project.refineBlocks.length;
      }
    }
    projectList.push(project);
  }

  console.log(projectList);

  res.send({
      userInfo: userInfo,
      projectsInfoList: projectList
  });
});


module.exports = router;