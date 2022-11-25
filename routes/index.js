const express = require('express')
const http = require('http')
const router = express.Router()
const middleware = require('../middleware/auth')

const Database = require('../models/sqlite/sqlite-db')
const itemSql = require('../models/sqlite/itemSql')

/* GET home page. */
router.get('/', middleware, function (req, res, next) {
  Database.executeQuery(itemSql.selectItem(), (err, rows) => {
    if (!err) {
      res.render('index', {
        title: '물건 담기',
        user: req.session.user,
        items: rows
      })
    } else {
      res.end('')
    }
  })
})

/* GET features page. */
router.get('/features', middleware, (req, res, next) => {
  res.render('features', { title: '기능 소개', user: req.session.user })
})

router.get('/bag', middleware, (req, res, next) => {
  const bag = JSON.parse(req.cookies.bag)
  Database.executeQuery(itemSql.selectItemsByIds(bag), (err, rows) => {
    if (!err) {
      res.render('bag', { title: '장바구니', user: req.session.user, items: rows })
    }
    else {
      console.log(err)
      res.status(403).json({ err: err })
    }
  })
})

module.exports = router
