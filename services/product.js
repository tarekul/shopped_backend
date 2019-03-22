const db = require('./db')
const {createSqlCommandForUpdate} = require('../services/helper')
const productService = {}

productService.readProduct = (prod_id) =>{
    return db.one('SELECT * FROM products WHERE prod_id=${prod_id}',{prod_id}) 
}

productService.createProduct = (shop_id,name,description,price,category,ratings,size) =>{
    return db.none('INSERT INTO products (shop_id,name,description,price,category,ratings,size) VALUES (${shop_id},${name},${description},${price},${category},${ratings},${size})',{shop_id,name,description,price,category,ratings,size}) 
}

productService.updateProduct = (prod_id,shop_id,name,description,price,category,ratings,size) =>{
    const arr = [shop_id,name,description,price,category,ratings,size]

    const arrString = ["shop_id","name","description","price","category","ratings","size"]
    return db.none(createSqlCommandForUpdate(prod_id,arr,arrString,'products','prod_id'),{prod_id,shop_id,name,description,price,category,ratings,size})
}

productService.deleteProduct = (prod_id) =>{
    return db.none('DELETE FROM products WHERE prod_id=${prod_id}',{prod_id})
}

module.exports = {productService}
