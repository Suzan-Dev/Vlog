const fs = require('fs');
const path = require('path');
const { sendResponse } = require('../utils/response');
const Blog = require('../models/blog.model');
const catchAsync = require('../utils/catchAsync');
const { ApiErrors } = require('../utils/errors');

exports.getAllBlogs = catchAsync(async (req, res) => {
  const { date, title } = req.query;
  const blogsQuery = Blog.find().select('-body').sort('-createdAt');

  if (date) {
    date === 'ASC'
      ? blogsQuery.sort('createdAt')
      : blogsQuery.sort('-createdAt');
  }
  if (title) {
    title === 'ASC' ? blogsQuery.sort('title') : blogsQuery.sort('-title');
  }

  const blogs = await blogsQuery;

  res
    .status(200)
    .json(sendResponse('Success', 'Blogs are fetched successfully.', blogs));
});

exports.getBlog = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const blog = await Blog.findOne({ slug });

  res
    .status(200)
    .json(sendResponse('Success', 'Blog fetched successfully.', blog));
});

exports.addBlog = catchAsync(async (req, res, next) => {
  const { title, description, tags, body } = req.body;

  if (!title || !description || !tags || !body) {
    return next(new ApiErrors(400, 'Please provide all required fields.'));
  }

  const slug = title.toLowerCase().replace(/ /g, '-');
  const coverImageUrl = req.file.filename;

  const blog = await Blog.create({
    title,
    slug,
    description,
    body,
    author: req.user._id,
    coverImage: coverImageUrl,
    tags,
  });

  res
    .status(201)
    .json(sendResponse('Success', 'Your Blog is created successfully.', blog));
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ApiErrors(400, 'Please provide the blog id.'));
  }

  const blog = await Blog.findById(id);

  await Blog.deleteOne({
    _id: id,
  });

  fs.unlink(
    path.join(__dirname, `../public/${blog.coverImage}`),
    function (err) {
      if (err) return next(new ApiErrors(400, err.message));
      res
        .status(200)
        .json(sendResponse('Success', 'Blog deleted successfully.', null));
    }
  );
});
