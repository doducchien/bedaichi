const express = require('express');
const app = express();
const port = 1999;
const db = require('./connect_db')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())



const authentication_router = require('./routes/authentication/authentication.route')

app.use('/authentication', authentication_router)



app.listen(port, ()=>{
    console.log("App is running on port " + port);
})