const express = require('express');
const authentication_router = express.Router();
const authentication_controller = require('../../controllers/authentication/authentication.controller')

authentication_router.route('/signup')
.post(authentication_controller.signup)

authentication_router.route('/login')
.post(authentication_controller.login)

authentication_router.route('/loginByToken')
.post(authentication_controller.loginByToken)

module.exports = authentication_router;