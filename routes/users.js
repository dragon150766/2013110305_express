var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const { body } = require('express-validator');

/* GET users listing. */
router.get('/', userController.userIndex );
router.get('/bio', userController.userBio);
router.post('/',[
    body('name').not().isEmpty().withMessage("Enter you name pls"),
    body('email').not().isEmpty().withMessage("Pls enter you E-mail").isEmail().withMessage("You format is not e-mail"),
    body('password').not().isEmpty().withMessage("Pls enter you password").isLength({ min: 5 }).withMessage("You password should have 5 or more")

], userController.register);
router.post('/login',[
    body('email').not().isEmpty().withMessage("Pls enter you E-mail").isEmail().withMessage("You format is not e-mail"),
    body('password').not().isEmpty().withMessage("Pls enter you password").isLength({ min: 5 }).withMessage("You password should have 5 or more")

], userController.login)


module.exports = router;
