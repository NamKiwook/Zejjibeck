var express = require('express');
var router = express.Router();
var userSchema = require('../model/user');

var session = require('express-session'); // 세션정보는 메모리에 저장함

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/certification', async function(req,res,next){
    var id = req.params.id;
    var password = req.params.password;

    try{
        var compare = await userSchema.find({userId: id, password: password});
        if(compare.toString())
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