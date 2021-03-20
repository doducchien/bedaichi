const express = require('express');
const app = express();
const port = 1999;
const db = require('./connect_db')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())



const authentication_router = require('./routes/authentication/authentication.route')
const onlyAdmin_router = require('./routes/onlyAdmin/onlyAdmin.route')
const staff_router = require('./routes/staff/staff.route')
const regime_router = require('./routes/regime/regime.route')

app.use('/authentication', authentication_router)
app.use('/onlyAdmin', onlyAdmin_router)
app.use('/staff', staff_router)
app.use('/regime', regime_router)


app.listen(port, ()=>{
    console.log("App is running on port " + port);
})