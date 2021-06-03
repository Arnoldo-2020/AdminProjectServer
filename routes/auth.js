/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post( '/', [
    check('password', 'The password is mandatory').not().isEmpty(),
    check('email', 'The email is mandatory').isEmail(),
    validateFields
], login);




module.exports = router;
