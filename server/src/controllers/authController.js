import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import * as XLSX from 'xlsx';

class AuthController {
  // Generate JWT token
  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
  }

  // @desc    Register a new user
  // @route   POST /api/auth/register
  // @access  Public
  registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: this.generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });

  // @desc    Authenticate user & get token
  // @route   POST /api/auth/login
  // @access  Public
  loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: this.generateToken(user._id)
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });

  // @desc    Get all users
  // @route   GET /api/auth/users
  // @access  Private/Admin
  getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  });

  // @desc    Export users to Excel
  // @route   GET /api/auth/users/export
  // @access  Private/Admin
  exportUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    const data = users.map(user => ({
      ID: user._id.toString(),
      Name: user.name,
      Email: user.email,
      Role: user.role,
      Joined_At: user.createdAt
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', 'attachment; filename="users.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    res.send(buffer);
  });
}

const authController = new AuthController();

export const {
  registerUser,
  loginUser,
  getUsers,
  exportUsers
} = authController;