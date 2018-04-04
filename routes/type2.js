var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('type2',{
    _title: 'sibal',
    _url : ['pic1.png','pic2.png', 'pic3.png'],
    _value : ['강아지', '고양이', '새']
  });
});

module.exports = router;
