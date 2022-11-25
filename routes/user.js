const express = require('express')
const router = express.Router()
const db = require('../models/sqlite/sqlite-db')
const userSql = require('../models/sqlite/userSql')

const middleware = require('../middleware/auth')

/* GET user login page. */
router.get('/login', function (req, res, next) {
  res.render('user/login', { title: "로그인" })
})

router.post('/login', (req, res, next) => {
  const body = req.body
  if (!body || !body.id || !body.pw) {
    return res.status(400).json({ err: 'invalid-request' })
  }
  db.executeQuery(userSql.selectUserByNickname(body.id), (err, rows) => {
    if (err) {
      console.log(err)
      res.status(400).json({ err: err.message })
    } else {
      let user = rows[0]
      if (!user) res.status(403).redirect('/user/login')
      else {
        console.log(user.user_password, body.pw)
        if (user.user_password == body.pw) {
          req.session.user = user
          req.session.save(() => { res.status(200).redirect('/') })
        } else {
          res.status(403).redirect('/user/login')
        }
      }
    }
  })
})

router.all('/logout', (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

/* GET user register page. */
router.get('/register', function (req, res, next) {
  res.render('user/register', { title: '회원가입', desc: '*표시는 필수' })
})

router.post('/buy', middleware, (req, res, next) => {
  console.log('body', req.body)
  res.end('')
})

module.exports = router
