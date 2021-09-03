const { sendResponse } = require('../utils/response');
const { sendSuccessResWithToken } = require('../utils/jwt');

const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const { ApiErrors } = require('../utils/errors');

exports.signUpUser = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new ApiErrors(400, 'Please provide all the required fields.'));
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  sendSuccessResWithToken(
    req,
    res,
    201,
    'Your account have been created successfully.',
    user
  );
});

exports.logInUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiErrors(400, 'Please provide an email & password.'));
  }

  // check if email or password or both is incorrect
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new ApiErrors(401, 'Email or password is incorrect.'));
  }

  sendSuccessResWithToken(
    req,
    res,
    200,
    'You are logged in successfully.',
    user
  );
});

exports.logOutUser = catchAsync(async (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };

  res.cookie('jwt', 'LoggedOut', cookieOptions);
  res
    .status(200)
    .json(sendResponse('Success', 'You are logged out successfully.', null));
});

exports.getUserDetails = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  res
    .status(200)
    .json(
      sendResponse('Success', 'Your profile is fetched successfully.', user)
    );
});

exports.updateUserProfileImage = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      image: req.file.filename,
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json(sendResponse('Success', 'Your profile updated successfully.', user));
});
