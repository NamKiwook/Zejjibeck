var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var aws_access_key_id = 'AKIAJYKLXD2TVIJAVMLA';
var aws_secret_access_key = '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';
var region = 'ap-northeast-2';
var credentials = new AWS.Credentials(aws_access_key_id,aws_secret_access_key);
var awsConfig = new AWS.Config({ credentials : credentials, region : region});
var s3 = new AWS.S3(awsConfig);
var params = {Bucket: 'zejjibeck',Key : 'test.jpg', Expires: 60*5};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'  });
});

router.get('/presignedUrl', function(req, res) {
    s3.getSignedUrl('putObject',params, function(err, url){
        console.log(url);
        res.end(url);
    });
});

module.exports = router;
