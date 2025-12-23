import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

class PostController {
  // @desc    Fetch all posts
  // @route   GET /api/posts
  // @access  Public
  getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.json(posts);
  });

  // @desc    Fetch single post
  // @route   GET /api/posts/:id
  // @access  Public
  getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
      res.json(post);
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  });

  // @desc    Create a post
  // @route   POST /api/posts
  // @access  Private/Admin
  createPost = asyncHandler(async (req, res) => {
    const post = new Post({
      title: 'Sample Title',
      content: 'Sample content',
      image: '/images/sample.jpg',
      category: 'General'
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  });

  // @desc    Update a post
  // @route   PUT /api/posts/:id
  // @access  Private/Admin
  updatePost = asyncHandler(async (req, res) => {
    const { title, content, image, category } = req.body;

    const post = await Post.findById(req.params.id);

    if (post) {
      post.title = title || post.title;
      post.content = content || post.content;
      post.image = image || post.image;
      post.category = category || post.category;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  });

  // @desc    Delete a post
  // @route   DELETE /api/posts/:id
  // @access  Private/Admin
  deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
      await Post.deleteOne({ _id: post._id });
      res.json({ message: 'Post removed' });
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  });

  // @desc    Search posts by title or content
  // @route   GET /api/posts/search?q=keyword
  // @access  Public
  searchPosts = asyncHandler(async (req, res) => {
    const keyword = req.query.q
      ? {
        $or: [
          {
            title: {
              $regex: req.query.q,
              $options: 'i',
            },
          },
          {
            content: {
              $regex: req.query.q,
              $options: 'i',
            },
          },
        ],
      }
      : {};

    const posts = await Post.find({ ...keyword });
    res.json(posts);
  });

  // @desc    Export posts to Excel
  // @route   GET /api/posts/export
  // @access  Public
  exportPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({});

    // Transform data for Excel
    const data = posts.map(post => ({
      ID: post._id.toString(),
      Title: post.title,
      Category: post.category,
      Content: post.content,
      Image: post.image,
      Created_At: post.createdAt,
      Updated_At: post.updatedAt
    }));

    // Create WorkBook and WorkSheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, 'Posts');

    // Generate buffer
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // Set headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename="posts.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    res.send(buffer);
  });
}

const postController = new PostController();

export const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  exportPosts
} = postController;
