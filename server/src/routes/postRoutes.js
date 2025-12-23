import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  exportPosts
} from '../controllers/postController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, admin, createPost);

router.route('/search').get(searchPosts);
router.route('/export').get(exportPosts);

router.route('/:id')
  .get(getPostById)
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost);

export default router;