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

  try{
    var user = await userSchema.findOne({
        userId: req.decoded.userId
    });

    var project = new projectSchema({
      owner : user.userId,

      projectName: req.body.projectName,
      projectType: req.body.projectType,
      dataType: req.body.dataType,
      uploadTime: currentTime,
      question: req.body.question,
      description: req.body.description,
      fileNo: fileNames.length,
      refineType: req.body.refineType,
      refineList: req.body.refineList,

      minimumRefine: req.body.minimumRefine,

      totalCredit: req.body.totalCredit,

      blockSize: req.body.blockSize,
      maxCollect :req.body.maxCollect,
      completedBlock: 0,
    });

    if(req.body.projectType == "Refine")
      project.projectState = "Refine";
    var userProjects = user.projects;

    for(var i = 0 ; i < userProjects.length ; i++)
      if (userProjects[i].projectName == req.body.projectName) {
        res.send({success: false, errorMessage: "Duplicated project name!"});
        return;
      }


    if(req.body.projectType == "Collect"){

      var newBlock = new blockSchema();
      newBlock.property = "Collect";
      newBlock.maxCollect = req.body.maxCollect;
      newBlock.isValidate = "Not Validate";
      newBlock.finished = [];

      for(var i = 0 ; i < parseInt(req.body.maxCollect) ; i++){
        newBlock.finished.push({
          owner:"",
          expireTime:"",
          upload:false,
        });
      }

      var BlockId = await newBlock.save();

      project.collectBlock = BlockId._id;
      project.collectCredit = Math.floor(parseInt(project.totalCredit)/parseInt(project.maxCollect));
      project.stateCredit = project.collectCredit;
    }


    else if(req.body.projectType == 'Refine') {

      var fileNo = fileNames.length;
      if(req.body.projectType != "Refine")
        fileNo = parseInt(req.body.maxCollect);

      var blockSize = parseInt(req.body.blockSize);
      var blockNo = Math.floor((fileNo + blockSize - 1) / blockSize);

      project.refineCredit = Math.floor(parseInt(project.totalCredit) / (fileNo * parseInt(req.body.minimumRefine)));
      project.stateCredit = project.refineCredit;
      project.blockNo = blockNo;
      project.refineBlocks = [];


      for (var i = 0; i < blockNo; i++) {
        var newBlock = new blockSchema();
        newBlock.isValidate = "Not Validate";
        newBlock.finished = [];
        newBlock.running = [];
        newBlock.property = "Refine";
        var blockId = await newBlock.save();
        project.refineBlocks.push(blockId._id);
      }
    }
    else {
      //collect
      var newBlock = new blockSchema();
      newBlock.property = "Collect";
      newBlock.maxCollect = req.body.maxCollect;
      newBlock.isValidate = "Not Validate";
      newBlock.finished = [];

      for(var i = 0 ; i < parseInt(req.body.maxCollect) ; i++){
        newBlock.finished.push({
          owner:"",
          expireTime:"",
          upload:false,
        });
      }

      var BlockId = await newBlock.save();
      project.collectBlock = BlockId._id;
      project.collectCredit = Math.floor(parseInt(project.totalCredit)/(2*parseInt(project.maxCollect)));
      project.stateCredit = project.collectCredit;

      // refine
      var maxCollect = parseInt(req.body.maxCollect);
      var blockSize = parseInt(req.body.blockSize);
      var blockNo = Math.floor((maxCollect + blockSize - 1) / blockSize);

      project.refineCredit = Math.floor(parseInt(project.totalCredit) / (2*maxCollect * parseInt(req.body.minimumRefine)));
      project.blockNo = blockNo;
      project.refineblocks = [];

      for (var i = 0; i < blockNo; i++) {
        var newBlock = new blockSchema();
        newBlock.isValidate = "Not Validate";
        newBlock.finished = [];
        newBlock.running = [];
        newBlock.property = "Refine";
        var blockId = await newBlock.save();
        project.refineblocks.push(blockId._id);
      }
    }

    var projectUpload = await project.save();

    user.projects.push({
      projectName: req.body.projectName,
      project_dbid: projectUpload._id,
    });

    var userUpdate = await user.save();

    res.send({success:true});
  } catch(err){
    console.log(err);
    res.send({success: false, errorMessage : " DB error!"});
  }
});

router.get('/url', async function(req,res){
  var userId = req.decoded.userId;
  var projectName = req.query.projectName;
  var extension = getExtension(req.query.fileName);
  var fileNo = setLeadingZero(req.query.fileNo);

  if(req.query.fileNo == 0){
    var project = await projectSchema.findOne({
      projectName:projectName,
      owner:userId
    })
    project.fileExtension = extension;
    await project.save();
  }

  params.Key = "rawData/" + userId + "/" + projectName + "/" + fileNo + extension;

  var url = await s3.getSignedUrl('putObject', params);
  res.send({url: url});

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