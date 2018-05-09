var express = require('express');
var router = express.Router();

var userSchema = require('../model/user');
var projectSchema = require('../model/project');
var blockSchema = require('../model/blockInfo');

var flagVerification;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/on', function(req, res, next){
  clearInterval(flagVerification);
  var unit = 1 * 60 * 60; // second
  flagVerification = setInterval(verification(), unit * 600);
})

router.get('/off', function(req, res, next){
  clearInterval(flagVerification);
  console.log("verification off");
})

async function verification(){
  console.log("verification start");

  var projects = await projectSchema.find();

  for(var i = 0 ; i < projects.length ; i++){
    console.log(projects[i]);
    if(projects[i].projectState == "collect"){

      var block = await blockSchema.find({_id:projects[i].blocks[0]});

      if(block.total == block.finished){
        // TODO: download & validate duplicate data
      }
    }
    else if(projects[i].projectState == "refine"){

      for(var j = 0 ; j < projects[i].blocks.length ; j++){

        var block = await blockSchema.find({_id:projects[i].blocks[j]});

        // TODO: check is it finished & validate

      }
    }
  }


  console.log("verification end");
}


module.exports = router;
