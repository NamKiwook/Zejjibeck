var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/uuu',function(req,res,next){
    console.log('asd');
   res.render('error', {title : 'error'});
});

module.exports = router;
