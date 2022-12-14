// Create Item Table
module.exports.createTable = () => {
    return `CREATE TABLE IF NOT EXISTS item (
                item_id         INTEGER  PRIMARY KEY AUTOINCREMENT,
                item_name       TEXT     NOT NULL,
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
module.exports.insertItem = (name, imagePath, prise, amount) => {
    return `INSERT INTO item (item_name, item_image_path, item_prise, item_amount)
                        values ("${name}", "${imagePath}", ${prise}, ${amount})`
}

// Select All Items
module.exports.selectItem = () => {
    return `SELECT * FROM item`
}

// Select Item By Item ID
module.exports.selectItemById = (id) => {
    return `SELECT * FROM item WHERE item_id = ${id}`
}

module.exports.selectItemsByIds = (idList) => {
    return 'SELECT * FROM item WHERE ' + idList.map((id) => `item_id = ${id}`).join(' or ')
}

//
module.exports.updateItem = (id, item) => {
    return `UPDATE item SET
                item_name       = ${item.item_name},
                item_image_path = ${item.item_image_path},
                item_amount     = ${item.item_amount},
                item_prise      = ${item.item_prise}
            WHERE
                item_id         = ${id}`
}