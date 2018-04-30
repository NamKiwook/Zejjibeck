var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var userSchema = require('../model/user');
var projectSchema = require('../model/project');

var bodyParser = require('body-parser');

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

const digits = 6;

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

/* GET home page. */
router.post('/', async function(req,res, next){


  var fileNames = req.body.fileNames;
  var currentTime = new Date().getTime();

 // fileNames = JSON.parse(fileNames);

  var project = new projectSchema({
    projectType: req.body.projectType, // 'image' 'audio' 'text'
    fileNo: fileNames.length,
    refineType: req.body.refineType,
    refineList: req.body.refineList,
    minimumRefine: req.body.minimumRefine,
    totalCredit: req.body.totalCredit,
    blockSize: req.body.blockSize,
    projectName: req.body.projectName,
    description: req.body.description,
    uploadTime: currentTime,
  });

  try {
    var projectData = await project.save();

    var user = await userSchema.findOne({
      userId: req.decoded.userId
    });

    user.projects.push({
        projectName:project.projectName,
        project_dbid:projectData._id
      });

    var user2 = await user.save();
    var user2Project = user2.projects[user2.projects.length-1];
    var project2 = await projectSchema.findOne({_id: user2Project.project_dbid});

    res.send({pass:'ok'});
  } catch(err){
      res.send({pass:'no'});
  }
});

router.get('/url', function(req,res){
  var userId = req.decoded.userId;
  var projectName = req.query.projectName;
  var extension = getExtension(req.query.fileName);
  var fileNo = setLeadingZero(req.query.fileNo);

  params.Key = "rawData/" + userId + "/" + projectName + "/" + fileNo + extension;

  s3.getSignedUrl('putObject', params, function(err, url){
    console.log(url);
    res.send({url: url});
  });
});

function setLeadingZero(fileNo){
  while(fileNo.length < digits){
    fileNo = '0' + fileNo;
  }
  return fileNo;
}

function getExtension(fileName){
  var extension = "";
  for(var i = fileName.length - 1 ; i >= 0 ; i--) {
    extension = fileName[i] + extension;
    if(fileName[i] == '.') break;
  }
  return extension;
}

module.exports = router;