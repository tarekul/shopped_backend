const admin  = require('../firebase')
const {userService} = require('./user')

const verify = (req,res,next) =>{
    console.log('here at verifier')
    const {token} = req.headers
    const {sellerid} = req.body
    
    const uid = admin.auth().verifyIdToken(token)
    .then(decodedToken => decodedToken.uid)
    .catch(function(error) {});

    const readUser = userService.readUser(sellerid)

    Promise.all([uid, readUser]).then(all => {
        const [uid, response] = all;
        if(response.uid === uid) next()
    });
}

module.exports = {verify}
    
    