const db = require('./db')
const {createSqlCommandForUpdate2} = require('../services/helper')
const orderService = {}

orderService.readOrder = (userid)=>{
    return db.any('SELECT * FROM orders WHERE userid=$[userid]',{userid})
}

orderService.createOrder = (userid,product,quantity)=>{
    const purchased = {product,quantity}
    return db.none('INSERT INTO orders (userid,purchased) VALUES ($[userid],$[purchased])',{userid,purchased})
}

module.exports = { orderService} 