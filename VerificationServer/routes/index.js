var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var fs = require('fs');

var userSchema = require('../model/user');
var projectSchema = require('../model/project');
var blockSchema = require('../model/blockInfo');

var flagVerification;

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/on', function(req, res, next){
  clearInterval(flagVerification);
  var unit = 1 * 60 * 60; // second
  flagVerification = setInterval(verification(), unit * 600);
})

router.get('/off', function(req, res, next){
  clearInterval(flagVerification);
  console.log("verification off");
})

function getSignedUrl(userName, projectName, fileNo, extension) {

  var strFileNo = fileNo.toString();

  while(strFileNo.length < 6){
    strFileNo = "0" + strFileNo;
  }

  params.Key = "/rawData/" + userName + "/" + projectName + "/" + strFileNo + "/" + extension;

  s3.getSignedUrl('getObject', params, function(err, url){
    return url;
  })
}

async function verification(){
  console.log("verification start");

  var projects = await projectSchema.find();

  for(var i = 0 ; i < projects.length ; i++){
    var blockSize = projects[i].blockSize;

    if(projects[i].projectState == "collect"){
      var block = await blockSchema.find({_id:projects[i].blocks[0]});
      if(block.total == block.finished){
        // TODO: download & validate duplicate data
        // s3://zejjibeck/rawData/userId/projectName/000001.
        var path = '/verification/';
        // delete files
        if(!fs.existsSync(path)){
          fs.mkdir(path, function(err){
            if(err){
              console.log("fail to make directory", err);
            }
          });
        }
        //
      }
    }
    else if(projects[i].projectState == "refine"){
      for(var j = 0 ; j < projects[i].blocks.length ; j++){
        var block = await blockSchema.find({_id:projects[i].blocks[j]});
        // TODO: check is it finished & validate
      }
    }
  }
  console.log("verification end");
}

function downloads(url){
}

module.exports = router;