import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';
import OrderItem from '../components/OrderItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersAPI.getMyOrders();
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" color="orange" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-2xl mx-auto mt-8">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-2">My Orders</h1>
        <p className="text-gray-600">View your order history and track your deliveries</p>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-orange-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gradient">No Orders Yet</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">You haven't placed any orders yet. Let's change that!</p>
          <button
            onClick={() => window.location.href = '/'}
            className="btn-primary px-6 py-3 text-lg"
          >
            Browse Our Burgers
          </button>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;