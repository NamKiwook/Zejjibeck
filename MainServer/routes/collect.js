var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');

var projectSchema = require('../model/project');
var blockSchema = require('../model/blockInfo');

var s3 = new AWS.S3({region:'ap-northeast-2'});

var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

router.get('/', async function(req,res,err){
  var projectId = req.query.projectId;
  try{
    var project = await projectSchema.findOne({_id: projectId});
    res.send({projectInfo : project});
  } catch (err){
    res.send({projectInfo: "none"});
  }
});

router.put('/check', async function(req,res,err){
  var projectId = req.query.projectId;
  var fileNo = parseInt(req.query.fileNo);
  try{
    var project = await projectSchema.findOne({_id: projectId});
    var collectBlock = await blockSchema.findOne({_id:project.collectBlock});
    var finished = collectBlock.finished;
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

      for(var i = 0 ; i < parseInt(collectBlock.maxCollect) ; i++){
        if(finished[i].owner == ""){
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
    var finished = collectBlock.finished;

    for(var i = 0 ; i < finished.length;i++){
      if(finished[i].owner == userId && finished[i].upload == false){
        finished[i].expire = new Date().getTime() + 300*1000;

        var fileNo = setLeadingZero(i);

        params.Key = "upload/" + project.owner + "/" + project.projectName + "/" + fileNo + extension;

        var url = await s3.getSignedUrl('putObject', params);

        collectBlock.finished = finished;

        await collectBlock.save();

        res.send({url:url, success:true, index:i});

        return;
      }
    }

    res.send({success: false, errorMessage: "no available block"});

  } catch (err){
    res.send({success: false, errorMessage:"database error"});
  }
});

router.put('/urlAck', async function(req,res,err) {
  var projectId = req.query.projectId;
  var index = req.query.index;

  try{
    var project = await projectSchema.findOne({_id: projectId});
    var collectBlock = await blockSchema.findOne({_id:project.collectBlock});
    collectBlock.finished[index].upload = true;
    await collectBlock.save();
    res.send({success: true});
  } catch (err){
    res.send({success: false, errorMessage:"database error"});
  }
}

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