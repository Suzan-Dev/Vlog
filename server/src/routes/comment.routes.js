const express = require('express');
const {
  getPostComments,
  AddComment,
} = require('../controllers/comment.controllers');
const { protectRoute } = require('../utils/protectRoute');

const router = express.Router();

router.get('/blog/:id/comments', getPostComments);
router.post('/blog/:id/comments', protectRoute, AddComment);

module.exports = router;
