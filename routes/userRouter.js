const express = require('express')
const userRouter = express.Router();
const {userService} = require('../services/user')


// get users info
userRouter.get('/:username',(req,res)=>{
    const {username} = req.params
    console.log(res.status)
    return userService.readUser(username)
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
    const {username,name,img,email,address} = req.body
    return userService.createUser(username,name,img,email,address)
    .then(response =>{
        res.status(200)
        res.json(response)
    })
    .catch(err=>{
        res.status(400)
        res.json({err})
    })
})

userRouter.put('/:username',(req,res)=>{
    const before_username = req.params.username
    const {username,name,img,email,address} = req.body
    return userService.updateUser(before_username,username,name,img,email,address)
    .then((response)=>{
        res.json({mssg:'update successful'})
    })
    .catch(err=>{
        res.json(err)
    })
})

userRouter.delete('/:username',(req,res)=>{
    const {username} = req.params
    return userService.deleteUser(username)
    .then(response=>{
        res.json({mssg:`user username: ${username} deleted`})
    })
    .catch(err=>{
        res.json(err)
    })
    
})






module.exports = userRouter





