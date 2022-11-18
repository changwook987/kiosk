const sqlite3 = require("sqlite3").verbose();

function getConnection() {
    const db = new sqlite3.Database('./models/sqlite/kioskUser.db', (err) => {
        if (err) console.log(err.message)
    })
    return db;
}

module.exports.executeUpdate = (sql) => {
    const db = getConnection()
    db.serialize()
    db.each(sql)
    db.close()
}

module.exports.executeQuery = (sql, callback) => {
    const db = getConnection()
    db.serialize()
    db.all(sql, (err, rows) => {
        callback(err, rows)
        db.close()
    })
}