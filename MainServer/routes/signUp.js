var express = require('express');
var router = express.Router();
var userSchema= require('../model/user');

router.get('/', async function(req,res,next){
  var user = new userSchema();
  user.username = req.query.username;
  user.userId = req.query.userId;
  user.password = req.query.password;
  user.credit = 0;
  user.penalty = 0;
  user.projects = [];
  try{
    var compare = await userSchema.find({userId: user.userId});
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