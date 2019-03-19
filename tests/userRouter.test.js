const request = require('supertest')
// jest.mock('pg-promise')
// const pg_promise = require("pg-promise")
// pg_promise.mockImplementation(() => {
//     return function() {
//         return {
//             one: () => Promise.resolve(),
//             none:()=> Promise.resolve()
//         }
//     }
// })

const {app} = require('../app');

jest.mock('../services/user');
// const {db} = require('../services/user');

// jest.mock('../services/user');
const {userService} = require('../services/user');

test('get request with id returns status 200', done =>{
    userService.readUser.mockImplementation(() => Promise.resolve());
    request(app)
        .get('/user/17')
        .then(response=>{
            expect(response.status).toBe(200)
            done();
        })
        .catch(e => {
          done();
        })
})

test('get request with no id returns status 400', done =>{
    userService.readUser.mockImplementation(() => Promise.reject());
    request(app)
        .get('/user/7')
        .then(response => {
            done();
        })
        .catch(e => {
            expect(response.status).toBe(400)
            done();
          })
})

test('post request return status 200',done=>{
    userService.createUser.mockImplementation(()=> Promise.resolve())
    request(app)
        .post('/user')
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
            expect(response.status).toBe(200)
            done();
        })
        .catch(e=> done())
})

test('post request return status 400 when query fails',done=>{
    userService.createUser.mockImplementation(()=> Promise.reject())
    request(app)
        .post('/user')
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
            expect(response.status).toBe(400)
            done()
        })
})



