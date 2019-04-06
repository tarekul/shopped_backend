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

userService.readUserWemail = email =>{
    return db.one('SELECT * FROM users WHERE email=${email}',{email})
}

userService.createUser = (username,name,img,email,address,uid,seller) =>{
    return db.none('INSERT INTO users (username,name,img,email,address,uid,seller) VALUES (${username},${name},${img},${email},${address},${uid},${seller})',{username,name,img,email,address,uid,seller})
}

userService.updateUser = (userid,username,name,img,email,address,seller) =>{
    const arr = [username,name,img,email,address,seller]

    const arrString = ["username","name","img","email","address","seller"]
    return db.none(createSqlCommandForUpdate2(arr,arrString,'users','userid'),{userid,username,name,img,email,address,seller})
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