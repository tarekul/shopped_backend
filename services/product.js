const db = require('./db')
const {createSqlCommandForUpdate} = require('../services/helper')
const productService = {}

productService.readProduct = (prod_id) =>{
    return db.one('SELECT * FROM products WHERE prod_id=${prod_id}',{prod_id}) 
}

productService.readProductWShopProd = (prod_name,shop_name) =>{
    return db.one('SELECT FROM products WHERE prod_name=${prod_name} AND shop_name=${shop_name}',{prod_name,shop_name})
}

productService.createProduct = (shop_name,name,description,price,category,ratings,size) =>{
    return db.none('INSERT INTO products (shop_name,name,description,price,category,ratings,size) VALUES (${shop_name},${name},${description},${price},${category},${ratings},${size})',{shop_name,name,description,price,category,ratings,size}) 
}

productService.updateProduct = (prod_name,shop_name,name,description,price,category,ratings,size) =>{
    const arr = [name,description,price,category,ratings,size]

    const arrString = ["name","description","price","category","ratings","size"]
    return db.none(createSqlCommandForUpdate(prod_name,shop_name,arr,arrString,'products','prod_name','shop_name'),{prod_name,shop_name,name,description,price,category,ratings,size})
}

productService.deleteProduct = (prod_name,shop_name) =>{
    return db.none('DELETE FROM products WHERE prod_name=${prod_name} AND shop_name=${shop_name}',{prod_name,shop_name})
}

module.exports = {productService}
