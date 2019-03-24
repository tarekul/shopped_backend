const express = require('express')
const orderRouter = express.Router();
const {orderService} = require('../services/order')


// get users info
orderRouter.get('/:userid',(req,res)=>{
    const {userid} = req.params
    return orderService.readOrder(userid)
    .then(response=>{
        res.status(200)
        res.json(response)
    })
    .catch(err=>{
        res.status(400)
        res.json(err)
    })
})
    

orderRouter.post('/',(req,res)=>{
    const {userid,product,quantity} = req.body
    //console.log(orderService)
    orderService.createOrder(userid,product,quantity)
    .then(() =>{
        return orderService.readOrder(userid)
    })
    .then(response=>res.json(response))
    .catch(err=>{
        res.status(400)
        res.json({err})
    })
})

module.exports = orderRouter





