var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'firebat.com',Key:'filetest2', Expires: 60*500 };





router.get('/getPresignedUrl', function(req, res) {
    s3.getSignedUrl('getObject', params, function(err, url){
        console.log(url);
        res.end(url);
    });

});
router.post('/putPresignedUrl', function(req,res){
    params.Key = String(req.body.filename);
    console.log(params.Key);
    s3.getSignedUrl('putObject', params, function(err, url){
        console.log(url);
        res.end(url);
    });
});

module.exports = router;