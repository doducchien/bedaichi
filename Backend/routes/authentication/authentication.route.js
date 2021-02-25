const express = require('express');
const authentication_router = express.Router();
const authentication_controller = require('../../controllers/authentication/authentication.controller')

authentication_router.route('/signup')
.post(authentication_controller.signup)


module.exports = authentication_router;