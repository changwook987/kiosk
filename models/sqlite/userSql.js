// Create User Table
module.exports.createTable = () => {
    return `CREATE TABLE IF NOT EXISTS user (
                user_id            INTEGER      PRIMARY KEY AUTOINCREMENT,
                user_nickname      VARCHAR(15)  NOT NULL UNIQUE,
                user_password      VARCHAR(100) NOT NULL,
                user_permition_lvl INTEGER      DEFAULT 0
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

// Insert User as Admin
module.exports.insertAdmin = (nickname, password) => {
    return `INSERT INTO user (user_nickname, user_password, user_permition_lvl)
                        values ("${nickname}", "${password}", 9)`
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

module.exports.deleteUser = () => {
    return `DELETE FROM user`
}

// Delete User By User ID
module.exports.deleteUserById = (id) => {
    return `DELETE FROM user WHERE user_id = ${id}`
}