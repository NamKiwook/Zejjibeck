var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var userSchema = require('../model/user');
var projectSchema = require('../model/project');
var blockSchema = require('../model/blockInfo');

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
    projectName: req.body.projectName,
    projectType: req.body.projectType,

    uploadTime: currentTime,

    description: req.body.description,
    fileNo: fileNames.length,
    refineType: req.body.refineType,
    refineList: req.body.refineList,

    minimumRefine: req.body.minimumRefine,

    totalCredit: req.body.totalCredit,

    blockSize: req.body.blockSize,

    completedBlock: 0,
  });

  try{
    var user = await userSchema.findOne({
        userId: req.decoded.userId
    });

    var userProjects = user.projects;

    for(var i = 0 ; i < userProjects.length ; i++)
      if (userProjects[i].projectName == req.body.projectName) {
        res.send({pass: 'dup'});
        return;
      }

    var fileNo = fileNames.length;
    var blockSize = req.body.blockSize.valueOf();
    var blockNo = (fileNo + (fileNo%blockSize)) / blockSize;

    project.blockNo = blockNo;
    project.blocks = [];

    for(var i = 0 ; i < blockNo ; i++){
      var newBlock = new blockSchema();
      newBlock.isValidate = 0;
      newBlock.finished = 0;
      newBlock.running = 0;
      newBlock.lastAssignTime = 0;
      newBlock.AnswerLists = [];
      var blockId= await newBlock.save();
      project.blocks.push(blockId._id);
    }

    var projectUpload = await project.save();

    user.projects.push({
        projectName:req.body.projectName,
        project_dbid:projectUpload._id,
    });

    var userUpdate = await user.save();

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