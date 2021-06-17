/*
    Route: '/api/hospitals'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
} = require('../controllers/hospitals')

const router = Router();

router.get('/', validateJWT, getHospitals );

router.post('/', [
    validateJWT,
    check('name', 'The name of the hospital is necessary').not().isEmpty(),
    validateFields
], createHospitals );

router.put('/:id', [
    
], updateHospitals );

router.delete('/:id', validateJWT, deleteHospitals );

module.exports = router;