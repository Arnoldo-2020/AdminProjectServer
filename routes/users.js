/*
    Route: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUsers, updateUser, deleteUser } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers );

router.post('/', [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('password', 'The password is mandatory').not().isEmpty(),
    check('email', 'The email is mandatory').isEmail(),
    validateFields
], createUsers );

router.put('/:id', [
    validateJWT,
    check('name', 'The name is mandatory').not().isEmpty(),
    check('email', 'The email is mandatory').isEmail(),
    // check('role', 'The role is mandatory').isEmail(),
    validateFields
], updateUser );

router.delete('/:id', validateJWT, deleteUser );

module.exports = router;