const express = require('express')
const userRouter = express.Router();
const {userService} = require('../services/user')


// get users info
userRouter.get('/:id',(req,res)=>{
    const {id} = req.params
    console.log(res.status)
    return userService.readUser(id)
    .then(response=>{
        console.log(response)
        res.status(200)
        res.json(response)
    })
    .catch(err=>{
        res.status(400)
        res.json({err})
    })
})
    

//post to users table new user
userRouter.post('/',(req,res)=>{
    const {userName,name,email,creditCard,address,state,country,zipCode,shopName,shopDescrip} = req.body
    
    //console.log(userName,name,email,creditCard,address,state,zipCode,shopName,shopDescrip)
    return userService.createUser(userName,name,email,creditCard,address,state,country,zipCode,shopName,shopDescrip)
    .then(response =>{
        res.status(200)
        res.json({mssg:response})
    })
    .catch(err=>{
        res.status(400)
        res.json({err})
    })
})

userRouter.put('/:id',(req,res)=>{
    const {id} = req.params
    const {userName,name,email,creditCard,address,state,zipCode,shopName,shopDescrip} = req.body
    return userService.updateUser(id,userName,name,email,creditCard,address,state,zipCode,shopName,shopDescrip)
    .then((response)=>{
        res.json({mssg:'update successful'})
    })
    .catch(err=>{
        res.json({err})
    })
})

userRouter.delete('/:id',(req,res)=>{
    const {id} = req.params
    return userService.deleteUser(id)
    .then(response=>{
        res.json({mssg:`user id: ${id} deleted`})
    })
    .catch(err=>{
        res.json({err})
    })
    
})

// //product routes
// userRouter.get('/:id/product',(req,res)=>{
//     const {id} = req.params
//     userService.getShopProducts(id)
//     .then(response=>{
//         res.json(response)
//     })
//     .catch(err=>{
//         res.json({mssg:err.name})
//     })
// })

// // userRouter.get('/:id/product/:prod_id',(req,res)=>{
// //     const {id,prod_id} = req.params
// //     res.send(`get product with id ${prod_id} for user ${id}`)
// // })

// userRouter.post('/:id/product',(req,res)=>{
//     const {id} = req.params
//     const {name,description,price,category,ratings,size} = req.body
//     return userService.createProduct(id,name,description,price,category,ratings,size)
//     .then(response=>{
//         res.json({mssg:`new product created for seller id: ${id}`})
//     })
//     .catch(err=>{
//         res.json({mssg:err.name})
//     })

// })


// //order routes
// userRouter.get('/:id/orders',(req,res)=>{
//     const {id} = req.params
//     userService.getUserOrders(id)
//     .then(response=>{
//         res.json(response)
//     })
//     .catch(err=>{
//         res.json({mssg:err.name})
//     })
    
// })




module.exports = userRouter





