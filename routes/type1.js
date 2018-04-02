var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('type1', { title: 'Express' });
});

// Get file list from Mongo DB
router.get('/getFileList', function(req, res, next){
  var fileList = {
    "ID" : "id00001",   // from session
    "taskID" : "task00001",
    "currentBlock" : 1, // from mongo
    "blockSize" : 5,    // from mongo
    "fileType" : "png",
  }

  // format
  // rawData/ID/taskID/(fileID, %06d format).[fileType]

  res.end(fileList.json());
});

module.exports = router;
