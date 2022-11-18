var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '물건 담기', asdf: 'a' });
});

/* GET features page. */
router.get('/features', (req, res, next) => {
  res.render('features')
})

module.exports = router;
