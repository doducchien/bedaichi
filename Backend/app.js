const express = require('express');
const app = express();
const port = 1999;





const authentication_router = require('./routes/authentication/')





app.listen(port, ()=>{
    console.log("App is running on port " + port);
})