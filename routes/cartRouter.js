const express = require('express')
const cartRouter = express.Router();
const {cartService} = require('../services/cart')


// get users info
cartRouter.get('/:userid',(req,res)=>{
    const {userid} = req.params
    return cartService.readCart(userid)
    .then(response=>{
        res.status(200)
        res.json(response)
    })
    .catch(err=>{
        res.status(400)
        res.json(err)
    })
})
    

//post to users table new user
cartRouter.post('/',(req,res)=>{
    const {userid,prod_id,quantity} = req.body
    return cartService.createCart(userid,prod_id,quantity)
    .then(response =>{
        return cartService.readCart(userid)
    })
    .then(response=>{
        cartService.readCartItems(response.cart_id)
    })
    .catch(err=>{
        res.status(400)
        res.json(err)
    })
})

cartRouter.put('/:cart_id',(req,res)=>{
    const {cart_id} = req.params
    const {prod_id,quantity} = req.body
    cartService.addCart(cart_id,prod_id,quantity)
    .then((response)=>{
        return cartService.readCartItems(cart_id)
    })
    .then(response=>res.json(response))
    .catch(err=>{
        res.json(err)
    })
})

cartRouter.delete('/:cartitem_id/cartitem/:userid',(req,res)=>{
    const {cartitem_id,userid} = req.params
        return cartService.deleteCartItem(cartitem_id)
        .then(response=>{
            return cartService.readCart(userid)
        })
        .then(response=>res.json(response))
        .catch(err=>{
            res.json(err)
        })
    
    
    
})

cartRouter.delete('/:cart_id',(req,res)=>{
    const {cart_id} = req.params
    return cartService.deleteCart(cart_id)
    .then(response=>{
        res.json({mssg:`user cart_id: ${cart_id} deleted`})
    })
    .catch(err=>{
        res.json(err)
    })
    
})


module.exports = cartRouter





