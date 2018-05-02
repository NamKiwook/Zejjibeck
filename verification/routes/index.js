var express = require('express');
var router = express.Router();

var verification;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/on', function(req, res, next){
  verification = setInterval(function(){
    console.log("verification..");
  }, 5*600); // 5 sec
})

router.get('/off', function(req, res, next){
  clearInterval(verification);
  console.log("verification off");
})


module.exports = router;
