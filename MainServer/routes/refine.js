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
    var downloadUrl = "rawData/" + project.owner + "/" + project.projectName + "/";
    var urlList = [];


    for(var i = 0 ; i < parseInt(project.blockNo) ; i++){
      var block = await blockSchema.findOne({_id: project.refineBlocks[i]});

      if(block.isValidate == "Not Validate" && breakingFlag == 0) {

        if (parseInt(project.minimumRefine) == block.running.length + block.finished.length) continue;

        breakingFlag = 1;

        var time = new Date().getTime();
        await block.running.push({userId: userId, assignTime: time});
        //TODO: 로직 수정 요함,, 검증서버에서 값을 지우면 오류발생
        if (block.running.length + block.finished.length == project.minimumRefine) {
          var currentId = block._id;
          var lastId = project.refineBlocks[project.refineBlocks.length - 1];
          if(currentId.toString() == lastId.toString()) {
            project.projectState = "rValidate";
            await project.save();
          }
        }
        await block.save();

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