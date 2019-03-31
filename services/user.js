const db = require('./db')
const {createSqlCommandForUpdate,createSqlCommandForUpdate2} = require('../services/helper')
const userService = {}


//users table
userService.readUser = (userid) =>{
    return db.one('SELECT * FROM users WHERE userid=${userid}',{userid}) 
}

userService.readUserId = (username) =>{
    return db.one('SELECT * FROM users WHERE username=${username}',{username})
}

userService.createUser = (username,name,img,email,address,uid) =>{
    return db.none('INSERT INTO users (username,name,img,email,address,uid) VALUES (${username},${name},${img},${email},${address},${uid})',{username,name,img,email,address,uid})
}

userService.updateUser = (userid,username,name,img,email,address) =>{
    const arr = [username,name,img,email,address]

    const arrString = ["username","name","img","email","address"]
    return db.none(createSqlCommandForUpdate2(arr,arrString,'users','userid'),{userid,username,name,img,email,address})
    // return db.none(
    //     `UPDATE users SET
    //         name = $[name]
    //     WHERE userid = $[userid]`, {userid, name,}
    // )
}

userService.deleteUser = (userid) =>{
    return db.none('DELETE FROM users WHERE userid=${userid}',{userid})
}

module.exports = {userService, db};