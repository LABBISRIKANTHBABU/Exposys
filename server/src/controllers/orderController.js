import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';
import * as XLSX from 'xlsx';

class OrderController {
  // @desc    Create new order
  // @route   POST /api/orders
  // @access  Private
  createOrder = asyncHandler(async (req, res) => {
    const { items, totalAmount } = req.body;

    if (items && items.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        user: req.user._id,
        items,
        totalAmount,
        deliveryAddress: req.body.deliveryAddress,
        paymentMethod: req.body.paymentMethod,
        status: req.body.status
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  });

  // @desc    Get logged in user orders
  // @route   GET /api/orders/me
  // @access  Private
  getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  });

  // @desc    Get all orders (Admin)
  // @route   GET /api/orders
  // @access  Private/Admin
  getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  });

  // @desc    Export orders to Excel
  // @route   GET /api/orders/export
  // @access  Private/Admin
  exportOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name email');

    const data = orders.map(order => {
      const itemsString = order.items.map(item => `${item.name} (${item.quantity})`).join(', ');
      return {
        ID: order._id.toString(),
        User: order.user?.name || 'Unknown',
        Email: order.user?.email || 'Unknown',
        Items: itemsString,
        Total_Amount: order.totalAmount,
        Status: order.status || 'Pending',
        Date: order.createdAt
      };
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, 'Orders');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', 'attachment; filename="orders.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    res.send(buffer);
  });
}

const orderController = new OrderController();

export const {
  createOrder,
  getMyOrders,
  getAllOrders,
  exportOrders
} = orderController;