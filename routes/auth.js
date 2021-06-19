/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { login, googleSingIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post( '/', [
    check('password', 'The password is mandatory').not().isEmpty(),
    check('email', 'The email is mandatory').isEmail(),
    validateFields
], login);

router.post( '/google', [
    check('token', 'The token of Google is mandatory').not().isEmpty(),
    validateFields
], googleSingIn);




module.exports = router;
