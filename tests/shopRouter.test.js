const request = require('supertest')
jest.mock('../services/shop')

const {shopService} = require('../services/shop')
const {app} = require('../app')

test("test get shop",done=>{
    shopService.readShop.mockImplementation(()=> Promise.resolve({test:'1'}))
    request(app)
    .get('/shop/4')
    .then(response=>{
        expect(response).toEqual({test:'1'})
        done()
    })
    .catch(e=>{
        done()
    })
})

test("test get shop fail",done=>{
    shopService.readShop.mockImplementation(()=> Promise.reject())
    request(app)
    .get('/shop/4')
    .then(response=>{
        done()
    })
    .catch(e=>{
        expect(response).toBe(undefined)
        done()
    })
})

test('post request test',done=>{
    shopService.createShop.mockImplementation(()=> Promise.resolve({test:'1'}))
    request(app)
        .post('/shop')
        .send({
        'userName': 'a',
        'name': 'b',
        'email': 'c',
        'creditCard': 'd',
        'address': 'e',
        'state':'f',
        'country': 'g',
        'zipCode' : 'h' ,
        'shopName':'i',
        'shopDescrip':'j',
        })
        .then(response=>{
            expect(response).toEqual({test:'1'})
            done();
        })
        .catch(e=> done())
})

test('post request fail test',done=>{
    shopService.createShop.mockImplementation(()=> Promise.reject())
    request(app)
        .post('/shop')
        .send({
            'name': 'a',
            'email': 'b',
            'password': 'c',
            'phone_number': 'd'
        })
        .then(response=>{
            done();
        })
        .catch(e=>{
            expect(response).toEqual(undefined)
            done()
        })
})

test('put request test', done =>{
    shopService.updateShop.mockImplementation(() => Promise.resolve());
    request(app)
        .put('/shop/7')
        .then(response=>{
            expect(response).toBe(undefined)
            done();
        })
        .catch(e => {
            done();
        })
})

test('put request when it fails to do put request', done =>{
    shopService.updateShop.mockImplementation(() => Promise.reject());
    request(app)
        .put('/shop/7')
        .then(response=>{
            done();
        })
        .catch(e => {
            expect(response).toBe(undefined)
            done();
        })
})

test('delete request test', done =>{
    shopService.deleteShop.mockImplementation(() => Promise.resolve());
    request(app)
        .delete('/shop/7')
        .then(response=>{
            expect(response).toBe(undefined)
            done();
        })
        .catch(e => {
          done();
        })
})

test('delete request fail test', done =>{
    shopService.deleteShop.mockImplementation(() => Promise.reject());
    request(app)
        .delete('/shop/7')
        .then(response=>{
            done();
        })
        .catch(e => {
            expect(response).toBe(undefined)
            done();
        })
})