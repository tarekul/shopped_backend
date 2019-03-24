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

shopRouter.get('/:shop_id/products',(req,res)=>{
    const {shop_id} = req.params
    shopService.readShopProducts(shop_id)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>{
        res.json(err)
    })
})

shopRouter.post('/',(req,res)=>{
    const {sellerid,shop_name,description,img_shop} = req.body
    //console.log(sellerid,shop_id,description,img_shop)
    shopService.createShop(sellerid,shop_name,description,img_shop)
    .then(() =>{
        return shopService.readShopWshopname(shop_name)
    })
    .then(response=>{
        res.send(response)
    })
    .catch(err=>{
        res.json(err)
    })
})

shopRouter.put('/:shop_id',(req,res)=>{
    const {shop_id} = req.params
    const {shop_name,description,img_shop} = req.body
    shopService.updateShop(shop_id,shop_name,description,img_shop)
    .then(response =>{
        return shopService.readShop(shop_id)
    })
    .then(response=>res.send(response))
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


module.exports = shopRouter