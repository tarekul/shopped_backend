const express = require('express')
const productRouter = express.Router();

const {productService} = require('../services/product')
const {verify} = require('../services/middleware')

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

productRouter.get('/',(req,res)=>{
    productService.getAllProducts()
    .then(response=>{
        res.json(response)
    })
    .catch(err=>{
        res.json(err)
    })
})

productRouter.get('/:prod_id/shop',(req,res)=>{
    const {prod_id} = req.params
    productService.readProductShop(prod_id)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>{
        res.json(err)
    })
})

// productRouter.get('/:prod_name/store/:store_name',(req,res)=>{
//     const {prod_name,shop_name} = req.params
//     productService.readProductWShopProd(prod_id,shop_name)
//     .then(response=>{
//         res.json(response)
//     })
//     .catch(err=>{
//         res.json(err)
//     })
// })


productRouter.post('/',verify,(req,res)=>{
    const {shop_id,prod_name,description,price,category,ratings,size,img} = req.body
    console.log('here at product post route')
    console.log(shop_id)
    // productService.readProductWName(prod_name,shop_id)
    // .then((response)=>{
    //     throw new Error("Product already exists")
    // },()=>{
    //     return productService.createProduct(shop_id,prod_name,description,price,category,ratings,size,img)
    // })
    productService.createProduct(shop_id,prod_name,description,price,category,ratings,size,img)
    // .then(() =>{
    //     return productService.readProductWName(prod_name,shop_id)
    // })
    .then(response=>res.send(response))
    .catch(err=>{
        res.send(err.toString(),'product already exists')
    })
})

productRouter.put('/:prod_id',(req,res)=>{
    const {prod_id} = req.params
    const {prod_name,description,price,category,ratings,size} = req.body
    productService.updateProduct(prod_id,prod_name,description,price,category,ratings,size)
    .then(response =>{
        return productService.readProduct(prod_id)
    })
    .then(response=>res.json(response))
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