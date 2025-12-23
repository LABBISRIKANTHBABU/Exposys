import express from 'express';
import {
    registerUser,
    loginUser,
    getUsers,
    exportUsers
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// Admin Routes
router.route('/users').get(protect, admin, getUsers);
router.route('/users/export').get(protect, admin, exportUsers);

export default router;