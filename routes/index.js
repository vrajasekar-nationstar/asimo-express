var express = require('express');
var router = express.Router();
var form = require('./form');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Asimo' });
});

router.use('/form', form);

module.exports = router;
