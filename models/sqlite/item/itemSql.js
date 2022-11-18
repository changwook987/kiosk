// Create Item Table
module.exports.createTable = () => {
    return `CREATE TABLE IF NOT EXISTS item (
                item_id         INTEGER  PRIMARY KEY AUTOINCREMENT,
                item_image_path TEXT     NOT NULL,
                item_prise      INTEGER  NOT NULL,
                item_amount     INTEGER  NOT NULL
            )`
}

// Drop Item Table
module.exports.dropTable = () => {
    return `DROP TABLE IF EXISTS item`
}

// Insert Item
module.exports.insertItem = (imagePath, prise, amount) => {
    return `INSERT INTO item (item_image_path, item_prise, item_amount)
                        values ("${imagePath}", ${prise}, ${amount})`
}

// Select All Items
module.exports.selectItem = () => {
    return `SELECT * FROM item`
}

// Select Item By Item ID
module.exports.selectItemById = (id) => {
    return `SELECT * FROM item WHERE id = ${id}`
}
