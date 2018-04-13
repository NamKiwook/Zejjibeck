var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var userSchema = require('../model/user');
var projectSchema = require('../model/project');
var uploadSchema = require('../model/upload');

var bodyParser = require('body-parser');

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

const digits = 6;

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('upload', { title: 'Express'  });
});

router.post('/register', async function(req,res, next){

  var fileNames = req.body.fileNames;

  fileNames = JSON.parse(fileNames);

  var upload = new uploadSchema({
    type: "image",
    files: 10,
    tagType: "radio",
    refineList: req.body.refineList,
    refine: req.body.refine,
    credit: req.body.credit,
    blockSize: 5
  });

  /*
  try {
    var uploadData = await upload.save();
    console.log(uploadData._id);

    var project = new projectSchema();

    project.projectId = "test project4";
    project.description = "this is test project4";
    project.uploadInfo = uploadData._id;

    var projectData = await project.save();
    var user = await userSchema.findOne({userId: req.session.userInfo.id});

    user.projects.push({projectId:project.projectId, project_dbid:projectData._id});

    var user2 = await user.save();
    var user2Project = user2.projects[user2.projects.length-1];
    var project2 = await projectSchema.findOne({_id: user2Project.project_dbid});

    console.log(user2);
    console.log(project2);
  } catch(err){
      res.send({pass:'no'});
  }

  res.send({pass:'ok'});
  */
});

router.get('/url/:projectName/:fileNo/:fileName', function(req,res){
  var userId = req.session.userInfo.id;
  var projectName = req.params.projectName;
  var extension = getExtension(req.params.fileName);
  var fileNo = setLeadingZero(req.params.fileNo);

  params.Key = "rawData/" + userId + "/" + projectName + "/" + fileNo + extension;

  s3.getSignedUrl('putObject', params, function(err, url){
    console.log(url);
    res.end(url);
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