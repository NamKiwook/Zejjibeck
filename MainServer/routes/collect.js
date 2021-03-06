var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');

var projectSchema = require('../model/project');
var blockSchema = require('../model/blockInfo');
var userSchema = require('../model/user');

var s3 = new AWS.S3({region:'ap-northeast-2'});

var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };
const digits = 6;

router.get('/', async function(req,res,err){
  var projectId = req.query.projectId;
  try{
    var project = await projectSchema.findOne({_id: projectId});

    var block = await blockSchema.findOne({_id:project.collectBlock});

    var finished = 0;

    for(var i = 0 ; i < block.finished.length ; i++){
      if(block.finished[i].upload == true) finished++;
    }

    res.send({projectInfo : project, collectedData:finished});
  } catch (err){
    res.send({projectInfo: "none"});
  }
});

router.put('/check', async function(req,res,err){
  var projectId = req.body.projectId;
  var fileNo = parseInt(req.body.fileNo);
  try{
    var project = await projectSchema.findOne({_id: projectId});
    var collectBlock = await blockSchema.findOne({_id:project.collectBlock});
    var finished = JSON.parse(JSON.stringify(collectBlock.finished));
    var available = 0;

    for(var i = 0 ; i < parseInt(collectBlock.maxCollect); i++){
      if(finished[i].owner == ""){
        available++;
      }
    }
    if(available < fileNo){
      res.send({success:false, errorMessage:"No available files", available : available});
      return;
    }
    else{
      var userId = req.decoded.userId;
      if(available == fileNo){
        project.projectState = "cValidate";
        await project.save();
      }

      var user = await userSchema.findOne({userId:userId});
      user.prearrangedCredit = parseInt(user.prearrangedCredit) + fileNo * parseInt(project.collectCredit);
      await user.save();

      for(var i = 0 ; i < parseInt(collectBlock.maxCollect) ; i++){
        if(finished[i].owner == ""){
          finished[i].assignTime = new Date().getTime();
          finished[i].owner = userId;
          finished[i].upload = false;
          fileNo--;

          if(fileNo == 0) break;
        }
      }
    }

    collectBlock.finished = finished;
    await collectBlock.save();
    res.send({success:true});
  } catch (err){
    console.log(err);
    res.send({success: false, errorMessage:"database error"});
  }
});

router.get('/url', async function(req,res,err){
  var projectId = req.query.projectId;
  var extension = getExtension(req.query.fileName);
  var userId = req.decoded.userId;
  try{
    var project = await projectSchema.findOne({_id: projectId});
    var collectBlock = await blockSchema.findOne({_id:project.collectBlock});
    var finished = JSON.parse(JSON.stringify(collectBlock.finished));

    //TODO : TEMPORARY SOLUTION. TOT
    project.fileExtension = extension;
    await project.save();

    for(var i = 0 ; i < finished.length;i++){
      if(finished[i].owner == userId && finished[i].upload == false){

        var fileNo = setLeadingZero(i.toString());

        params.Key = "upload/" + project.owner + "/" + project.projectName + "/" + fileNo + extension;
        console.log(params.Key);

        var url = await s3.getSignedUrl('putObject', params);
        collectBlock.finished = finished;

        await collectBlock.save();

        res.send({url:url, success:true, index:i});

        return;
      }
    }

    res.send({success: false, errorMessage: "no available block"});

  } catch (err){
    console.log(err)
    res.send({success: false, errorMessage:"database error"});
  }
});

router.put('/urlAck', async function(req,res,err) {
  var projectId = req.body.projectId;
  var index = parseInt(req.body.index);
  var userId = req.decoded.userId;
  try{
    var project = await projectSchema.findOne({_id: projectId});
    var collectBlock = await blockSchema.findOne({_id:project.collectBlock});
    var finished = JSON.parse(JSON.stringify(collectBlock.finished));
    if(userId == finished[index].owner) {
      finished[index].upload = true;
      finished[index].finishedTime = new Date().getTime();
      collectBlock.finished = finished;
      await collectBlock.save();
      res.send({success: true});
    } else {
      res.send({success: false, errorMessage: "time expired"});
    }
  } catch (err){
    res.send({success: false, errorMessage:"database error"});
  }
});

function setLeadingZero(fileNo){
  while(fileNo.length < digits){
    fileNo = '0' + fileNo;
  }
  return fileNo;
}

function getExtension(fileName){
  var extension = "";
  for(var i = fileName.length - 1 ; i >= 0 ; i--) {
    extension = fileName[i] + extension;
    if(fileName[i] == '.') break;
  }
  return extension;
}

module.exports = router;