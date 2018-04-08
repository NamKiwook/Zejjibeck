var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

const digits = 6;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('testRefine',{
    _title: 'sibal',
    _url : ['pic1.png','pic2.png', 'pic3.png'],
    _value : ['강아지', '고양이', '새']
  });
});

// Get file list from Mongo DB
router.get('/getFileList', function(req, res, next){
  var fileList = {
    "ID" : "id000001",   // from session
    "taskID" : "task000001",
    "currentBlock" : 1, // from mongo
    "blockSize" : 5,    // from mongo
    "fileType" : "png",
  }

  res.end(fileList.json());
});

router.get('/getFileUrl/:fileNo', function(req, res, next){
  var userId = req.session.userInfo.id;
  var projectId = req.param('projectId');
  var fileNo = setLeadingZero(req.params.fileNo);
  var extension = req.param('extension');

  params.Key = "rawData/" + userId + "/" + projectId + "/" + fileNo + extension;

  s3.getSignedUrl('getObject', params, function(err, url){
    res.end(url);
  });
});

function setLeadingZero(fileNo){
  while(fileNo.length < digits){
    fileNo = '0' + fileNo;
  }
  return fileNo;
}

module.exports = router;
