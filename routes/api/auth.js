const express = require('express')
const router = express.Router()
const db = require('../../models/sqlite/sqlite-db')
const userSql = require('../../models/sqlite/userSql')

router.post('/login', (req, res, next) => {
    const { id, password } = req.body
    const secret = req.app.get('jwt-secret')

    console.log(secret)

    if (!id || !password) {
        return res.status(400).json({ err: 'invalid parameters' })
    }

    async function login(rows) {
        let user = null
        if (rows != null) user = rows[0]
        if (user == null) {
            throw new Error('wrong-username')
        } else {
            console.log(user)
            if (user.user_password == password) return user
            else throw new Error('wrong-password')
        }
    }

    async function authorize(user) {
        const payload = {
            sub: user.user_id,
            name: user.user_nickname,
            aud: 'kiosk',
            iat: Math.floor(Date.now() / 1000), //issued at
        }

        const option = {
            algorithm: 'HS512',
            expiresIn: '30m',
            issuer: 'kiosk',
        }

        const result = {
            token: jwt.sign(payload, secret, option),
            name: user.user_nickname,
            userId: user.user_id
        }

        console.log(result)
        return result
    }

    async function respond(result) {
        res.json(result)
    }

    const onError = (error) => {
        console.log('auth-done with error')
        res.status(403).json({
            err: error.message
        })
    }

    db.executeQuery(
        userSql.selectUserByNickname(id),
        (err, rows) => {
            login(rows)
                .then(authorize)
                .then(respond)
                .catch(onError)
        }
    )
})

module.exports = router