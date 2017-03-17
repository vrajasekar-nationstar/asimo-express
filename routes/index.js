var express = require('express');
var router = express.Router();
var print = require('./print');
var form = require('./form');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/', function(req, res, next) {
  res.json('Post success');
});

router.use('/print', print);
router.use('/form', form);

module.exports = router;
