const express = require('express')
const orderRouter = express.Router();

orderRouter.get('/:order_id',(req,res)=>{
    const {order_id} = req.params
    res.json(order_id)
})

orderRouter.post('/',(req,res)=>{
    const {buyer,prod_id,quantity} = req.body
    res.json(buyer,prod_id,quantity)
})

orderRouter.put('/:order_id',(req,res)=>{
    const {order_id} = req.params
    const {buyer,prod_id,quantity} = req.body
})

orderRouter.delete('/:order_id',(req,res)=>{
    const {order_id} = req.params
    
})


module.exports = orderRouter





