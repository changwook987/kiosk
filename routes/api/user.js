const express = require("express")
const router = express.Router()
const db = require('../../models/sqlite/sqlite-db')
const userSql = require('../../models/sqlite/userSql')

router.post('/', (req, res, next) => {
    const user = req.body
    if (!user || !user.id || !user.password) {
        return res.status(400).json({ err: 'invalid-request' })
    }
    db.executeUpdate(userSql.insertUser(user.id, user.password))
    res.end('')
})

module.exports = router