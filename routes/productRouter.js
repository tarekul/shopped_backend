const express = require('express')
const productRouter = express.Router();

productRouter.get('/:id',(req,res)=>{
    const {id} = req.params
    res.send(`get all products for ${id}`)
})

productRouter.get('/:id/:prod_id',(req,res)=>{
    const {id,prod_id} = req.params
    res.send(`get product with id ${prod_id} for user ${id}`)
})

productRouter.post('/',(req,res)=>{
    const {shop_id,name,description,price,category,ratings,size} = req.body
    res.json(shop_id,name,description)
})

productRouter.put('/:prod_id',(req,res)=>{
    const {prod_id} = req.params
    const {name,description} = req.body
})

productRouter.delete('/:prod_id',(req,res)=>{
    const {prod_id} = req.params
    
})


module.exports = productRouter





