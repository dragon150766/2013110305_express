var express = require('express');
var router = express.Router();
const staffController = require('../controllers/staffController');
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT')

router.get('/', [passportJWT.isLogin],staffController.index);

router.get('/:id', staffController.show);

router.post('/',[
    body('name').not().isEmpty().withMessage("Enter you name pls"),
    body('salary').not().isEmpty().withMessage("Enter you salary Pls").isNumeric().withMessage("You salary is not number")
   
], staffController.insert);

router.delete('/:id', staffController.destroy);

router.put('/:id', staffController.update);


module.exports = router;