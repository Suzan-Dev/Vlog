const path = require('path');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const userRouter = require('./routes/user.routes');
const blogRouter = require('./routes/blog.routes');

const { globalErrorHandler, ApiErrors } = require('./utils/errors');

const app = express();

app.enable('trust proxy');

// for only our frontend website
// app.use(
//   cors({
//     origin: 'http://example.com',
//   })
// );

// middleware
app.use(cors());
app.options('*', cors()); // for update,delete requests
app.use(helmet());
// app.use(helmet({ contentSecurityPolicy: false }));

// const apiLimiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again after an hour!',
// });

// app.use('/api/', apiLimiter);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(compression());

// mounting routers(middleware)
app.use('/api/v1/en', userRouter);
app.use('/api/v1/en', blogRouter);

// handling not matched route
app.all('*', (req, res, next) => {
  next(new ApiErrors(404, `404, Page Not Found!`));
});

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
