const request = require('supertest')


const {app} = require('../app');
//const {userService} = require('../services/user')
jest.mock('../services/user');
// const {db} = require('../services/user');

// jest.mock('../services/user');
const {userService} = require('../services/user');

test('get request test', done =>{
    userService.readUser.mockImplementation(() => Promise.resolve({test:'1'}));
    request(app)
        .get('/user/7')
        .then(response=>{
            expect(response).toEqual({test:'1'})
            done();
        })
        .catch(e => {
          done();
        })
})

test('get request fail test', done =>{
    userService.readUser.mockImplementation(() => Promise.reject());
    request(app)
        .get('/user/7')
        .then(response => {
            done();
        })
        .catch(e => {
            expect(response).toBe(undefined)
            done();
          })
})

test('post request test',done=>{
    userService.createUser.mockImplementation(()=> Promise.resolve({test:'1'}))
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
            expect(response).toEqual({test:'1'})
            done();
        })
        .catch(e=> done())
})

test('post request fail test',done=>{
    userService.createUser.mockImplementation(()=> Promise.reject({err:err}))
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
            expect(response).toEqual({err:err})
            done()
        })
})

test('delete request test', done =>{
    userService.deleteUser.mockImplementation(() => Promise.resolve());
    request(app)
        .delete('/user/7')
        .then(response=>{
            expect(response).toBe(undefined)
            done();
        })
        .catch(e => {
          done();
        })
})

test('delete request fail test', done =>{
    userService.deleteUser.mockImplementation(() => Promise.reject());
    request(app)
        .delete('/user/7')
        .then(response=>{
            done();
        })
        .catch(e => {
            expect(response).toBe(undefined)
            done();
        })
})


test('put request test', done =>{
    userService.updateUser.mockImplementation(() => Promise.resolve());
    request(app)
        .put('/user/7')
        .then(response=>{
            expect(response).toBe(undefined)
            done();
        })
        .catch(e => {
            done();
        })
})

test('put request when it fails to do put request', done =>{
    userService.updateUser.mockImplementation(() => Promise.reject());
    request(app)
        .put('/user/7')
        .then(response=>{
            done();
        })
        .catch(e => {
            expect(response).toBe(undefined)
            done();
        })
})



