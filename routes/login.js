var express = require('express');
var router = express.Router();
var userSchema = require('../model/user');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/certification/:id/:password', async function(req,res,next){
  var id = req.params.id;

   var password = req.params.password;

   try{
     var user = await userSchema.findOne({userId: id, password: password});
     if(user.toString())
     {
       req.session.user = user;
       res.send({pass:'ok'});
     }
     else
       res.send({pass:'no'});
   }catch (err){
     res.send({pass:'no'});
   }

});

router.post('/logout', function(req,res,next){
    req.session.destroy();
    res.clearCookie('zjb');
    res.end();
});

module.exports = router;
