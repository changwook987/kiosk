module.exports = (req, res, next) => {
    if (req.session.user) next()
    res.redirect('/user/login')
}