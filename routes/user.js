const express = require('express')
const router = express.Router()

const Database = require('../models/sqlite/sqlite-db')

/* GET user login page. */
router.get('/login', function (req, res, next) {
  res.render('user/login', { title: "로그인" })
})

/* GET user register page. */
router.get('/register', function (req, res, next) {
  res.render('user/register', { title: '회원가입', desc: '*표시는 필수' })
})

module.exports = router
