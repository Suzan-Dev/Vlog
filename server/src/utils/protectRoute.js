const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const { ApiErrors } = require('./errors');
const catchAsync = require('./catchAsync');

exports.protectRoute = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  const { jwt: jwtAuth } = req.cookies;

  let token;

  // Get token & check if its there
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  } else if (jwtAuth) {
    token = jwtAuth;
  }

  if (!token) {
    return next(new ApiErrors(401, 'Please log in first!'));
  }

  // Verify token -> its error in apiErrors file
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const existingUser = await User.findById(decoded.id);
  if (!existingUser) {
    return next(
      new ApiErrors(401, "The user belonging to this token doesn't exists!")
    );
  }

  req.user = existingUser;
  next();
});
