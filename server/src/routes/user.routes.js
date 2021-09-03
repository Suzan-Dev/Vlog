const express = require('express');
const {
  signUpUser,
  logInUser,
  logOutUser,
  getUserDetails,
  updateUserProfileImage,
} = require('../controllers/user.controllers');
const { protectRoute } = require('../utils/protectRoute');
const { uploadUserImage, resizeUserImage } = require('../utils/uploadFuncs');

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', logInUser);
router.get('/logout', protectRoute, logOutUser);
router.get('/profile', protectRoute, getUserDetails);
router.patch(
  '/profile',
  protectRoute,
  uploadUserImage,
  resizeUserImage,
  updateUserProfileImage
);

module.exports = router;
