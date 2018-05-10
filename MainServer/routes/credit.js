var express = require('express');
var userSchema = require('../model/user');
var router = express.Router();

router.get('/withdraw', async function(req,res,next){

  var page = req.query.page;
  var unit = 10;
  var projectList = await projectSchema.find().sort({"uploadTime":-1}).skip((page-1)*unit).limit(unit);

  res.send(projectList);
});


module.exports = router;
