const express = require('express')
const regime_router = express.Router()
const regime_controller = require('../../controllers/regime/regime.controller')

regime_router.use((req, res, next)=>{
    const user_role = req.headers.user_role
    console.log('from staff.route in middelware: ' + user_role)
  
    if(user_role === 'admin' || user_role === 'regime') next()
    else{
        res.json({
            permission: false
        })
    }
})

regime_router.route('/createTypeRegime')
.post(regime_controller.createTypeRegime)

regime_router.route('/getAllTypeRegime')
.get(regime_controller.getAllTypeRegime)

regime_router.route('/getDetailTypeRegime/:id')
.get(regime_controller.getDetailTypeRegime)



module.exports = regime_router