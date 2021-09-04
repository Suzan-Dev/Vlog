const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: false,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Blog must belong to a user.'],
    },
    coverImage: {
      type: String,
      trim: true,
      required: false,
    },
    tags: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'username image',
  });

  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
