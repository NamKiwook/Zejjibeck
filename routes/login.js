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
        var compare = await userSchema.find({userId: id, password: password});
        console.log(compare.toString());
        if(compare.toString())
        {
            req.session.userInfo = {id : id};
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
