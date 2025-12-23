import React from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCart } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import BuildBurger from './pages/BuildBurger';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

import OrderSuccess from './pages/OrderSuccess';

import './App.css';

function AppContent() {
  const { notifications, removeNotification } = useCart();

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="container mx-auto p-4 mt-4 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/build" element={<BuildBurger />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />


        </Routes>
      </main>
      <Footer />

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
            timeout={notification.timeout || 5000}
            showProgress={notification.showProgress !== undefined ? notification.showProgress : true}
          />
        ))}
      </div>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-100 flex flex-col">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;