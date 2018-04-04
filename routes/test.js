var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };


router.get('/testS3', function(req, res) {
  params.Key = "Phonecert.mp3";
  s3.getSignedUrl('getObject', params, function(err, audioUrl){
    params.Key = "cap.png";
    s3.getSignedUrl('getObject', params, function(err, imageUrl){
      res.render('testS3', { title: 'S3', audioUrl : audioUrl, imageUrl:imageUrl});
    });
  });
});

router.get('/testLogout', function(req, res) {
  res.render('testLogout', { title: 'Express' });
});

router.get('/testSound', function(req, res) {
  params.Key = "Buzz.mp3";
  s3.getSignedUrl('getObject', params, function (err, audioUrl) {
    res.render('testSound', {title: 'testSound', audioUrl: audioUrl});
  });
});

router.get('/testRefine', function(req, res, next) {
  res.render('testRefine',{
    _title: 'sibal',
    _url : ['pic1.png','pic2.png', 'pic3.png'],
    _value : ['강아지', '고양이', '새']
  });
});

// Get file list from Mongo DB
router.get('/getFileList', function(req, res, next){
  var fileList = {
    "ID" : "id00001",   // from session
    "taskID" : "task00001",
    "currentBlock" : 1, // from mongo
    "blockSize" : 5,    // from mongo
    "fileType" : "png",
  }

  // format
  // rawData/ID/taskID/(fileID, %06d format).[fileType]

  res.end(fileList.json());
});


module.exports = router;