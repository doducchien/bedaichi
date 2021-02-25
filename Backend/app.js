const express = require('express');
const app = express();
const port = 1999;



app.listen(port, ()=>{
    console.log("App is running on port " + port);
})