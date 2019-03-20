const request = require('supertest')
jest.mock('../services/product')

const {productService} = require('../services/product')
const {app} = require('../app')

test("test get product",done=>{
    productService.readProduct.mockImplementation(()=> Promise.resolve({test:'1'}))
    request(app)
    .get('/product/4')
    .then(response=>{
        expect(response).toEqual({test:'1'})
        done()
    })
    .catch(e=>{
        done()
    })
})

test("test get product fail",done=>{
    productService.readProduct.mockImplementation(()=> Promise.reject())
    request(app)
    .get('/product/4')
    .then(response=>{
        done()
    })
    .catch(e=>{
        expect(response).toBe(undefined)
        done()
    })
})

test('post request test',done=>{
    productService.createProduct.mockImplementation(()=> Promise.resolve({test:'1'}))
    request(app)
        .post('/product')
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
    productService.createProduct.mockImplementation(()=> Promise.reject())
    request(app)
        .post('/product')
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