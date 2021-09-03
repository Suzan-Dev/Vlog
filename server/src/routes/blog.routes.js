const express = require('express');
// const userController = require('../controllers/userController');
const {
  getAllBlogs,
  addBlog,
  deleteBlog,
} = require('../controllers/blog.controllers');
const { protectRoute } = require('../utils/protectRoute');
const { uploadBlogImage, resizeBlogImage } = require('../utils/uploadFuncs');
// const logInLimiter = require('../utils/limiterFuncs');

const router = express.Router();
// const { getAllUsers, getUser, updateUser, updateCurrentUser, deleteCurrentUser, deleteUser, currentUser } = userController;

router.get('/blogs', getAllBlogs);
router.post('/blogs', protectRoute, uploadBlogImage, resizeBlogImage, addBlog);
router.delete('/blogs/:id', protectRoute, deleteBlog);

module.exports = router;
