const express = require("express")
const router = express.Router()
const db = require('../../models/sqlite/sqlite-db')
const userSql = require('../../models/sqlite/userSql')

router.post('/register', (req, res, next) => {
    const user = req.body
    if (!user || !user.id || !user.password) {
        return res.status(400).json({ err: 'invalid-request' })
    }
    db.executeUpdate(userSql.insertUser(user.id, user.password))
    res.end('')
})

router.post('/register/admin', (req, res, next) => {
    const user = req.body
    console.log(user)
    if (!user || !user.id || !user.password) {
        return res.status(400).json({ err: 'invalid-request' })
    }
    db.executeUpdate(userSql.insertAdmin(user.id, user.password), (err, row) => {
        if (err)
            res.status(400).json({ err: 'exist user id' })
        else
            res.end('')
    })
})

module.exports = router