var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var fs = require('fs');

var userSchema = require('../../MainServer/model/user');
var projectSchema = require('../../MainServer/model/project');
var blockSchema = require('../../MainServer/model/blockInfo');

var flagVerification;

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/on', function(req, res, next){
  console.log("!!");
//  clearInterval(flagVerification);
  var unit = 600; // second
  console.log("111");
  flagVerification = setInterval(runningVerification, unit * 5);

  res.send("EEE");
})

router.get('/off', function(req, res, next){
  clearInterval(flagVerification);
  console.log("verification off");
})

function getSignedUrl(userName, projectName, fileNo, extension) {

  var strFileNo = fileNo.toString();

  while(strFileNo.length < 6){
    strFileNo = "0" + strFileNo;
  }

  params.Key = "/rawData/" + userName + "/" + projectName + "/" + strFileNo + "/" + extension;

  s3.getSignedUrl('getObject', params, function(err, url){
    return url;
  })
}

async function runningVerification(){
  var projects = await projectSchema.find({projectType : { $not : "finished"}});
  for(var i=0; i< projects.length; i++){
    if(projects[i].projectState == "Refine"){
      var blockList = projects[i].refineBlocks;
      for(var j =0; j<blockList.length; j++){
        var block = blockList[j];
        if(block.finished.length + block.running.length >= block.total && block.running.length>0) {
          var time = new Date().getTime();
          var deleteList = [];
          for (var k = 0; k < running.length; k++){
            if(parseInt(running[k].assignTime) + 1000 * 60 * 15 > time){
              deleteList.push(k);
            }
          }
          for(var k =deleteList.length-1; k>=0; k--){
            block.running.splice(deleteList[k],1);
          }
        }
      }
    }
    else {
      /*TODO: collect upload 정의한 후 하자! 수집이 완료되었는지 검사 finished의 저장된 정보가 제대로 올라왔는지 검사하고, 그 수가 maxCollect보다 작을 시
        TODO: 정보수정하고 projectState를 변경해줌
      */
    }
  }
}
async function duplicateVerification(){
  //TODO: 수집이 완료된 애들을 끌어와서 중복 검사후 isvalidate를 done으로 바꿈
}
async function refineVerification(){
  //TODO: 분포 확인을 통해 불량 사용자 확인 및 사용자 벤 처벌
}
function downloads(url){
}

module.exports = router;