const {app} = require('./app')

app.listen(process.env.PORT || 3001, ()=>{
    console.log('Server is listening to port 3001.');
})