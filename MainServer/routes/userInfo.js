var express = require('express');
var fs = require('fs')
var router = express.Router();
var userSchema= require('../model/user');
var multer = require('multer');
var upload = multer({

  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/../public/profile/");
    },
    filename: function (req, file, cb) {
      cb(null, req.decoded.userId + '.jpg');
    }
  })
})

router.get('/profile', async function (req, res, next) {
  var ID = req.decoded.userId
  try {
    var user = await userSchema.findOne({userId: ID})
    fs.readFile(user.profileUrl, function (err, data) {
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      res.write(data.toString('base64'))
      res.end()
    })
  } catch(err) {
    console.log(err)
  }
})

router.put('/', upload.single('file'), async function(req,res,next){
  var ID = req.decoded.userId;
  try{
    var user = await userSchema.findOne({userId : ID});
    if(req.body.password != null) {
        user.password = req.body.password;
    }
    if(req.file != null) {
        user.profileUrl = req.file.path;
    }
    await user.save();
    res.send({success: true});
  } catch(err){
    res.send({success: false});
  }
});

router.get('/', async function(req,res,next){
  var ID = req.decoded.userId;
  try{
    var user = await userSchema.findOne({userId : ID});
    res.send({userInfo: user});
  } catch(err){
    res.send({userInfo: user});
  }
});
module.exports = router;