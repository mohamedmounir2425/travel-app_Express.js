const router = require('express').Router();
const UserController = require('../Controllers/user.controller');
const { auth } = require('../Middlewares/auth');

// GET Methods
router.get('/userData',auth,UserController.userData);


// Post Methods
router.post('/register',UserController.register);
router.post('/login',UserController.logInUser);
router.post('/logout',auth,UserController.logOutUser);
router.post('/loginGoogle',UserController.logInGoogle);

// update Methods
router.patch('/updateUser',auth,UserController.editUser);


module.exports = router;