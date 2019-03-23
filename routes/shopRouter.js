const express = require('express')
const shopRouter = express.Router();

const {shopService} = require('../services/shop')

shopRouter.get('/:shop_id',(req,res)=>{
    const {shop_id} = req.params
    shopService.readShop(shop_id)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>{
        res.json(err)
    })
})

shopRouter.get('/:shop_name',(req,res)=>{
    const {shop_name} = req.params
    shopService.readShopName(shop_name)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>{
        res.json(err)
    })
})

shopRouter.post('/',(req,res)=>{
    const {sellerid,shop_name,description,img_shop} = req.body
    //console.log(sellerid,shop_name,description,img_shop)
    shopService.createShop(sellerid,shop_name,description,img_shop)
    .then(response =>{
        res.json({mssg:'Shop created'})
    })
    .catch(err=>{
        res.json(err)
    })
})

shopRouter.put('/:shop_id',(req,res)=>{
    const {shop_id} = req.params
    const {sellerid,shop_name,description,img_shop} = req.body
    shopService.updateShop(shop_id,sellerid,shop_name,description,img_shop)
    .then(response =>{
        res.json({mssg:'Shop updated'})
    })
    .catch(err=>{
        res.json(err)
    })
})

shopRouter.put('/:shop_name',(req,res)=>{
    const {beforeshop_name} = req.params.shop_name
    const {sellerid,shop_name,description,img_shop} = req.body
    shopService.updateShop(beforeshop_name,sellerid,shop_name,description,img_shop)
    .then(response =>{
        res.json({mssg:'Shop updated'})
    })
    .catch(err=>{
        res.json(err)
    })
})

shopRouter.delete('/:shop_id',(req,res)=>{
    const {shop_id} = req.params
    return shopService.deleteShop(shop_id)
    .then(response=>{
        res.json({mssg:`Shop id: ${shop_id} deleted`})
    })
    .catch(err=>{
        res.json(err)
    })
    
})

shopRouter.delete('/:shop_name',(req,res)=>{
    const {shop_name} = req.params
    return shopService.deleteShopName(shop_name)
    .then(response=>{
        res.json({mssg:`Shop name: ${shop_name} deleted`})
    })
    .catch(err=>{
        res.json(err)
    })
    
})

module.exports = shopRouter