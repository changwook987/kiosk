const sqlite3 = require("sqlite3").verbose()

module.exports.getConnection = () => {
    const db = new sqlite3.Database('./models/sqlite/kiosk.db', (err) => {
        if (err) console.log(err.message)
    })
    return db
}

module.exports.executeUpdate = (sql, callback) => {
    const db = this.getConnection()
    db.serialize()
    db.each(sql, (err, row) => {
        console.log(err)
        if (callback) callback(err, row)
    })
    db.close()
}

module.exports.executeQuery = (sql, callback) => {
    const db = this.getConnection()
    db.serialize()
    db.all(sql, (err, rows) => {
        callback(err, rows)
        db.close()
    })
}