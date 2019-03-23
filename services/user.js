const db = require('./db')
const {createSqlCommandForUpdate} = require('../services/helper')
const userService = {}

//users table
userService.readUser = (username) =>{
    return db.one('SELECT * FROM users WHERE username=${username}',{username}) 
}

userService.createUser = (username,name,img,email,address) =>{
    return db.none('INSERT INTO users (username,name,img,email,address) VALUES (${username},${name},${img},${email},${address})',{username,name,img,email,address})
}

userService.updateUser = (before_username,username,name,img,email,address) =>{
    const arr = [username,name,img,email,address]

    const arrString = ["username","name","email","img","address"]
    return db.none(createSqlCommandForUpdate(before_username,arr,arrString,'users','username'),{before_username,username,name,img,email,address})

}

userService.deleteUser = (username) =>{
    return db.none('DELETE FROM users WHERE username=${username}',{username})
}

module.exports = {userService, db};