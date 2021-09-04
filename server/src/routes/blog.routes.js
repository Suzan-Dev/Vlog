const express = require('express');
const {
  getAllBlogs,
  getBlog,
  addBlog,
  deleteBlog,
} = require('../controllers/blog.controllers');
const { protectRoute } = require('../utils/protectRoute');
const { uploadBlogImage, resizeBlogImage } = require('../utils/uploadFuncs');

const router = express.Router();

router.get('/blogs', getAllBlogs);
router.get('/blogs/:slug', getBlog);
router.post('/blogs', protectRoute, uploadBlogImage, resizeBlogImage, addBlog);
router.delete('/blogs/:id', protectRoute, deleteBlog);

module.exports = router;
