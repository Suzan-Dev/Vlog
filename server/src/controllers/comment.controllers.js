const { sendResponse } = require('../utils/response');
const Comment = require('../models/comment.model');
const catchAsync = require('../utils/catchAsync');
const { ApiErrors } = require('../utils/errors');

exports.getPostComments = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ApiErrors(400, 'Please provide a blog id.'));
  }

  const blogComments = await Comment.find({
    blog: id,
  }).sort('createdAt');

  res
    .status(200)
    .json(
      sendResponse(
        'Success',
        'Blog comments are fetched successfully.',
        blogComments
      )
    );
});

exports.AddComment = catchAsync(async (req, res, next) => {
  const { body } = req.body;
  const { id } = req.params;

  if (!body) {
    return next(new ApiErrors(400, 'Please add a comment body.'));
  }

  if (!id) {
    return next(new ApiErrors(400, 'Please provide a blog id.'));
  }

  const comment = await Comment.create({
    body,
    author: req.user._id,
    blog: id,
  });

  res
    .status(200)
    .json(
      sendResponse(
        'Success',
        'Comment added to the blog successfully.',
        comment
      )
    );
});
