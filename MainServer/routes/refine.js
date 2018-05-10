var express = require('express');
var projectSchema = require('../model/project');
var blockSchema = require('../model/blockInfo');
var router = express.Router();

var AWS = require('aws-sdk');

var s3 = new AWS.S3({region:'ap-northeast-2'});

var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

router.post('/', async function(req,res,next){
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
    var downloadUrl = "/rawData/" + userId + "/" + project.projectName + "/";
    var urlList = [];

    for(var i = 0 ; i < parseInt(project.blockNo) ; i++){
      var block = await blockSchema.findOne({_id: project.blocks[i]});

      if(block.isValidate == "Not Validate" && breakingFlag == 0){
        if(parseInt(project.minimumRefine) == parseInt(block.running) + parseInt(block.finished)) continue;

        breakingFlag = 1;

        block.running = parseInt(block.running) + 1;
        block.save();

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
      res.send({error:"no available block"});
    }
  }
  catch (err){
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

//function downloadUrl(var )

module.exports = router;