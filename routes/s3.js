var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };


router.get('/', function(req, res) {
  res.render('S3ex', { title: 'S3'  });
});


router.get('/getPresignedUrl', function(req, res) {
    s3.getSignedUrl('getObject', params, function(err, url){
        console.log(url);
        res.end(url);
    });
});


router.post('/putPresignedUrl', function(req,res){
    params.Key = req.body.filename;
    console.log(params.Key);
    s3.getSignedUrl('putObject', params, function(err, url){
        console.log(url);
        res.end(url);
    });
});

module.exports = router;