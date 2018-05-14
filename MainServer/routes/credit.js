var express = require('express');
var userSchema = require('../model/user');
var router = express.Router();

router.get('/withdraw', async function(req,res,next){
  var withdraw = req.query.withdrawCredit;
  var id = req.decoded.userId;
  try{
    var user = await userSchema.findOne({userId:id});
    console.log(user.usableCredit);
    if(user.usableCredit - parseInt(withdraw)< 0){
      res.send({
        success : false,
        credit : user.usableCredit,
        errorMessage: "withdrawCredit is larger than your credit"
      });
    }
    else {
      user.usableCredit -= parseInt(withdraw);
      console.log(user.usableCredit);
      await user.save();
      res.send({
        success: true,
        credit: user.usableCredit
      })
    }
  } catch(err) {
    res.send({
      success: false,
      credit: user.usableCredit,
      errorMessage: "DB error"
    })
  }

});

router.get('/charge', async function(req,res,next){

  var charge = req.query.chargeCredit;
  var id = req.decoded.userId;
  try{
    var user = await userSchema.findOne({userId:id});
    console.log(user.usableCredit);
    user.usableCredit += parseInt(charge);
    console.log(user.usableCredit);
    await user.save();
    res.send({
      success: true,
      credit : user.usableCredit
    })
  } catch(err){
    res.send({
      success: false,
      credit : user.usableCredit,
      errorMessage: "DB error"
    })

  }
});


module.exports = router;
