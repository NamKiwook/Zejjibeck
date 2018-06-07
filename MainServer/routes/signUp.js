var express = require('express');
var router = express.Router();
var userSchema= require('../model/user');
var fs = require('fs')
var util = require('util')

router.get('/', async function(req,res,next){
  var user = new userSchema(req.query);
  var readFile = util.promisify(fs.readFile)
  try{
    var data = await readFile(__dirname + "/../public/profile/default.png");
    user.profileUrl = data.toString('base64');
    var compare = await userSchema.find({userId: user.userId});
    if(compare.toString())
      res.send({success:false,errorMessage:"중복된 아이디"});
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
