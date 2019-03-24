const {createSqlCommandForUpdate2} = require('../services/helper')

test("",()=>{
    expect('1').toEqual('1')
})

test("helper function test",()=>{
    const a = 'a'
    const b = 'b'
    //console.log(createSqlCommandForUpdate('7',[a,b],['a','b']))
    expect(createSqlCommandForUpdate2([a,b],['a','b'],'users','id')).toBe('UPDATE users SET a=${a},b=${b} WHERE id=${id}')
})