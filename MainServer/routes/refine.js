var express = require('express');
var projectSchema = require('../model/project');
var blockSchema = require('../model/blockInfo');
var router = express.Router();

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

var AWS = require('aws-sdk');
var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*15 };

router.post('/', async function(req,res,next){
  try{
    var answerList = req.body.refineList;
    var id = req.decoded.userId;
    var block = await blockSchema.findOne({_id:req.body.blockId});

    for(var i = 0; i < block.running.length; i ++){
      if(block.running[i].userId == id){
        var time = new Date().getTime();
        block.finished.push({userId : id, assignTime : block.running[i].assignTime, finishedTime: time, answerList : answerList});
        block.running.splice(i,1);
        await block.save();
        res.send({success: true});
        return;
      }
    }
    res.send({success:false});
  }
  catch(err){
    console.log("fail to update database");
    console.log(err);
    res.send({success:false});
  }
});

router.get('/', async function(req,res,next) {
  try {
    var project = await projectSchema.findOne({
      _id: req.query.projectId
    });

    var breakingFlag = 0;
    var blockSize = parseInt(project.blockSize);
    var lastBlockSize = parseInt(project.fileNo) - ((parseInt(project.blockNo) - 1) * blockSize);

    var userId = req.decoded.userId;
    var downloadUrl = "rawData/" + userId + "/" + project.projectName + "/";
    var urlList = [];

    console.log("1");

    for(var i = 0 ; i < parseInt(project.blockNo) ; i++){
      var block = await blockSchema.findOne({_id: project.refineBlocks[i]});

      console.log("2");
      if(block.isValidate == "Not Validate" && breakingFlag == 0){

        console.log("3");
        if(parseInt(project.minimumRefine) == block.running.length + block.finished.length) continue;

        console.log("4");
        breakingFlag = 1;

        console.log("5");
        var time = new Date().getTime();
        block.running.push({userId : userId, assignTime : time});
        await block.save();
        console.log("6");

        var startFileNo = i * project.blockSize;
        var blockListSize = project.blockSize;
        if(i +1 == parseInt(project.blockNo)) blockListSize = lastBlockSize;

        for(var j = 0 ; j < blockListSize ; j++){
          params.Key = downloadUrl  + makeLeadingZero(startFileNo + j, 6) + project.fileExtension;
          var url = await s3.getSignedUrl('getObject', params);
          await urlList.push(url);
        }
        res.send({
          urlList : urlList,
          blockId : block._id,
          projectInfo : project
        });
      }
      else if(breakingFlag == 1) return;
    }

    if(breakingFlag == 0){
      console.log("!!");
      res.send({error:"no available block"});
    }
  }
  catch (err){
    console.log(err)
    res.send(err);
  }
});

function makeLeadingZero(number, digits){
  var strNumber = number.toString();

  while(strNumber.length < digits){
    strNumber = "0" + strNumber;
  }

  return strNumber;
}

module.exports = router;