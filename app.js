const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

const userRouter = require('./routes/userRouter')


//middleware
//app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//user routes
app.use('/user',userRouter)
//app.use('/products',productRouter)

module.exports = {app,}