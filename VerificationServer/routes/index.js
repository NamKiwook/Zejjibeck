var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var fs = require('fs');
var util = require('util');
var zip = require('zipfolder');
var rimraf = require('rimraf');


var downloadAPI = require('download-url');

var userSchema = require('../model/user');
var projectSchema = require('../model/project');

var blockSchema = require('../model/blockInfo');

var flagVerification;
var timeInterval = 1000 * 60 * 15; //1000 * 60 * 15;

var unit = 600; // second

var s3 = new AWS.S3({region:'ap-northeast-2'});
var params = {Bucket: 'zejjibeck',Key:'', Expires: 60*5 };
var uploadParams ={Bucket: 'zejjibeck', Key:'', Body:''};

const readFile = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
        if (err) reject(err);
        else resolve(data);
    });
});

const s3Upload =  uploadParams => new Promise((resolve, reject) =>{
    s3.putObject(uploadParams, function(err, data) {
        if (err) reject(err);
        else resolve(data);
    });
});

const deleteFile = deletePath => new Promise((resolve, reject) =>{
   rimraf(deletePath, function(err){
        if(err) reject(err);
        else resolve();
   });
});
const mkDir = mkPath => new Promise((resolve, reject) =>{
   fs.mkdir(mkPath, function(err){
       if(err) reject(err);
       else resolve();
   });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//flagVerification = setInterval(runVerification, unit * 60 * 5);

router.get('/on', async function(req, res, next){
//  console.log("Start Verification");
  for(;;){
    await runVerification();

    console.log()
  }
//  await runVerification();
//  flagVerification = setInterval(runVerification, unit * 10 * 1);
//  console.log("Finished Yeah~");
//  res.send("YEE");
});

router.get('/off', async function(req, res, next){
  clearInterval(flagVerification);
  console.log("Turn off!");
  res.send("YEE");
});


async function runVerification(){
  console.log("Start time expire verification!");
  await timeExpireVerification();
  console.log("End time expire check, Start duplicate verification!");
  await duplicateVerification();
  console.log("End duplicate verification, Start refine verification!");
  await refineVerification();
  console.log("Finish!");
}

async function timeExpireVerification(){
  try {
    var projects = await projectSchema.find();

    for (var i = 0; i < projects.length; i++) {
      if (projects[i].projectState == "finished") continue;
      else if (projects[i].projectState == "rValidate") {
        var blockList = projects[i].refineBlocks;
        for (var j = 0; j < blockList.length; j++) {
          var block = await blockSchema.findOne({_id : blockList[j]});
          if (block.finished.length + block.running.length >= parseInt(projects[i].minimumRefine) && block.running.length > 0) {
            var time = new Date().getTime();
            var deleteList = [];
            for (var k = 0; k < block.running.length; k++) {
              if (parseInt(block.running[k].assignTime) + timeInterval < time) {
                projects[i].projectState = "Refine";
                deleteList.push(k);
              }
            }
            for (var k = deleteList.length - 1; k >= 0; k--) {
              block.running.splice(deleteList[k], 1);
            }
          }
          await block.save();
        }
      }
      else if (projects[i].projectState == "cValidate") {
        var block = await blockSchema.findOne({_id: projects[i].collectBlock});
        var time = new Date().getTime();
        var saveFlag = 0;
        var finished = JSON.parse(JSON.stringify(block.finished));

        for (var j = 0; j < finished.length; j++) {
          if (finished[j].upload == false && time > parseInt(finished[j].assignTime) + timeInterval) {
            finished[j].owner = "";
            projects[i].projectState = "Collect";
            saveFlag = 1;
          }
        }
        if (saveFlag == 1) {
          block.finished = finished;
          await block.save();
        }
      }
    }
    for (var i = 0; i < projects.length; i++) {
      await projects[i].save();
    }
  }
  catch(err){
    console.log(err);
  }
}

async function duplicateVerification(){
  try {
      var projects = await projectSchema.find({projectState: "cValidate"});

      for (var i = 0; i < projects.length; i++) {
          var block = await blockSchema.findOne({_id: projects[i].collectBlock});
          var userId = projects[i].owner;
          var projectName = projects[i].projectName;
          var extension = projects[i].fileExtension;
          var collectCredit = parseInt(projects[i].collectCredit);
          var breakingPoint = 0;


          for (var j = 0; j < block.finished.length; j++) {
            if(block.finished[j].upload == false) {
              breakingPoint = 1;
              break;
            }
          }

          if(breakingPoint == 1) continue;


          await deleteFile('./temporary');
          await deleteFile('./result');

          await mkDir('./temporary'+userId);
          await mkDir('./result');

          for (var j = 0; j < block.finished.length; j++) {
              await downloads(userId, projectName, j, extension);
          }

          var duplicated = [];

          for (var j = 0; j < block.finished.length; j++)
              duplicated.push(0);


          for (var j = 0; j < block.finished.length; j++) {
              if (duplicated[j] == 0) {
                  for (var k = j + 1; k < block.finished.length; k++) {
                      var isDuplicate = await IdentityFile(j, k, extension);
                      if (isDuplicate) {
                          duplicated[k] = 1;
                      }
                  }
              }
          }


          var duplicateFlag = false;
          var finished = JSON.parse(JSON.stringify(block.finished));
          for (var j = 0; j < finished.length; j++) {
              if (duplicated[j] == 1) {
                var collectUser = await userSchema.findOne({userId : finished[j].owner});
                collectUser.prearrangedCredit = parseInt(collectUser.prearrangedCredit) - collectCredit;
                await collectUser.save();

                finished[j].owner = "";
                finished[j].upload = false;
                duplicateFlag = true;
              }
          }

          if (duplicateFlag == true) {
              block.finished = finished;
              await block.save();
              projects[i].projectState = "Collect";
          }
          else {
              if (projects[i].projectType == "Refine&Collect") {
                  projects[i].projectState = "Refine";
              }
              else {
                  projects[i].projectState = "finished";
              }

              for(var j = 0 ; j < finished.length ; j++){
                var collectUserId = finished[j].owner;
                var collectUser = await userSchema.findOne({userId : collectUserId});
                collectUser.prearrangedCredit = parseInt(collectUser.prearrangedCredit) - collectCredit;
                collectUser.usableCredit = parseInt(collectUser.usableCredit) + collectCredit;
                await collectUser.save();
              }

              var owner = projects[i].owner;
              var projectName = projects[i].projectName;
              var zipPath = await zip.zipFolder({folderPath:'./temporary', targetFolderPath:'./result'});
              var data = await readFile(zipPath);
              await uploads(owner, projectName, data, "result.zip");
          }
      }

      for (var i = 0; i < projects.length; i++) {
          await projects[i].save();
      }
  } catch(err){
    console.log(err);
  }
}

async function IdentityFile(x, y, extension){
  try {
    var pathX = "./temporary/" + strFileName(x) + extension;
    var pathY = "./temporary/" + strFileName(y) + extension;

    var readFile = util.promisify(fs.readFile);
    var fileX = await readFile(pathX);
    var fileY = await readFile(pathY);

    fileX = fileX.toString();
    fileY = fileY.toString();

    if (fileX == fileY) return true;
    else return false;
  }
  catch(err){
    console.log(err);
    return false;
  }
}


async function refineVerification(){
  //TODO: 분포 확인을 통해 불량 사용자 확인 및 사용자 벤 처벌
  var projects = await projectSchema.find({projectState : "rValidate"});

  for(var i = 0 ; i < projects.length ; i++){

    var projectFinishedFlag = true;
    for(var j = 0 ; j < projects[i].refineBlocks.length ; j++) {

      var blockId = projects[i].refineBlocks[j];
      var block = await blockSchema.findOne({_id: blockId});
      if (block.isValidate == "Done")continue;
      if (block.finished.length != parseInt(projects[i].minimumRefine)) {
        projectFinishedFlag = false;
        continue;
      }

      block.isValidate = "Done";

      var refineCredit = parseInt(projects[i].refineCredit);
      var finished = block.finished;

      for(var k = 0 ; k < finished.length ; k++){
        var refineUserId = finished[k].userId;
        var refineUser = await userSchema.findOne({userId : refineUserId});
        var problemNo = parseInt(finished[k].answerList.length);
        refineUser.prearrangedCredit = parseInt(refineUser.prearrangedCredit) - refineCredit * problemNo;
        refineUser.usableCredit = parseInt(refineUser.usableCredit) + refineCredit * problemNo;
        await refineUser.save();
      }

      var refineType = projects[i].refineType;

      if(refineType == "Radio"){
        console.log("radio..");
        for(var k = 0 ; k < block.finished[0].answerList.length ; k++) {
          block.countResult.push([]);
          for (var l = 0; l < projects[i].refineList.length; l++) {
            block.countResult[k].push(0);
          }
        }

        for(var k = 0 ; k < block.finished.length; k++){
          var answerList = block.finished[k].answerList;
          for(var l = 0 ; l < answerList.length; l++){
            block.countResult[l][parseInt(answerList[l])]++;
          }
        }

        console.log(block.countResult);
      }
      else if (refineType == "Checkbox"){
        for(var k = 0 ; k < block.finished[0].answerList.length ; k++) {
          block.countResult.push([]);
          for (var l = 0; l < projects[i].refineList.length; l++) {
            block.countResult[k].push(0);
          }
        }
        for(var k = 0 ; k < block.finished.length; k++){
          var answerList = block.finished[k].answerList;
          for(var l = 0 ; l < answerList.length; l++){
            for(var m = 0 ; m< answerList[l].length; m++){
              block.countResult[l][parseInt(answerList[l][m])]++;
            }
          }
        }
      }
      else if (refineType == "Drag"){
        var tempList = [];
          for(var k = 0; k< block.finished[0].answerList.length;k++){
            tempList.push([]);
            block.coordinateResult.push({minX: 2 , minY :2 , maxX: -1, maxY: -1});
          }
          for(var k = 0 ; k < block.finished.length; k++){
            var answerList = block.finished[k].answerList;
            for(var l = 0 ; l < answerList.length; l++){
              var crd = JSON.parse(JSON.stringify(answerList[l]));
              var minX = Math.min(parseFloat(crd.prevX), parseFloat(crd.curX));
              var minY = Math.min(parseFloat(crd.prevY), parseFloat(crd.curY));
              var maxX = Math.max(parseFloat(crd.prevX), parseFloat(crd.curX));
              var maxY = Math.max(parseFloat(crd.prevY), parseFloat(crd.curY));

              tempList[l].push({minX : minX , minY: minY, maxX: maxX, maxY: maxY});
            }
          }
          for(var k = 0 ; k< tempList.length; k++){
            var resultList = tempList[k];
            if(tempList[k].length >= 5) {
              tempList[k].sort(function (a, b) {
                return parseFloat(a.minX) - parseFloat(b.minX);
              });
              var delSize = Math.floor(tempList[k].length*0.2);
              resultList = tempList[k].slice(delSize, tempList[k].length-delSize);

              if(resultList.length >= 5) {
                resultList.sort(function (a, b) {
                  return a.minY - b.minY;
                });
                var delSize2 = Math.floor(resultList.length*0.2);
                resultList = resultList.slice(delSize2, resultList.length-delSize2);
              }
            }
            var minX = 0.0;
            var minY = 0.0;
            var maxX = 0.0;
            var maxY = 0.0;

            for(var l =0 ; l < resultList.length; l++){
              minX += parseFloat(resultList[l].minX);
              minY += parseFloat(resultList[l].minY);
              maxX += parseFloat(resultList[l].maxX);
              maxY += parseFloat(resultList[l].maxY);
            }

            minX /= resultList.length;
            minY /= resultList.length;
            maxX /= resultList.length;
            maxY /= resultList.length;

            block.coordinateResult[k].minX = minX;
            block.coordinateResult[k].minY = minY;
            block.coordinateResult[k].maxX = maxX;
            block.coordinateResult[k].maxY = maxY;
          }
      }
      else if (refineType == "Text"){
        for(var k = 0; k< block.finished[0].answerList.length;k++){
            block.textResult.push([]);
        }
        for(var k = 0 ; k < block.finished.length; k++){
          var answerList = block.finished[k].answerList;
          for(var l = 0 ; l < answerList.length; l++){
            block.textResult[l].push(answerList[l]);
          }
        }
      }
      await block.save();
    }
    if(projectFinishedFlag == true){
      projects[i].projectState  = "finished";

      for(var j = 0 ; j < projects[i].refineBlocks.length;j++){
        var blockId = projects[i].refineBlocks[j];
        var block = await blockSchema.findOne({_id: blockId});
        for(var k = 0 ; k < Math.max(block.countResult.length, block.textResult.length, block.coordinateResult.length) ; k++){
          if(projects[i].refineType == "Radio") {
            console.log("projects??...");
            projects[i].totalCountResult.push(block.countResult[k]);
          } else if(projects[i].refineType == "Checkbox") {
            projects[i].totalCountResult.push(block.countResult[k]);
          } else if(projects[i].refineType == "Drag") {
            projects[i].totalCoordinateResult.push(block.coordinateResult[k]);
          } else if(projects[i].refineType == "Text") {
            projects[i].totalTextResult.push(block.textResult[k]);
          }
        }
      }

      var resultJson = {};
      var refineResult;

      if(projects[i].refineType == "Radio") refineResult = projects[i].totalCountResult;
      else if(projects[i].refineType == "Checkbox") refineResult = projects[i].totalCountResult;
      else if(projects[i].refineType == "Drag") refineResult = projects[i].totalCoordinateResult;
      else if(projects[i].refineType == "Text") refineResult = projects[i].totalTextResult;

      if(projects[i].projectType == "Refine"){
        var originalFileNames = projects[i].originalFileNames;
        for(var j = 0 ; j < refineResult.length ; j++){
          resultJson[originalFileNames[j]] = refineResult[j];
        }
      } else{
        for(var j = 0 ; j < refineResult.length ; j++){
          var fileName = strFileName(j) + projects[i].fileExtension;
          resultJson[fileName] = refineResult[j];
        }
      }

      resultJson = JSON.stringify(resultJson, null, '\t');

      await uploads(projects[i].owner, projects[i].projectName, resultJson, 'result.json');
    }
    await projects[i].save();
  }
}


async function downloads(user, projectName, fileNo, extension){
  try{
    var url = await getDownloadUrl(user, projectName, fileNo, extension);
    var download = await new downloadAPI(url);
    var fileName = strFileName(fileNo) + extension;
    var result = await download.setPath("./temporary").start(fileName);
  } catch (err){
    console.log(err);
  }
}

async function getDownloadUrl(userName, projectName, fileNo, extension) {
    var strFileNo = strFileName(fileNo);
    params.Key = "upload/" + userName + "/" + projectName + "/" + strFileNo + extension;
    var url = await s3.getSignedUrl('getObject', params);
    return url;
}

async function uploads(owner, projectName, data, fileName){
  try{
    uploadParams.Key = "result/" + owner + "/" + projectName + "/" + fileName;
    uploadParams.Body = data;
    uploadParams.ACL= 'public-read';
    console.log(uploadParams.Key);
    var data = await s3Upload(uploadParams);
    console.log(data);
  } catch(err){
    console.log("error");
  }
}


function strFileName(iName){
  var strFileNo = iName.toString();
  while(strFileNo.length < 6){
    strFileNo = "0" + strFileNo;
  }
  return strFileNo;
}

module.exports = router;