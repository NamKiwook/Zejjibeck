var express = require('express');
var router = express.Router();
var projectSchema = require('../model/project');

router.get('/list', async function(req,res,next){
  try {
    var page = req.query.page;
    var unit = parseInt(req.query.listNo);
    var sortedBy = (req.query.sortedBy == "dec") ? -1 : 1;
    var category = req.query.category;
    var filter = req.query.filter;
    var query = {};
    var sortQuery = {};

    if (category != "ALL") query.projectType = category;

    if(filter == "credit") sortQuery.credit = sortedBy;
    else sortQuery.uploadTime = sortedBy;

    var projectList = await projectSchema.find(query).sort(sortQuery).skip((page - 1) * unit).limit(unit);
    var totalPage = Math.ceil(await projectSchema.find(query).sort(sortQuery).skip((page - 1) * unit).limit(unit).count() / unit);

    await res.send({
      projectList: projectList,
      totalPage: totalPage,
    });
  }
  catch(err){
    console.log(err);
    await res.send({
      projectList: [],
      totalPage: 0,
    })
  }
});
router.put('/', async function(req,res,err){
  var description = req.body.description;
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
      project.projectName = projectName;
      await project.save();
      res.send({success: true});
    }
  } catch(err){
    res.send({success: false});
  }
});
module.exports = router;