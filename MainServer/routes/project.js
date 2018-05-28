var express = require('express');
var router = express.Router();
var projectSchema = require('../model/project');

var AWS = require('aws-sdk');
var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*15 };

router.get('/', async function(req,res,err){
  var projectId = req.query.projectId;
  try{
    var project = await projectSchema.findOne({_id: projectId});
    res.send({projectInfo : project});
  } catch (err){
    res.send({projectInfo: "none"});
  }

});
router.put('/', async function(req,res,err){
  var description = req.body.description;
  var question = req.body.question;
  var projectName = req.body.projectName;
  var projectId = req.body.projectId;
  var Id = req.decoded.userId;
  try{
    var temp = await projectSchema.findOne({projectName : projectName, owner: Id});
    var compare = false;

    if(temp && temp._id != projectId)
      compare = true;
    if(compare){
      res.send({success: false});
    }
    else {
      var project = await projectSchema.findOne({_id: projectId});
      project.description = description;
      project.question = question;
      project.projectName = projectName;
      await project.save();
      res.send({success: true});
    }
  } catch(err){
    res.send({success: false});
  }
});

router.get('/list', async function(req,res,next){
  try {
    var page = req.query.page;
    var unit = parseInt(req.query.listNo);
    var sortedBy = (req.query.sortedBy == "dec") ? -1 : 1;
    var category = req.query.category;
    var filter = req.query.filter;
    var query = {};
    var sortQuery = {};

    if (category != "ALL") query.projectState = category;
    else query.projectState = {"$in":["Refine","Collect"]};

    if(filter == "credit") sortQuery.stateCredit = sortedBy;
    else sortQuery.uploadTime = sortedBy;

    var projectList = await projectSchema.find(query).sort(sortQuery).skip((page - 1) * unit).limit(unit);
    var totalPage = Math.ceil(await projectSchema.find(query).count() / unit);

    res.send({
      projectList: projectList,
      totalPage: totalPage,
    });
  }
  catch(err){
    console.log(err);
    res.send({
      projectList: [],
      totalPage: 0,
    })
  }
});

router.get('/collectedFile', async function(req,res,next) {
  try{
    var projectId = req.query.projectId;
    var project = await projectSchema.findOne({_id: projectId});

    params.Key = "result/" + req.decoded.userId + "/" + project.projectName + "/result.zip";
    var url = await s3.getSignedUrl('getObject', params);
    res.send({
      url:url,
      success:true
    })

  }catch(err){
    console.log(err);
    res.send({
      success:false,
      errorMessage:err
    })
  }
});

router.get('/refineResult', async function(req,res,next) {
  try{
    var projectId = req.query.projectId;
    var project = await projectSchema.findOne({_id: projectId});

    params.Key = "result/" + req.decoded.userId + "/" + project.projectName + "/result.json";
    var url = await s3.getSignedUrl('getObject', params);
    console.log(url);
    res.send({
      url:url,
      success:true
    })

  }catch(err){
    console.log(err);
    res.send({
      success:false,
      errorMessage:err
    })
  }
});

module.exports = router;