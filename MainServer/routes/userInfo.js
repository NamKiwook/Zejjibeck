var express = require('express');
var router = express.Router();
var userSchema= require('../model/user');

router.put('/', async function(req,res,next){
    var ID = req.decoded.userId;
    var password = req.body.password;
    try{
        var user = await userSchema.findOne({userId : ID});
        user.password = password;
        await user.save();
        res.send({success: true});
    } catch(err){
        res.send({success: false});
    }
});
module.exports = router;