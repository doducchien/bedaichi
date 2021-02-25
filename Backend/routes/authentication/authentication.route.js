const express = require('express');
const authentication_router = express.Router();
const authentication_controller = require('../../controllers/authentication/')

authentication_router.route('/authentication/signup')
.post()