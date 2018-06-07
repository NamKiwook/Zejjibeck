var express = require('express');
var router = express.Router();
var userSchema= require('../model/user');
var fs = require('fs')

router.get('/', async function(req,res,next){
  var user = new userSchema(req.query);
  fs.readFile(__dirname + "/../public/profile/default.png", function (err, data) {
    user.profileUrl = data.toString('base64');
  })
  try{
    var compare = await userSchema.find({userId: user.userId});
    if(compare.toString())
      res.send({success:false,errorMassage:"중복된 아이디"});
    else{
      try{
        await user.save();
        res.send({success:true});
      }
      catch (err){
        console.log(err)
        res.send({success:false});
      }
    }
  }catch (err){
    console.log(err)
    res.send({success:false});
  }
});

module.exports = router;