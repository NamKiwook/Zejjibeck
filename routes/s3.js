var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };


router.get('/', function(req, res) {
  params.Key = "Phonecert.mp3";
  s3.getSignedUrl('getObject', params, function(err, audioUrl){
    params.Key = "cap.png";
    s3.getSignedUrl('getObject', params, function(err, imageUrl){
      res.render('S3ex', { title: 'S3', audioUrl : audioUrl, imageUrl:imageUrl});
    });
  });
});


router.get('/getPresignedUrl/:fileName', function(req, res) {
  params.Key=req.params.filenName;
  s3.getSignedUrl('getObject', params, function(err, url){
    res.end(url);
  });
});


router.get('/putPresignedUrl/:fileName', function(req,res){
  params.Key = req.params.fileName;
  s3.getSignedUrl('putObject', params, function(err, url){
    res.end(url);
    });
});

module.exports = router;
