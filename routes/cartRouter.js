const express = require('express')
const cartRouter = express.Router();
const {cartService} = require('../services/cart')


// get users info
cartRouter.get('/:username',(req,res)=>{
    const {username} = req.params
    return cartService.readCart(username)
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
cartRouter.post('/',(req,res)=>{
    const {username,prod_id,quantity} = req.body
    return cartService.createCart(username,prod_id,quantity)
    .then(response =>{
        res.status(200)
        res.json(response)
    })
    .catch(err=>{
        res.status(400)
        res.json({err})
    })
})

cartRouter.put('/:cart_id',(req,res)=>{
    const {cart_id} = req.params
    const {prod_id,quantity} = req.body
    cartService.addCart(cart_id,prod_id,quantity)
    .then((response)=>{
        res.json({mssg:'Add to cart successful'})
    })
    .catch(err=>{
        res.json(err)
    })
})

cartRouter.delete('/:cartitem_id/cartitem',(req,res)=>{
    const {cartitem_id} = req.params
        return cartService.deleteCartItem(cartitem_id)
        .then(response=>{
            res.json({mssg:`cartitem id ${cartitem_id} deleted`})
        })
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





