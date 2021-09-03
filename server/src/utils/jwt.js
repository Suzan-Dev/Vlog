const jwt = require('jsonwebtoken');
const { sendResponseForAuth } = require('./response');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

sendSuccessResWithToken = (req, res, statusCode, message, user) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_TOKEN_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure,
  });

  const { password: hash, ...otherValues } = user._doc;

  res
    .status(statusCode)
    .json(sendResponseForAuth('Success', message, otherValues, token));
};

module.exports = { signToken, sendSuccessResWithToken };
