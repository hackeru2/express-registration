var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'REGISTER' });
});

router.get('/finish', function (req, res, next) {
  res.render('finish', { title: 'REGISTER' });
});

router.post('/register', function (req, res, next) {
  // res.render('finish', { title: 'REGISTER' });
  res.redirect('/finish');
});

module.exports = router;
