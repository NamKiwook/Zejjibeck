var express = require('express');

var router = express.Router();

var AWS = require('aws-sdk');

//var ep = new AWS.Endpoint('s3-ap-northeast-2.amazonaws.com');

var s3 = new AWS.S3({region:'ap-northeast-2'});

var fileName = "image"
var fileNumber = 0

var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

function setFileName() {
    fileNumber++;
    return fileName + fileNumber.toString() + ".jpg";
}

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/uuu',function(req,res,next){
    console.log('asd');
    res.render('error', {title : 'error'});
});

router.get('/presignedUploadUrl/:fileName', function(req, res) {
    params.Key = req.params.fileName;

    s3.getSignedUrl('putObject', params, function(err, url){
        console.log(url);
        res.end(url);
    });
});

router.get('/presignedAudioUrl', function(req, res) {
    params.Key = "Buzz.mp3";

    s3.getSignedUrl('getObject', params, function(err, url){
        console.log(url);
        res.end(url);
    });
});

router.get('/presignedImageUrl', function(req, res) {
    params.Key = "screen.png"

    s3.getSignedUrl('getObject', params, function(err, url){
        console.log(url);
        res.end(url);
    });

});

module.exports = router;