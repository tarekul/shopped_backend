const request = require('supertest')
const userRouter = require('../routes/userRouter')

test('get request with id returns status 200',done =>{
   request(userRouter)
  .get('/user/7')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
})
