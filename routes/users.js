var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var userId;

  console.log("!!!!!");
  console.log(req.session);

  if(req.session)
    res.render('dashboard',{title: 'login'});
  else
    res.redirect('login');
});

module.exports = router;
