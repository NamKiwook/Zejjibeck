var express = require('express');
const jwt = require('jsonwebtoken')
var userSchema = require('../model/user');
var router = express.Router();

/* GET users listing. */
router.get('/',async function(req, res, next) {
  var userId = req.query.userId;
  var password = req.query.password;

  const secret = 'zejjibeck';
  try {
    var user = await userSchema.findOne({userId: userId, password: password});
    if (user.toString()) {
      var userToken = await jwt.sign(
        {
          userId: userId
        },
        secret,
        {
          expiresIn: '7d'
        })
      res.send({
        success: true,
        token: userToken,
        userInfo: user
      });
    }
    else
      res.send({success: false});
  }catch (err){
    res.send({success: false});
  }
})

module.exports = router;
