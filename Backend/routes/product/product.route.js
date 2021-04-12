const express = require('express')

const product_router = express.Router()
const product_controller = require('../../controllers/product/product.controller')


product_router.use((req, res, next)=>{
    const user_role = req.headers.user_role
    console.log('from staff.route in middelware: ' + user_role)
  
    if(user_role === 'admin' || user_role === 'product') next()
    else{
        res.json({
            permission: false
        })
    }
})


product_router.route('/createProduct')
.post(product_controller.createProduct)

product_router.route('/getAllProduct')
.get(product_controller.getAllProduct)

product_router.route('/searchProduct/:keyword')
.get(product_controller.searchProduct)

product_router.route('/getAllCustomer')
.get(product_controller.getAllCustomer)

product_router.route('/searchCustomer/:keyword')
.get(product_controller.searchCustomer)

product_router.route('/getAllStaffProduct/:id')
.get(product_controller.getAllStaffProduct)

product_router.route('/getProduct/:id')
.get(product_controller.getProduct)

product_router.route('/getOrdered/:id')
.get(product_controller.getOrdered)

product_router.route('/getCustomer/:email')
.get(product_controller.getCustomer)

product_router.route('/getStep/:id')
.get(product_controller.getStep)

product_router.route('/createCustomer')
.post(product_controller.addCustomer)

product_router.route('/createStaffProduct')
.post(product_controller.createStaffProduct)

product_router.route('/addOrdered')
.post(product_controller.addOrdered)

product_router.route('/updateStep')
.put(product_controller.updateStep)


product_router.route('/updateInfoProduct')
.put(product_controller.updateInfoProduct)

product_router.route('/deleteStaffProduct/:id/:email')
.delete(product_controller.deleteStaffProduct)

















module.exports = product_router