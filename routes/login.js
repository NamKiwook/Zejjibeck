var express = require('express');
var router = express.Router();
var userSchema = require('../model/user');

var session = require('express-session'); // 세션정보는 메모리에 저장함

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
<<<<<<< HEAD

router.get('/certification', async function(req,res,next){
  var params = getParameters(req.url);

  var id = params.id;
  var password = params.password;

  console.log(id);
  console.log(password);
=======
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
>>>>>>> nam

});
router.post('/logout', function(req,res,next){
    req.session.destroy();
    res.clearCookie('zjb');
    res.end();
});
<<<<<<< HEAD

function getParameters(url)
{
  var params = {};

  var temp = (url.slice(url.indexOf('?') + 1, url.length)).split('&');

  for(var i = 0; i < temp.length; i++) {
    var key = temp[i].split('=')[0];
    var value = temp[i].split('=')[1];
    params[key]=value;
  }
  return params
}


module.exports = router;
=======
module.exports = router;
>>>>>>> nam
