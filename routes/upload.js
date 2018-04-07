var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

const digits = 6;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('upload', { title: 'Express'  });
});

// TODO : get user/project id from cookie
router.get('/uploadUrl/:fileName/:fileNo', function(req,res){
  var userId = "user";
  var projectId = "first_project";
  var extension = getExtension(req.params.fileName);
  var fileNo = getLeadingZero(req.params.fileNo);

  params.Key = "rawData/" + userId + "/" + projectId + "/" + fileNo + extension;
}

module.exports = router;