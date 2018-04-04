var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log(req.session.username);
  if(req.session.username)
    res.render('dashboard',{title: 'login'});
  else
    res.redirect('login');
});

module.exports = router;
