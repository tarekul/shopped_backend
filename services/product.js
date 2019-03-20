const db = require('./db')
const productService = {}

productService.readProduct = (prod_id) =>{
    return db.one('SELECT * FROM products WHERE prod_id=${prod_id}',{prod_id}) 
}

productService.createProduct = (userid,name,description,price,category,ratings,size) =>{
    return db.none('INSERT INTO users (userid,name,description,price,category,ratings,size) VALUES (${userid},${name},${description},${price},${category},${ratings},${size})',{userid,name,description,price,category,ratings,size}) 
}

module.exports = {productService}
