import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.state?.orderId || 'Unknown';

    useEffect(() => {
        // Redirect if accessed directly without state
        if (!location.state?.orderId) {
            const timer = setTimeout(() => navigate('/'), 5000);
            return () => clearTimeout(timer);
        }
    }, [navigate, location]);

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all hover:scale-105 duration-300">
                <div className="mb-6 flex justify-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
                    Order Confirmed!
                </h1>

                <p className="text-gray-500 mb-8">
                    Thank you for your order. We're firing up the grill!
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-8 border border-gray-100">
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">
                        Order ID
                    </p>
                    <p className="text-xl font-mono text-gray-800 font-bold select-all">
                        {orderId}
                    </p>
                </div>

                <div className="space-y-3">
                    <Link
                        to="/orders"
                        className="block w-full py-3 px-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg"
                    >
                        Track Order
                    </Link>
                    <Link
                        to="/"
                        className="block w-full py-3 px-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
