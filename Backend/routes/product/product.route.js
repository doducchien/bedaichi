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

















module.exports = product_router