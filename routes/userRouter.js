const express = require('express')
const userRouter = express.Router();
const {userService} = require('../services/user')


// get users info
userRouter.get('/:userid',(req,res)=>{
    const {userid} = req.params
    return userService.readUser(userid)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>{
        res.json({err})
    })
})

userRouter.get('/:email/email',(req,res)=>{
    const {email} = req.params
    return userService.readUserWemail(email)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>{
        res.json({err})
    })
})
    

//post to users table new user
userRouter.post('/',(req,res)=>{
    const {username,name,img,email,address,uid,seller} = req.body
    return userService.createUser(username,name,img,email,address,uid,seller)
    .then(response =>{
        return userService.readUserId(username)
    })
    .then(response=>{
        res.send(response)
    })
    .catch(err=>{
        res.status(400)
        res.json({err:err.detail})
    })
})

userRouter.put('/:userid',(req,res)=>{
    const {userid} = req.params
    const {username,name,img,email,address,seller} = req.body
    return userService.updateUser(userid,username,name,img,email,address,seller)
    .then(()=>{
       return userService.readUser(userid)
    })
    .then(response=>res.send(response))
    .catch(err=>{
        res.json(err)
    })
})

userRouter.delete('/:userid',(req,res)=>{
    const {userid} = req.params
    return userService.deleteUser(userid)
    .then(response=>{
        res.json({mssg:`user userid: ${userid} deleted`})
    })
    .catch(err=>{
        res.json(err)
    })
    
})






module.exports = userRouter





