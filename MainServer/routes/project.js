var express = require('express');
var router = express.Router();
var projectSchema = require('../model/project');

router.get('/list', async function(req,res,next){
  var page = req.query.page;

  // TODO things..
  // var filter;

  var unit = 10;
  var projectList = await projectSchema.find().sort({"uploadTime":-1}).skip((page-1)*unit).limit(unit);
  var totalPage = Math.ceil(await projectSchema.find().count() / unit);

  //TODO: SEND ONLY JSON TYPE
  res.send({
    projectList: projectList,
    totalPage: totalPage,
  });
});``
module.exports = router;