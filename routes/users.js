var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('Lest\'s Battle Beg50in');
  res.status(200).json({
    fullname:'Siripong Poolnuch'
  })
});

router.get('/bio', function(req, res, next){
  res.status(200).json({
    fullname:'Siripong Poolnuch',
    nickname:'Fluk',
    hobby:'Sleep',
    gitusername:'dragon150766'
  })
})


module.exports = router;
