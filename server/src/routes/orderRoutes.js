import express from 'express';
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  exportOrders
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.route('/me')
  .get(protect, getMyOrders);

router.route('/export')
  .get(protect, admin, exportOrders);

export default router;