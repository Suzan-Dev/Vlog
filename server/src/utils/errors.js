class ApiErrors extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Failure' : 'Error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const sendError = (err, req, res) => {
  // Operational/Trusted errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming/Unknown errors
  console.error(err);
  return res.status(500).json({
    status: 'Error',
    message: 'Something went wrong!',
  });
};

const handleCastErrorDB = (err) => {
  const message = `Provided value '${err.value}' for ${err.path} field is invalid!`;
  return new ApiErrors(400, message);
};

const handleDuplicateErrorDB = () => {
  const message = `Data provided already exists.`;
  return new ApiErrors(400, message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(({ message }) => message);
  const message = `Invalid entered data. ${errors.join(' ')}`;
  return new ApiErrors(400, message);
};

const handleJWTErrorAuth = () =>
  new ApiErrors(401, 'Invalid token, Please log in again!');

const handleJWTExpiredErrorAuth = () =>
  new ApiErrors(401, 'Your token has expired, Please log in again!');

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  let error = { ...err };
  error.message = err.message; // req as no message when destructuring!

  if (err.name === 'CastError') error = handleCastErrorDB(error);
  if (err.code === 11000) error = handleDuplicateErrorDB(error);
  if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (err.name === 'JsonWebTokenError') error = handleJWTErrorAuth();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredErrorAuth();

  if (process.env.NODE_ENV !== 'production') {
    console.log('Error', err);
  }
  sendError(error, req, res);
};

module.exports = { globalErrorHandler, ApiErrors };
