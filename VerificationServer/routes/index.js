var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var fs = require('fs');

var downloadAPI = require('download-url');

var userSchema = require('../../MainServer/model/user');
var projectSchema = require('../../MainServer/model/project');
var blockSchema = require('../../MainServer/model/blockInfo');

var flagVerification;
var timeInterval = 1000 * 60 * 15;

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/on', function(req, res, next){
//  clearInterval(flagVerification);
  var unit = 600; // second
  flagVerification = setInterval(runningVerification, unit * 5);
})

router.get('/off', function(req, res, next){
  clearInterval(flagVerification);
  console.log("verification off");
})

router.get('/downloads', async function(req, res, next){
  // test download function
  var files = JSON.parse(req.query.files);

  for(var i = 0 ; i < files.length ; i++){
    var download = await downloads('a', 'ckmoni', files[i], '.png');
  }

  await res.send("EEE");
})

// 정제 프로세스
// 1. running -> 없애는거
// 2. finished 꽉찬거 분포 처리해서 아웃풋으로 넘겨주기. -> 이상한놈 감지해서 밴
// 3. refine 프로젝트에서 모든 블락이 완료되었을 경우 프로젝트 스테이트 변경

// 수집 프로세스
// 1. finished에서 시간이 초과된 것들 체크
// 2. 전부 다 업로드 됬을 시, 중복 체크해서 완료되면 프로젝트 스테이트 변경, 중복 발견 시 finished 하나 비움
//// 이미지, 음성, 텍스트 -> 정제프로세스 (o/x) -> 향상시키기 위한 방법임. 지금을 위한게 아니다.

// collect일때는, finished 전부 미리 만듬
// 리파인일때는 finished 들어올떄마다 하나씩 만듬

// 정제 1 & 수집 1
async function runningVerification(){
  var projects = await projectSchema.find({projectType : { $not : "finished"}});
  for(var i=0; i< projects.length; i++){
    if(projects[i].projectState == "Refine"){
      var blockList = projects[i].refineBlocks;
      for(var j =0; j<blockList.length; j++){
        var block = blockList[j];
        if(block.finished.length + block.running.length >= projects[i].minimumRefine && block.running.length>0) {
          var time = new Date().getTime();
          var deleteList = [];
          for (var k = 0; k < running.length; k++){
            if(parseInt(running[k].assignTime) + timeInterval > time){
              deleteList.push(k);
            }
          }
          for(var k =deleteList.length-1; k>=0; k--){
            block.running.splice(deleteList[k],1);
          }
        }
      }
    }
    else if(projects[i].projectState == "Collect"){
      var block = blockSchema.findOne({_id:projects[i].collectBlock});
      var time = new Date().getTime();

      for(var j = 0 ; j < block.finished.length ; j++) {
        if (block.finished[j].upload == false && time < parseInt(block.finished[j].assignTime) + timeInterval) {
          block.finished[j].owner = "";
        }
      }
    }
  }
}
async function duplicateVerification(){
  //TODO: 수집이 완료된 애들을 끌어와서 중복 검사후 isvalidate를 done으로 바꿈
}

// 정제 2번
// 2. finished 꽉찬거 분포 처리해서 아웃풋으로 넘겨주기. -> 이상한놈 감지해서 밴
async function refineVerification(){
  //TODO: 분포 확인을 통해 불량 사용자 확인 및 사용자 벤 처벌
  var projects = await projectSchema.find({projectState : "rValidate"});
  var currentTime = new Date().getTime();
  var averageAnswer = [];

  for(var i = 0 ; i < projects.length ; i++){
    for(var j = 0 ; j < projects[i].refineBlocks.length ; j++) {
      var blockId = projects[i].refineBlocks[j];
      var block = await blockSchema.findOne({_id: blockId});
      if (block.running.length + block.finished.length < block.total) continue;
      if (block.running.length > 0) continue;


      for (var k = 0; k < block.finished.length; k++) {
      }
    }
  }
}

async function downloads(user, projectName, fileNo, extension){
  var url = await getDownloadUrl('a', 'logo', 1, '.png');
  var download = await new downloadAPI(url);
  var fileName = strFileName(fileNo) + extension;
  await download.setPath("./temporary").start(fileName).then(function(result){
    console.log('result: ', result);
  },function(error){
    console.log(error);
  })
}

async function getDownloadUrl(userName, projectName, fileNo, extension) {
  var strFileNo = strFileName(fileNo);
  params.Key = "rawData/" + userName + "/" + projectName + "/" + strFileNo + extension;
  var url = await s3.getSignedUrl('getObject', params);
  return url;
}

function strFileName(iName){
  var strFileNo = iName.toString();
  while(strFileNo.length < 6){
    strFileNo = "0" + strFileNo;
  }
  return strFileNo;
}

module.exports = router;