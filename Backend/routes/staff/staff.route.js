const express = require('express')

const staff_router = express.Router()
const staff_controller = require('../../controllers/staff/staff.controller')


staff_router.use((req, res, next)=>{
    const user_role = req.headers.user_role
    console.log('from staff.route in middelware: ' + user_role)
  
    if(user_role === 'admin' || user_role === 'staff') next()
    else{
        res.json({
            permission: false
        })
    }
})

staff_router.route('/getAllDepartment')
.get(staff_controller.getAllDepartment)

staff_router.route('/getDepartment/:id')
.get(staff_controller.getDepartment)

staff_router.route('/searchStaff/:keyword/:department/:status')
.get(staff_controller.searchStaff)
staff_router.route('/getDetailStaff/:email')
.get(staff_controller.getDetailStaff)


staff_router.route('/createStaff')
.post(staff_controller.createStaff)

staff_router.route('/createDepartment')
.post(staff_controller.createDepartment)

staff_router.route('/updateDepartment')
.put(staff_controller.updateDepartment)







module.exports = staff_router;