const express = require('express')
const multer = require('multer')
const router = express.Router()

const Database = require('../models/sqlite/sqlite-db')
const itemSql = require('../models/sqlite/itemSql')

const middleware = require('../middleware/admin')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.get('/', middleware, (req, res, next) => {
    res.render('admin/index', { title: '관리자 페이지', user: req.session.user })
})

router.get('/add-item', middleware, (req, res, next) => {
    res.render('admin/add-item', { title: '물건 등록하기', user: req.session.user })
})

router.post('/add-item', middleware, upload.single('image'), (req, res, next) => {
    const { name, prise, amount } = req.body
    let originalFileName = ''
    let fileUrl = ''
    if (req.file) {
        originalFileName = req.file.originalname
        fileUrl = '/uploads/' + req.file.filename
    }
    Database.executeUpdate(itemSql.insertItem(name, fileUrl, prise, amount))
    res.status(200).json({
        name: name,
        prise: prise,
        amount: amount,
        fileUrl: fileUrl
    })
})

module.exports = router