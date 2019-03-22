const db = require('./db')
const {createSqlCommandForUpdate} = require('../services/helper')
const shopService = {}

//Shops table
shopService.readShop = (shop_id) =>{
    return db.one('SELECT * FROM shop WHERE shop_id=${shop_id}',{shop_id}) 
}

shopService.createShop = (sellerid,shop_name,description,img_shop) =>{
    return db.none('INSERT INTO shop (sellerid,shop_name,description,img_shop) VALUES (${sellerid},${shop_name},${description},${img_shop})',{sellerid,shop_name,description,img_shop})
}

shopService.updateShop = (shop_id,sellerid,shop_name,description,img_shop) =>{
    const arr = [sellerid,shop_name,description,img_shop]

    const arrString = ["sellerid","shop_name","description","img_shop"]
    return db.none(createSqlCommandForUpdate(shop_id,arr,arrString,'shop','shop_id'),{shop_id,sellerid,shop_name,description,img_shop})

}

shopService.deleteShop = (shop_id) =>{
    return db.none('DELETE FROM shop WHERE shop_id=${shop_id}',{shop_id})
}

module.exports = {shopService};