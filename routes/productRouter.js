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



module.exports = productRouter