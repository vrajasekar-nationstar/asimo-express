var express = require('express');
var router = express.Router();
var print = require('./print');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/', function(req, res, next) {
  res.json('Post success');
});

router.use('/print', print);

module.exports = router;
