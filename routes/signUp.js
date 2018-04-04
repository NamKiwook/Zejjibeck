var express = require('express');
var router = express.Router();
var userSchema= require('../model/user');


router.get('/', function(req,res,next){
  res.render('signUp');
});

router.post('/confirm', async function(req,res,next){
  var user = new userSchema();
  user.username = req.body.username;
  user.userId = req.body.userId;
  user.password = req.body.password;
  user.credit = 0;
  user.projects = [];
  try{
    var compare = await userSchema.find({userId: user.userId});
    console.log(compare.toString());
    if(compare.toString())
      res.send({pass:'no'});
    else{
      try{
        var save = await user.save();
         res.send({pass:'ok'});
      }
      catch (err){
        res.send({pass:'no'});
      }
    }
  }catch (err){
    res.send({pass:'no'});
  }
});

module.exports = router;
