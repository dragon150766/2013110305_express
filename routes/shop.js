var express = require('express');
var router = express.Router();
const shopController = require('../controllers/shopController')
const { body } = require('express-validator');

router.get('/', shopController.shop);
router.get('/menu',shopController.menu);
router.get('/:id',shopController.show)
router.post('/',[
    body('name').not().isEmpty().withMessage("Enter you name pls"),
    body('location').isObject().withMessage("You location need to be Object lat and lgn"),
    body('location.lat').not().isEmpty().withMessage("Enter you lat Pls").isNumeric().withMessage("lat need to be number"),
    body('location.lgn').not().isEmpty().withMessage("Enter you lgn Pls").isNumeric().withMessage("lgn need to be number")
], shopController.insert)

module.exports = router;