const express = require('express')
const orderRouter = express.Router();
const {orderService} = require('../services/order')


// get users info
orderRouter.get('/:cart_id',(req,res)=>{
    const {cart_id} = req.params
    return orderService.readCart(cart_id)
    .then(response=>{
        res.status(200)
        res.json(response)
    })
    .catch(err=>{
        res.status(400)
        res.json({err})
    })
})
    

//post to users table new user
orderRouter.post('/',(req,res)=>{
    const {userid,prod_id,quantity} = req.body
    return orderService.createCart(userid,prod_id,quantity)
    .then(response =>{
        res.status(200)
        res.json(response)
    })
    .catch(err=>{
        res.status(400)
        res.json({err})
    })
})

orderRouter.put('/:cart_id',(req,res)=>{
    const {cart_id} = req.params
    const {prod_id,quantity} = req.body
    orderService.addCart(cart_id,prod_id,quantity)
    .then((response)=>{
        res.json({mssg:'Add to cart successful'})
    })
    .catch(err=>{
        res.json(err)
    })
})

orderRouter.delete('/:cartitem_id/cartitem',(req,res)=>{
    const {cartitem_id} = req.params
        return orderService.deleteCartItem(cartitem_id)
        .then(response=>{
            res.json({mssg:`cartitem id ${cartitem_id} deleted`})
        })
        .catch(err=>{
            res.json(err)
        })
    
    
    
})

orderRouter.delete('/:cart_id',(req,res)=>{
    const {cart_id} = req.params
    return orderService.deleteCart(cart_id)
    .then(response=>{
        res.json({mssg:`user cart_id: ${cart_id} deleted`})
    })
    .catch(err=>{
        res.json(err)
    })
    
})


module.exports = orderRouter





