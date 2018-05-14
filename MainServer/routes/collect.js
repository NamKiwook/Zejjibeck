var express = require('express');
var router = express.Router();
var projectSchema = require('../model/project');

router.get('/', async function(req,res,err){
  var projectId = req.query.projectId;
  try{
    var project = await projectSchema.findOne({_id: projectId});
    res.send({projectInfo : project});
  } catch (err){
    res.send({projectInfo: "none"});
  }
});
module.exports = router;