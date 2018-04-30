var express = require('express');
const jwt = require('jsonwebtoken')
var userSchema = require('../model/user');
var router = express.Router();

/* GET users listing. */
router.get('/',async function(req, res, next) {
  var userId = req.query.userId;
  var password = req.query.password;

  console.log(userId);

  const secret = 'zejjibeck';
  try {
    var compare = await
    userSchema.findOne({userId: userId, password: password});
    if (compare.toString()) {
      var userToken = await
      jwt.sign(
        {
          userId: userId
        },
        secret,
        {
          expiresIn: '7d'
        })
      res.send({
        pass: 'yes',
        token: userToken
      });
    }
    else
      res.send({pass: 'no'});
  }catch (err){
    res.send({pass:'no'});
  }
})

module.exports = router;
