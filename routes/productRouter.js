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

productRouter.get('/:prod_name/store/:store_name',(req,res)=>{
    const {prod_name,shop_name} = req.params
    productService.readProductWShopProd(prod_id,shop_name)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>{
        res.json(err)
    })
})


productRouter.post('/',(req,res)=>{
    const {shop_name,name,description,price,category,ratings,size} = req.body
    productService.createProduct(shop_name,name,description,price,category,ratings,size)
    .then(response =>{
        res.json({mssg:'product created'})
    })
    .catch(err=>{
        res.json(err)
    })
})

productRouter.put('/:prod_name/shop/:shop_name',(req,res)=>{
    const {prod_name,shop_name} = req.params
    const {name,description,price,category,ratings,size} = req.body
    productService.updateProduct(prod_name,shop_name,name,description,price,category,ratings,size)
    .then(response =>{
        res.json({mssg:'product updated'})
    })
    .catch(err=>{
        res.json(err)
    })
})

productRouter.delete('/:prod_name',(req,res)=>{
    const {prod_name} = req.params
    return productService.deleteProduct(prod_name)
    .then(response=>{
        res.json({mssg:`product id: ${prod_name} deleted`})
    })
    .catch(err=>{
        res.json(err)
    })
    
})

module.exports = productRouter