var express = require('express');

var router = express.Router();

var AWS = require('aws-sdk');

//var ep = new AWS.Endpoint('s3-ap-northeast-2.amazonaws.com');

var s3 = new AWS.S3({region:'ap-northeast-2'});// 이거 3시간짜리,, 기본설정이 미국으로 되어있어서 한국으로 해줘야댐

var fileName = "image"
var fileNumber = 0

var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 }; // Bucket : bucket이름 우리꺼 zejjibeck 넣으면 될듯

function setFileName() {
    fileNumber++;
    return fileName + fileNumber.toString() + ".jpg";
}

// Key: put할때는 저장할 파일이름 get할때는 읽어올 파일이름
// expires : 초단위

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/uuu',function(req,res,next){
    console.log('asd');
    res.render('error', {title : 'error'});
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