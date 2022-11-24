const session = require('express-session')
const FileStore = require('session-file-store')(session)

const fileStoreoptions = { retries: 0 }

module.exports = {
    store: new FileStore(fileStoreoptions),
    secret: 'salty salt',
    resave: false,
    saveUninitialized: false,
}