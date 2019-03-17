const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

const userRouter = require('./routes/userRouter')
const shopRouter = require('./routes/shopRouter')
const productRouter = require('./routes/productRouter')
const orderRouter = require('./routes/orderRouter')

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//user routes
app.use('/user',userRouter)
//app.use('/products',productRouter)






app.listen(3001, ()=>{
    console.log('Server is listening to port 3001.');
})