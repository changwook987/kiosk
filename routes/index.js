const express = require('express')
const http = require('http')
const router = express.Router()
const middleware = require('../middleware/auth')

/* GET home page. */
router.get('/', middleware, function (req, res, next) {
  const request = http.request({
    host: 'localhost',
    path: '/api/debug/item',
    port: 3000,
    method: 'GET'
  }, (resp) => {
    let data = ''
    resp.on('data', (chunk) => { data += chunk })
    resp.on('end', () => {
      let items = JSON.parse(data)
      if (items.err) items = []
      console.log(items)
      res.render('index', { title: '물건 담기', items: items })
    })
  })
  request.write('data')
  request.end()
})

/* GET features page. */
router.get('/features', middleware, (req, res, next) => {
  res.render('features', { title: '기능 소개' })
})

module.exports = router
