const express = require('express')

const salary_router = express.Router()
const salary_controller = require('../../controllers/salary/salary.controller')


salary_router.use((req, res, next)=>{
    const user_role = req.headers.user_role
    console.log('from salary.route in middelware: ' + user_role)
  
    if(user_role === 'admin' || user_role === 'salary') next()
    else{
        res.json({
            permission: false
        })
    }
})



salary_router.route('/searchStaff/:keyword')
.get(salary_controller.searchStaff)

salary_router.route('/getAllStaff')
.get(salary_controller.getAllStaff)


salary_router.route('/getAllStaffUnitSalary')
.get(salary_controller.getAllStaffUnitSalary)










module.exports = salary_router