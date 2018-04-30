var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ decode: req.decoded });
});

router.get('/getMyProjectList', async function(req,res,next){

  var page = req.query.page;
  var unit = 10;
  var projectList = await projectSchema.find().sort({"uploadTime":-1}).skip((page-1)*unit).limit(unit);

  res.send(projectList);
});


module.exports = router;