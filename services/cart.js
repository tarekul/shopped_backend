const db = require('./db')
const {createSqlCommandForUpdate2} = require('../services/helper')
const cartService = {}

//cart table
cartService.readCart = (userid) =>{
    return db.any('SELECT * FROM cart JOIN cartItem ON cart.cart_id = cartItem.cart_id WHERE userid = $[userid]',{userid}) 
}

cartService.readCartItems = (cart_id) =>{
    return db.one('SELECT * FROM cartItem WHERE cart_id=${cart_id}',{cart_id}) 
}

cartService.countCartItemsWithCartId = (cart_id) =>{
    return db.one('SELECT COUNT(cart_id) FROM cartItem WHERE cart_id=${cart_id}',{cart_id}) 
}


cartService.readCartItem = (cartitem_id) =>{
    return db.one('SELECT * FROM cartItem WHERE cartitem_id=${cartitem_id}',{cartitem_id}) 
}

cartService.createCart = (userid,prod_id,quantity) =>{
    return cartService.readCart(userid)
    .then(response=>{
        return cartService.addCart(response.cart_id,prod_id,quantity)
    })
    .catch(err=>{
        return db.none('INSERT INTO cart (userid) VALUES (${userid})',{userid})
            .then(()=>{
                return cartService.readCart(userid)
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
    let cartid = 0
    return cartService.readCartItem(cartitem_id)
    .then((response)=>{
        cartid = response.cart_id
        return cartService.countCartItemsWithCartId(response.cart_id)
    })
    .then(response=>{
        if(response.count === "1"){
            return db.none('DELETE FROM cartItem WHERE cartitem_id=${cartitem_id}',{cartitem_id})
            .then(()=>{
                return cartService.deleteCart(cartid)
            })
        }
        else{
            return db.none('DELETE FROM cartItem WHERE cartitem_id=${cartitem_id}',{cartitem_id})
        }
    })
    
        
        
  
    
        
  
    

}

cartService.deleteCart = (cart_id) =>{
    return db.none('DELETE FROM cart WHERE cart_id=${cart_id}',{cart_id})
          
}

module.exports = {cartService, db};