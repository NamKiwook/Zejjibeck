var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var fs = require('fs');

var userSchema = require('../model/user');
var projectSchema = require('../model/project');
var blockSchema = require('../model/blockInfo');

var flagVerification;

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/on', function(req, res, next){
  console.log("!!");
//  clearInterval(flagVerification);
  var unit = 600; // second
  console.log("111");
  flagVerification = setInterval(verification, unit * 5);

  res.send("EEE");
})

router.get('/off', function(req, res, next){
  clearInterval(flagVerification);
  console.log("verification off");
})

function getSignedUrl(userName, projectName, fileNo, extension) {

  var strFileNo = fileNo.toString();

  while(strFileNo.length < 6){
    strFileNo = "0" + strFileNo;
  }

  params.Key = "/rawData/" + userName + "/" + projectName + "/" + strFileNo + "/" + extension;

  s3.getSignedUrl('getObject', params, function(err, url){
    return url;
  })
}

async function verification(){
}

function downloads(url){
}

module.exports = router;