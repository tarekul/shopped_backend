const express = require('express')
const productRouter = express.Router();

const {productService} = require('../services/product')

productRouter.get('/:prod_id',(req,res)=>{
    const {prod_id} = req.params
    productService.readProduct(prod_id)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>{
        res.json(err)
    })
})

productRouter.post('/',(req,res)=>{
    const {shop_id,name,description,price,category,ratings,size} = req.body
    productService.createProduct(shop_id,name,description,price,category,ratings,size)
    .then(response =>{
        res.json({mssg:'product created'})
    })
    .catch(err=>{
        res.json(err)
    })
})

productRouter.put('/:prod_id',(req,res)=>{
    const {prod_id} = req.params
    const {shop_id,name,description,price,category,ratings,size} = req.body
    productService.updateProduct(prod_id,shop_id,name,description,price,category,ratings,size)
    .then(response =>{
        res.json({mssg:'product updated'})
    })
    .catch(err=>{
        res.json(err)
    })
})

productRouter.delete('/:prod_id',(req,res)=>{
    const {prod_id} = req.params
    return productService.deleteProduct(prod_id)
    .then(response=>{
        res.json({mssg:`product id: ${prod_id} deleted`})
    })
    .catch(err=>{
        res.json(err)
    })
    
})

module.exports = productRouter