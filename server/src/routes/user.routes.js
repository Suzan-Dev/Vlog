const express = require('express');
// const userController = require('../controllers/userController');
const {
  signUpUser,
  logInUser,
  logOutUser,
} = require('../controllers/user.controllers');
// const { uploadUserImage, resizeUserImage } = require('../utils/uploadFuncs');
// const logInLimiter = require('../utils/limiterFuncs');

const router = express.Router();
// const { getAllUsers, getUser, updateUser, updateCurrentUser, deleteCurrentUser, deleteUser, currentUser } = userController;

router.post('/signup', signUpUser);
router.post('/login', logInUser);
router.get('/logout', logOutUser);

module.exports = router;
