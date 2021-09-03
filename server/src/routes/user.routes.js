const express = require('express');
const {
  signUpUser,
  logInUser,
  logOutUser,
  getUserDetails,
} = require('../controllers/user.controllers');
const { protectRoute } = require('../utils/protectRoute');

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', logInUser);
router.get('/logout', logOutUser);
router.get('/me', protectRoute, getUserDetails);

module.exports = router;
