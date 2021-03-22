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

regime_router.route('/createStaffRegime')
.post(regime_controller.createStaffRegime)

regime_router.route('/createStaffAwareness')
.post(regime_controller.createStaffAwareness)

regime_router.route('/getAllTypeRegime')
.get(regime_controller.getAllTypeRegime)

regime_router.route('/getListAwareness/:type/:time')
.get(regime_controller.getListAwareness)

regime_router.route('/getDetailTypeRegime/:id')
.get(regime_controller.getDetailTypeRegime)

regime_router.route('/getListStaffRegime/:id/:time')
.get(regime_controller.getListStaffRegime)

regime_router.route('/deleteStaffRegime/:email/:time/:id')
.delete(regime_controller.deleteStaffRegime)

regime_router.route('/deleteStaffAwareness/:email/:time/:type')
.delete(regime_controller.deleteStaffAwareness)



module.exports = regime_router