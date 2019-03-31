const db = require('./db')
const {createSqlCommandForUpdate2} = require('../services/helper')
const commentService = {}

commentService.readComment = prod_id =>{
    return db.any('SELECT * FROM comments WHERE prod_id=${prod_id}',{prod_id}) 
}

commentService.createComment = (prod_id,userid,comment,rate) =>{
    return db.none('INSERT INTO comments (prod_id,userid,comment,rate) VALUES (${prod_id},${userid},${comment},${rate}',{shop_id,prod_name,description,price,category,ratings,size}) 
}