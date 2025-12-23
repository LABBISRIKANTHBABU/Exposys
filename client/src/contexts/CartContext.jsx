import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load cart from localStorage on initial load
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);

    // Auto remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const addToCart = (product, ingredients = [], quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product._id === product._id &&
          JSON.stringify(item.ingredients) === JSON.stringify(ingredients)
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        addNotification(`${product.name} quantity updated in cart`, 'success');
        return updatedItems;
      } else {
        addNotification(`${product.name} added to cart`, 'success');
        return [
          ...prevItems,
          {
            product,
            ingredients,
            quantity,
            price: (product.price !== undefined ? product.price : product.basePrice) || 0
          }
        ];
      }
    });
  };

  const removeFromCart = (itemId) => {
    const itemName = cartItems[itemId]?.product?.name || 'Item';
    setCartItems(prevItems => prevItems.filter((_, index) => index !== itemId));
    addNotification(`${itemName} removed from cart`, 'info');
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[itemId].quantity = quantity;
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    addNotification('Cart cleared', 'info');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const p = Number(item.price) || 0;
      const q = Number(item.quantity) || 1;
      return total + (p * q);
    }, 0);
  };

  const value = {
    cartItems,
    notifications,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    addNotification,
    removeNotification
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};