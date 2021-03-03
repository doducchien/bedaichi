const express = require('express');

const onlyAdmin_router = express.Router()
const onlyAdmin_controller = require('../../controllers/onlyAdmin/onlyAdmin.controller')





//middleware
onlyAdmin_router.use((req, res, next)=>{

    const user_role = req.headers.user_role
  
    if(user_role === 'admin') next()
    else{
        res.json({
            permission: false
        })
    }
})


onlyAdmin_router.route('/addAcc')
.post(onlyAdmin_controller.addAcc)

onlyAdmin_router.route('/getAcc/:filter')
.get(onlyAdmin_controller.getAcc)

onlyAdmin_router.route('/getAccDetail/:email')
.get(onlyAdmin_controller.getAccDetail)

onlyAdmin_router.route('/deleteAcc/:email')
.delete(onlyAdmin_controller.deleteAcc)


module.exports = onlyAdmin_router;