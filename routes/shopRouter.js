const express = require('express')
const shopRouter = express.Router();

shopRouter.get('/:shop_id',(req,res)=>{
    const {shop_id} = req.params
    res.json(seller)
})

shopRouter.post('/',(req,res)=>{
    const {shopName,description} = req.body
})

shopRouter.put('/:shop_id',(req,res)=>{
    const {shop_id} = req.params
    const {shopName,description} = req.body
})

shopRouter.delete('/:shop_id',(req,res)=>{
    const {shop_id} = req.params
    
})


module.exports = shopRouter





