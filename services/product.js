const db = require('./db')
const {createSqlCommandForUpdate2} = require('../services/helper')
const productService = {}

productService.getAllProducts = () =>{
    return db.any('SELECT * FROM products')
}

productService.readProduct = (prod_id) =>{
    return db.one('SELECT * FROM products WHERE prod_id=${prod_id}',{prod_id}) 
}

productService.readProductWName = (prod_name,shop_id) =>{
    return db.one('SELECT * FROM products WHERE prod_name=${prod_name} AND shop_id=${shop_id}',{prod_name,shop_id}) 
}

productService.readProductShop = (prod_id) =>{
    return db.one('SELECT * FROM products JOIN shop ON products.shop_id=shop.shop_id WHERE prod_id=${prod_id}',{prod_id}) 
}


// productService.readProductWShopProd = (prod_name,shop_name) =>{
//     return db.one('SELECT FROM products WHERE prod_name=${prod_name} AND shop_name=${shop_name}',{prod_name,shop_name})
// }

productService.createProduct = (shop_id,prod_name,description,price,category,ratings,size) =>{
    return db.none('INSERT INTO products (shop_id,prod_name,description,price,category,ratings,size) VALUES (${shop_id},${prod_name},${description},${price},${category},${ratings},${size})',{shop_id,prod_name,description,price,category,ratings,size}) 
}

productService.updateProduct = (prod_id,prod_name,description,price,category,ratings,size) =>{
    const arr = [prod_name,description,price,category,ratings,size]

    const arrString = ["prod_name","description","price","category","ratings","size"]
    return db.none(createSqlCommandForUpdate2(arr,arrString,'products','prod_id'),{prod_id,prod_name,description,price,category,ratings,size})
}

productService.deleteProduct = (prod_id) =>{
    return db.none('DELETE FROM products WHERE prod_id=${prod_id}',{prod_id})
}

module.exports = {productService}
