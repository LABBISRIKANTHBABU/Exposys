import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import LoadingSpinner from '../components/LoadingSpinner';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" color="orange" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-orange-100 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gradient">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">Looks like you haven't added any delicious burgers to your cart yet. Let's fix that!</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary px-6 py-3 text-lg"
        >
          Browse Our Burgers
        </button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-2">Your Cart</h1>
        <p className="text-gray-600">Review your items and proceed to checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartItems.map((item, index) => {
                if (!item || !item.product) return null; // Defensive check

                return (
                  <div key={index} className="p-6 flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                      <img
                        className="h-24 w-24 rounded-lg object-cover shadow"
                        src={item.product.image || '/images/default-burger.jpg'}
                        alt={item.product.name || 'Burger'}
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="text-lg font-bold">{item.product.name || 'Unknown Burger'}</h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {item.ingredients && Array.isArray(item.ingredients) && item.ingredients.length > 0
                              ? `${item.ingredients.slice(0, 3).join(', ')}${item.ingredients.length > 3 ? ` +${item.ingredients.length - 3} more` : ''}`
                              : 'No custom ingredients'}
                          </p>
                        </div>

                        <div className="mt-2 sm:mt-0 text-right">
                          <p className="text-lg font-bold text-orange-600">₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                          <p className="text-gray-500 text-sm">₹{(item.price || 0).toFixed(2)} each</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <span className="mr-3 text-gray-600">Qty:</span>
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() => updateQuantity(index, Math.max(1, (item.quantity || 1) - 1))}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity || 1}</span>
                            <button
                              onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-600 hover:text-red-800 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card sticky top-24">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹40.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>₹{(getTotalPrice() * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">₹{(getTotalPrice() + 40 + (getTotalPrice() * 0.05)).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full py-3 text-lg mb-4"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/')}
                className="btn-secondary w-full py-3 text-lg"
              >
                Continue Shopping
              </button>

              <div className="mt-6 text-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure checkout powered by Brrrgrrr
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;