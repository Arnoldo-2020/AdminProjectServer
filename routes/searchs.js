/*
    Route: /api/todo/:search
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {getTodo, getDocumentsCollection} = require('../controllers/searchs');

const router = Router();

router.get('/:search', validateJWT, getTodo);
router.get('/collection/:table/:search', validateJWT, getDocumentsCollection);

module.exports = router;

