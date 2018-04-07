var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

router.get('/', function(req,res,next){
  res.render('testS3');
});

router.get('/getPresignedUrl', function(req, res) {
  s3.getSignedUrl('getObject', params, function(err, url){
    res.end(url);
  });
});

router.get('/downloadUrl/:fileName', function(req, res) {
  params.Key = req.params.fileName;
  s3.getSignedUrl('getObject', params, function(err, url){
    res.end(url);
  });
})

// upload
router.get('/uploadUrl/:fileName/:fileNo', function(req,res){
  var leadingNumber = 6;

  var userId = "user";
  var projectId = "first_project";
  var extension = getExtension(req.params.fileName);
  var fileNo = getLeadingZero(req.params.fileNo, leadingNumber);

  params.Key = "rawData/" + userId + "/" + projectId + "/" + fileNo + extension;

  s3.getSignedUrl('putObject', params, function(err, url){
    console.log(url);
    res.end(url);
  });
});

function getLeadingZero(fileNo, leading){
  while(fileNo.length < leading){
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
