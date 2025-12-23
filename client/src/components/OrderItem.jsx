import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div className="card mb-4">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <div>
            <h3 className="text-lg font-bold">Order #{order._id?.substring(0, 8)}</h3>
            <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="mt-2 md:mt-0">
            <span className={`badge ${
              order.status === 'completed' ? 'badge-success' : 
              order.status === 'pending' ? 'badge-warning' : 
              'badge-info'
            }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Items:</h4>
          <ul className="space-y-2">
            {order.items.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.product.name} {item.ingredients.length > 0 && `(${item.ingredients.join(', ')})`} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="font-bold">Total:</span>
          <span className="text-lg font-bold text-orange-600">${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;