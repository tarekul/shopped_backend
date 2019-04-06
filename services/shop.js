const db = require('./db')
const {createSqlCommandForUpdate,createSqlCommandForUpdate2} = require('../services/helper')
const shopService = {}

//Shops table
shopService.readShop = (shop_id) =>{
    return db.one('SELECT * FROM shop WHERE shop_id=${shop_id}',{shop_id}) 
}

shopService.checkifuserIsSeller = sellerid =>{
    return db.one('SELECT * FROM shop WHERE sellerid=${sellerid}',{sellerid})
    .then(response=> true)
    .catch(err=>false)
}

shopService.readShopProducts = (shop_id) =>{
    return db.any('SELECT * FROM shop LEFT JOIN products ON shop.shop_id=${shop_id} AND products.shop_id=${shop_id}',{shop_id}) 
}

shopService.readShopWshopname = shop_name =>{
    return db.one('SELECT * FROM shop WHERE shop_name=${shop_name}',{shop_name}) 
}

shopService.createShop = (sellerid,shop_name,description,img_shop) =>{
    return db.none('INSERT INTO shop (sellerid,shop_name,description,img_shop) VALUES (${sellerid},${shop_name},${description},${img_shop})',{sellerid,shop_name,description,img_shop})
}

shopService.updateShop = (shop_id,shop_name,description,img_shop) =>{
    const arr = [shop_name,description,img_shop]

    const arrString = ["shop_name","description","img_shop"]
    return db.none(createSqlCommandForUpdate2(arr,arrString,'shop','shop_id'),{shop_id,shop_name,description,img_shop})

}

shopService.deleteShop = (shop_id) =>{
    return db.none('DELETE FROM shop WHERE shop_id=${shop_id}',{shop_id})
}

shopService.deleteShopName = (shop_name) =>{
    return db.none('DELETE FROM shop WHERE shop_name=${shop_name}',{shop_name})
}

module.exports = {shopService};