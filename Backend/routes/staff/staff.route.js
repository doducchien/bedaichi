const express = require('express')

const staff_router = express.Router()
const staff_controller = require('../../controllers/staff/staff.controller')


staff_router.use((req, res, next)=>{
    const user_role = req.headers.user_role

  
    if(user_role === 'admin' || user_role === 'staff') next()
    else{
        res.json({
            permission: false
        })
    }
})

staff_router.route('/getAllDepartment')
.get(staff_controller.getAllDepartment)


staff_router.route('/createStaff')
.post(staff_controller.createStaff)








module.exports = staff_router;