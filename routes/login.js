var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.username)
        res.redirect('/users');
    else
        res.render('login', { title: 'Express' });
});
router.get('/certification/:id/:password', function(req,res,next){
    var id = req.params.id;
    var password = req.params.password;

    console.log(id);
    if(req.session.username!=id)
        req.session.username = id;
    res.send({pass:'ok'});
});
router.post('/logout', function(req,res,next){
    req.session.destroy(function(err){
        console.log("session delete");
    });
    res.end();
});
module.exports = router;
