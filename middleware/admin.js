module.exports = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.user_permition_lvl == 9) {
            next()
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/user/login')
    }
}