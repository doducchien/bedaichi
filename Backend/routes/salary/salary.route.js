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


salary_router.route('/searchUnitSalary/:keyword')
.get(salary_controller.searchUnitSalary)

salary_router.route('/getAllStaffUnit')
.get(salary_controller.getAllStaffUnit)

salary_router.route('/getNameStaff/:email')
.get(salary_controller.getNameStaff)

salary_router.route('/getUnitSalary/:email')
.get(salary_controller.getUnitSalary)


salary_router.route('/updateUnitSalary')
.put(salary_controller.updateUnitSalary)









module.exports = salary_router