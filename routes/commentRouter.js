const express = require('express')
const commentRouter = express.Router();
const {commentService} = require('../services/order')

commentRouter.get('/:prod_id',(req,res)=>{
    const {prod_id} = req.params
    return commentService.readComment(prod_id)
    .then(response=>{
        res.status(200)
        res.json(response)
    })
    .catch(err=>{
        res.status(400)
        res.json(err)
    })
})
    

commentRouter.post('/',(req,res)=>{
    const {prod_id,userid,comment,rate} = req.body
    commentService.createComment(prod_id,userid,comment,rate)
    .then(() =>{
        return commentService.readComment(userid)
    })
    .then(response=>res.json(response))
    .catch(err=>{
        res.status(400)
        res.json({err})
    })
})

module.exports = commentRouter