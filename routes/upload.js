var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var userSchema = require('../model/user');
var projectSchema = require('../model/project');
var uploadSchema = require('../model/upload');

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

const digits = 6;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('upload', { title: 'Express'  });
});

router.post('/register', async function(req,res,next){

  var upload = new uploadSchema({
    type: "image",
    files: 10,
    tagType: "radio",
    tagValue: ["사과", "딸기", "바나나"],
    minTag: 5,
    totalCredit: 100,
    blockSize: 5
  });
  try {
      var uploadData = await upload.save();
      console.log(uploadData._id);

      var project = new projectSchema();
      project.projectId = "test project4";
      project.description = "this is test project4";
      project.uploadInfo = uploadData._id;


      var projectData = await project.save();
      var user = await userSchema.findOne({userId: req.session.user.userId});
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

});
// "fileNo" means upload file's index
// TODO : get user/project id from cookie
router.get('/uploadUrl/:fileName/:fileNo', function(req,res){
  var userId = "user";
  var projectId = "first_project";
  var extension = getExtension(req.params.fileName);
  var fileNo = getLeadingZero(req.params.fileNo);

  params.Key = "rawData/" + userId + "/" + projectId + "/" + fileNo + extension;

  s3.getSignedUrl('putObject', params, function(err, url){
    console.log(url);
    res.end(url);
  });
});

function getLeadingZero(fileNo){
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