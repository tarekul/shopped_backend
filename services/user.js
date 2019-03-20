const pgp = require('pg-promise')({})
const db = pgp('postgress://localhost/shopped')
const {createSqlCommandForUpdate} = require('../services/helper')
const userService = {}

//users table
userService.readUser = (id) =>{
    return db.one('SELECT * FROM users WHERE id=${id}',{id}) 
}

userService.createUser = (userName,name,email,creditCard,address,state,country,zipCode,shopName,shopDescrip) =>{
    return db.none('INSERT INTO users (userName,name,email,creditCard,address,state,country,zipCode,shopName,shopDescrip) VALUES (${userName},${name},${email},${creditCard},${address},${state},${country},${zipCode},${shopName},${shopDescrip})',{userName,name,email,creditCard,address,state,country,zipCode,shopName,shopDescrip})
}

userService.updateUser = (id,userName,name,email,creditCard,address,state,country,zipCode,shopName,shopDescrip) =>{
    const arr = [userName,name,email,creditCard,address,state,country,zipCode,shopName,shopDescrip]

    const arrString = ["userName","name","email","creditCard","address","state","country","zipCode","shopName","shopDescrip"]
    return db.none(createSqlCommandForUpdate(id,arr,arrString),{id,userName,name,email,creditCard,address,state,country,zipCode,shopName,shopDescrip})

}

userService.deleteUser = (id) =>{
    return db.none('DELETE FROM users WHERE id=${id}',{id})
}

// //products table
// userService.getShopProducts= id =>{
//     return db.many('SELECT * FROM products WHERE userid=${id}',{id})
// }

// userService.createProduct = (userid,name,description,price,category,ratings,size) =>{
//     return db.none('INSERT INTO products (userid,name,description,price,category,ratings,size) VALUES (${userid},${name},${description},${price},${category},${ratings},${size})',{userid,name,description,price,category,ratings,size})
// }

// //orders table
// userService.getUserOrders = id =>{
//     return db.many('SELECT * FROM orders JOIN orderItems ON orders.orderid=orderItems.orderid WHERE orders.buyer=${id}',{id})
// }

// userService.deleteOrderHistory = (buyer) =>{
//     return db.many('SELECT id FROM orders WHERE buyer=${buyer}',{buyer})
//     .then(response=>{
//         res.json(response)
//     })
//     .catch(err=>{
//         res.json(err)
//     })
// }


module.exports = {userService, db};