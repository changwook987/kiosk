var express = require('express');
var router = express.Router();

var userDb = require('../models/sqlite/user/userDB')
var userSql = require('../models/sqlite/user/userSql')

/* GET user login page. */
router.get('/login', function (req, res, next) {
  res.render('user/login', { title: "로그인" });
});

/* POST user login page. */
router.post('/login', function (req, res, next) {
  const { id, password } = req.body
  userDb.executeQuery(userSql.selectUserByNickname(id), (err, rows) => {
    if (err) {
      console.log(err.message)
      res.redirect('/user/login')
    } else {
      console.log(rows)
      if (rows && (rows[0].user_password | '') === password) {
        res.redirect('/')
      } else {
        res.redirect('/user/login')
      }
    }
  })
});

/* GET user register page. */
router.get('/register', function (req, res, next) {
  res.render('user/register', { title: '회원가입', desc: '*표시는 필수' });
});

router.post('/register', function (req, res, next) {
  const { id, password } = req.body
  userDb.executeUpdate(userSql.insertUser(id, password))
  res.redirect('/user/login')
})

module.exports = router;
