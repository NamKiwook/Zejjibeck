var express = require('express');
var router = express.Router();
var userSchema= require('../model/user');

router.put('/', async function(req,res,next){
    var ID = req.decoded.userId;
    try{
        var user = await userSchema.findOne({userId : ID});
        user.password = req.body.password;
        var user2 = await user.save();
        res.send({success: true});
    } catch(err){
        res.send({success: false});
    }
});
module.exports = router;