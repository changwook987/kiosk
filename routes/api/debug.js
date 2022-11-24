const express = require('express')
const router = express.Router()

const db = require('../../models/sqlite/sqlite-db')
const userSql = require('../../models/sqlite/userSql')
const itemSql = require('../../models/sqlite/itemSql')

// 모든 유저 조회
router.get('/user', (req, res, next) => {
    db.executeQuery(userSql.selectUser(), (err, rows) => {
        if (!err) res.json(rows)
        else res.json({ err: err.message })
    })
})

// 해당 아이디 (db pk) 의 유저 조회
router.get('/user/:userId', (req, res, next) => {
    const userId = req.params.userId

    db.executeQuery(userSql.selectUserById(req.params.userId), (err, rows) => {
        if (!err) res.json(rows)
        else res.json({ err: err })
    })
})

// 모든 유저 삭제
router.delete('/user', (req, res, next) => {
    db.executeUpdate(userSql.deleteUser())
    res.end('')
})

// 해당 아이디 (db pk) 의 유저 삭제
router.delete('/user/:userId', (req, res, next) => {
    db.executeUpdate(userSql.deleteUserById(req.params.userId))
    res.end('')
})

router.get('/item', (req, res, next) => {
    db.executeQuery(itemSql.selectItem(), (err, rows) => {
        if (!err) res.json(rows)
        else res.json({ err: err.message })
    })
})

module.exports = router 