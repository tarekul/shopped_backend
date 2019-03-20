jest.mock('pg-promise')
const pgp = require('pg-promise')

pgp.mockImplementation(()=>{
    return function(){
        return {
            one: () => Promise.resolve(),
            none: () => Promise.resolve()
        }
    }
})

const {userService} = require('../services/user')
test("test readUser function",()=>{
    userService.readUser('7').then(data=>{
        expect(data).toEqual(data)
    })
})

test("test createUser function",()=>{
    userService.createUser('a','b').then(data=>{
        expect(data).toBe(undefined)
    })
})


test("test deleteUser function",()=>{
    userService.deleteUser('a').then(data=>{
        expect(data).toBe(undefined)
    })
})
