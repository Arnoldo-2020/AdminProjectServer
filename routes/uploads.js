/*
    Route: /api/todo/:search
*/

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, returnImage } = require('../controllers/uploads');

const router = Router();

router.use(expressfileUpload());

router.put('/:type/:id', validateJWT, fileUpload );
router.get('/:type/:picture', returnImage );


module.exports = router;

