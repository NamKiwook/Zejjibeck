var express = require('express');
var userSchema = require('../model/user');
var router = express.Router();

router.get('/list', async function(req,res,next) {
  var id = req.decoded.userId;
  try {
    var user = await userSchema.findOne({userId: id});
    res.send({success:true,logList:user.creditHistory});
  } catch(err){
    console.log(err);
    res.send({success:true,errorMessage:"네트워크 에러"});
  }
}


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
        errorMessage: "출금할 크레딧이 부족합니다."
      });
    }
    else {
      user.usableCredit -= parseInt(withdraw);
      console.log(user.usableCredit);

      var formattedDate = getFormattedDate(new Date());
      user.creditHistory.push({note:"크레딧 출금", credit:withdraw, date:formattedDate, type:"출금"});
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
      errorMessage: "네트워크 에러"
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
    var formattedDate = getFormattedDate(new Date());
    user.creditHistory.push({note:"크레딧 충전", credit:charge, date:formattedDate, type:"충전"});
    await user.save();
    res.send({
      success: true,
      credit : user.usableCredit
    })
  } catch(err){
    res.send({
      success: false,
      credit : user.usableCredit,
      errorMessage: "네트워크 에러"
    })
  }
});

function getFormattedDate(date) {
  return date.getFullYear().toString() + "." + pad2(date.getMonth() + 1) + "." + pad2(date.getDate()) + ", " + pad2(date.getHours()) + ":" + pad2(date.getMinutes());
}
function pad2(n) { return n < 10 ? '0' + n : n }

module.exports = router;