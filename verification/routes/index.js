var express = require('express');
var router = express.Router();

/*
var userSchema = require('../model/user');
var projectSchema = require('../model/project');
var blockSchema = require('../model/blockInfo');
*/

var verification;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/on', function(req, res, next){
  clearInterval(verification);
  verification = setInterval(verification(), 5*600); // 5 sec
})

router.get('/off', function(req, res, next){
  clearInterval(verification);
  console.log("verification off");
})

function verification(){
  console.log("verification start");

  // blah blah

  console.log("verification end");
}


module.exports = router;
