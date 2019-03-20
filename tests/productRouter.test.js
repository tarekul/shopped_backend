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