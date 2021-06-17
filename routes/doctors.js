/*
    Route: '/api/doctors'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctors');

const router = Router();

router.get('/', validateJWT, getDoctors );

router.post('/', [
    validateJWT,
    check('name', 'The name of the doctor is necessary').not().isEmpty(),
    check('hospital', 'The hospital id should be valid').isMongoId(),
    validateFields   
], createDoctor );

router.put('/:id', [
    
], updateDoctor );

router.delete('/:id', validateJWT, deleteDoctor );

module.exports = router;