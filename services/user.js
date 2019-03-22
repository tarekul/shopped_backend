const db = require('./db')
const {createSqlCommandForUpdate} = require('../services/helper')
const userService = {}

//users table
userService.readUser = (id) =>{
    return db.one('SELECT * FROM users WHERE id=${id}',{id}) 
}

userService.createUser = (username,name,img,email,address) =>{
    return db.none('INSERT INTO users (username,name,img,email,address) VALUES (${username},${name},${img},${email},${address})',{username,name,img,email,address})
}

userService.updateUser = (id,username,name,img,email,address) =>{
    const arr = [username,name,img,email,address]

    const arrString = ["username","name","email","img","address"]
    return db.none(createSqlCommandForUpdate(id,arr,arrString,'users','id'),{id,username,name,img,email,address})

}

userService.deleteUser = (id) =>{
    return db.none('DELETE FROM users WHERE id=${id}',{id})
}

module.exports = {userService, db};