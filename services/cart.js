const db = require('./db')
const {createSqlCommandForUpdate} = require('../services/helper')
const cartService = {}

//cart table
cartService.readCart = (cart_id) =>{
    return db.any('SELECT * FROM cart JOIN cartItem ON cart.cart_id=${cart_id} AND cartItem.cart_id=${cart_id} ',{cart_id}) 
}

cartService.readCartId = (userid) =>{
    return db.one('SELECT * FROM cart WHERE userid=${userid}',{userid}) 
}

cartService.countCartItems = (cartitem_id) =>{
    return db.one('SELECT COUNT(cartitem_id) FROM cartItem WHERE cartitem_id=${cartitem_id}',{cartitem_id}) 
}

cartService.readCartItem = (cartitem_id) =>{
    return db.one('SELECT * FROM cartItem WHERE cartitem_id=${cartitem_id}',{cartitem_id}) 
}

cartService.createCart = (userid,prod_id,quantity) =>{
    return cartService.readCartId(userid)
    .then(response=>{})
    .catch(err=>{
        return db.none('INSERT INTO cart (userid) VALUES (${userid})',{userid})
            .then(()=>{
                return cartService.readCartId(userid)
            })
            .then((response)=>{
                const cart_id = response.cart_id
                return db.none('INSERT INTO cartItem (cart_id,prod_id,quantity) VALUES (${cart_id},${prod_id},${quantity})',{cart_id,prod_id,quantity})
            })
    })
    
}

cartService.addCart = (cart_id,prod_id,quantity) =>{
    return db.none('INSERT INTO cartItem (cart_id,prod_id,quantity) VALUES (${cart_id},${prod_id},${quantity})',{cart_id,prod_id,quantity})

}

cartService.deleteCartItem = (cartitem_id) =>{
    return cartService.countCartItems(cartitem_id).then(response=>{
        if(response.count === '1'){
            return cartService.readCartItem(cartitem_id)
            .then(response=>{
                db.none('DELETE FROM cartItem WHERE cartitem_id=${cartitem_id}',{cartitem_id})
                return cartService.deleteCart(response.cart_id)
            })
            
        }
        else{
            db.none('DELETE FROM cartItem WHERE cartitem_id=${cartitem_id}',{cartitem_id})
        }
    })
    

}

cartService.deleteCart = (cart_id) =>{
    return db.none('DELETE FROM cartItem WHERE cart_id=${cart_id}',{cart_id})
            .then(()=>{
                return db.none('DELETE FROM cart WHERE cart_id=${cart_id}',{cart_id})
            })
}

module.exports = {cartService, db};