import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { ordersAPI } from '../services/api';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Address, 2: Payment

  // Address State
  const [address, setAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zip: user?.address?.zip || '',
    country: 'India'
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map(item => ({
          product: item.product._id,
          name: item.product.name,
          ingredients: item.ingredients,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: getTotalPrice() + 40 + (getTotalPrice() * 0.05), // Includes delivery + tax
        deliveryAddress: address,
        paymentMethod: paymentMethod
      };

      const res = await ordersAPI.create(orderData);
      clearCart();
      // Navigate to success page with order ID
      navigate('/order-success', { state: { orderId: res.data._id } });
    } catch (err) {
      console.error("Order failed", err);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <div className="text-center py-20">Your cart is empty.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${step >= 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className="h-1 w-12 bg-gray-200">
              <div className={`h-full bg-orange-600 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${step >= 2 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          </div>
          <div className="flex justify-center space-x-12 mt-2 text-sm font-medium text-gray-600">
            <span>Address</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {step === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    placeholder="Flat No, Building, Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">ZIP / Postal Code</label>
                  <input
                    type="text"
                    value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    placeholder="123456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={address.country}
                    disabled
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!address.street || !address.city || !address.zip}
                  className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

              <div className="space-y-4 mb-8">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 text-orange-600" />
                  <span className="ml-4 font-bold flex-1">Credit / Debit Card</span>
                  <span className="text-2xl">💳</span>
                </label>

                {paymentMethod === 'card' && (
                  <div className="pl-9 pr-4 py-4 animate-fadeIn">
                    <input type="text" placeholder="Card Number" className="w-full mb-3 px-4 py-2 border rounded-lg" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border rounded-lg" />
                      <input type="text" placeholder="CVV" className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                  </div>
                )}

                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-5 h-5 text-orange-600" />
                  <span className="ml-4 font-bold flex-1">UPI (GPay / PhonePe)</span>
                  <span className="text-2xl">📱</span>
                </label>

                {paymentMethod === 'upi' && (
                  <div className="pl-9 pr-4 py-4 animate-fadeIn">
                    <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                )}

                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-5 h-5 text-orange-600" />
                  <span className="ml-4 font-bold flex-1">Cash on Delivery</span>
                  <span className="text-2xl">💵</span>
                </label>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <div className="flex justify-between mb-2"><span>Subtotal</span><span>₹{getTotalPrice().toFixed(2)}</span></div>
                <div className="flex justify-between mb-2"><span>Delivery</span><span>₹40.00</span></div>
                <div className="flex justify-between mb-2"><span>Tax (5%)</span><span>₹{(getTotalPrice() * 0.05).toFixed(2)}</span></div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg text-orange-600">
                  <span>Total to Pay</span>
                  <span>₹{(getTotalPrice() + 40 + (getTotalPrice() * 0.05)).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-600 font-bold hover:text-gray-800"
                >
                  &larr; Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Processing...' : `Place Order`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;