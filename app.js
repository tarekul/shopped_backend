const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')


//middleware
//app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//user routes
app.use('/user',userRouter)
app.use('/product',productRouter)

module.exports = {app,}