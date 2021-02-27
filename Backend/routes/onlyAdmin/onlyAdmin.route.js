const express = require('express');

const onlyAdmin_router = express.Router()
const onlyAdmin_controller = require('../../controllers/onlyAdmin/onlyAdmin.controller')





//middleware
onlyAdmin_router.use((req, res, next)=>{
    let body = req.body;
    if(body.type === 'admin') next()
    else{
        res.json({
            permission: false
        })
    }
})


onlyAdmin_router.route('/addAcc')
.post(onlyAdmin_controller.addAcc)


module.exports = onlyAdmin_router;