const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/Users.js');
const auth = require('../Middleware/Auth');
const multer = require('../Middleware/Multer-config');

//SIGNUP
router.post('/',multer , usersCtrl.signupUser)

//LOGIN
router.post('/login', usersCtrl.loginUser)

//GET ONE USER
router.get('/userGet/:userId', auth, usersCtrl.userGet)

//GET ALL USER
router.get('/usersGetAll', auth, usersCtrl.usersGetAll)

//DELETE ONE USER
router.put('/deleteUser/:ProductId', auth, usersCtrl.deleteUser);

//UPDATE PROFILE
router.put('/userUpdate/:userId', auth, usersCtrl.userUpdate)

//UPDATE PROFILE PICTURE
router.put('/userUpdatePicture/:userId', auth, multer, usersCtrl.userUpdatePicture)


module.exports = router;
