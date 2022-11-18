// Create User Table
module.exports.createTable = () => {
    return `CREATE TABLE IF NOT EXISTS user (
                user_id            INTEGER     PRIMARY KEY AUTOINCREMENT,
                user_nickname      VARCHAR(15) NOT NULL UNIQUE,
                user_password      CHAR(128)   NOT NULL,
                user_permition_lvl INTEGER     DEFAULT 0
            )`
}

//Drop User Table
module.exports.dropTable = () => {
    return `DROP TABLE IF EXISTS user`
}

// Insert User
module.exports.insertUser = (nickname, password) => {
    return `INSERT INTO user (user_nickname, user_password)
                        values ("${nickname}", "${password}")`
}

// Select All Users
module.exports.selectUser = () => {
    return `SELECT * FROM user`
}

// Select User By User ID
module.exports.selectUserById = (id) => {
    return `SELECT * FROM user WHERE user_id = "${id}"`
}

// Select User By User Nickname
module.exports.selectUserByNickname = (nickname) => {
    return `SELECT * FROM user WHERE user_nickname = "${nickname}"`
}

// Delete User By User ID
module.exports.deleteUserById = (id) => {
    return `DELETE FROM user WHERE user_id = ${id}`
}