const multer = require('multer');
const sharp = require('sharp');
const { ApiErrors } = require('./errors');
const catchAsync = require('./catchAsync');

const multerStorage = multer.memoryStorage();

const multerFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ApiErrors(400, 'You can only upload image file!'), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFileFilter });

// Blog

exports.uploadBlogImage = upload.single('coverImage');

exports.resizeBlogImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `blog-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1920, 1080)
    .toFormat('jpeg')
    .jpeg({ quality: 85 })
    .toFile(`src/public/${req.file.filename}`);

  next();
});

// User

exports.uploadUserImage = upload.single('image');

exports.resizeUserImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(400, 400)
    .toFormat('jpeg')
    .jpeg({ quality: 85 })
    .toFile(`src/public/${req.file.filename}`);

  next();
});
