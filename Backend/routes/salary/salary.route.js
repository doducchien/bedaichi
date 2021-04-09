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


salary_router.route('/getAllTotalSalary/:time')
.get(salary_controller.getAllTotalSalary)

salary_router.route('/getOverOnRequest/:email/:startTime/:endTime')
.get(salary_controller.getOverOnRequest)

salary_router.route('/getCountAttendance/:email/:startTime/:endTime')
.get(salary_controller.getCountAttendance)

salary_router.route('/getCountLateHours/:email/:startTime/:endTime')
.get(salary_controller.getCountLateTime)


salary_router.route('/getDiscount/:email/:ispaid')
.get(salary_controller.getDiscount)

salary_router.route('/getAllProduct')
.get(salary_controller.getAllProduct)


salary_router.route('/payWages')
.post(salary_controller.payWages)


salary_router.route('/updateUnitSalary')
.put(salary_controller.updateUnitSalary)









module.exports = salary_router