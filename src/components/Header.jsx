import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { ShoppingCart, LogOut, Menu, X, UtensilsCrossed } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'nav-item active' : 'nav-item inactive';
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={isActive(to)}
      onClick={() => setIsMenuOpen(false)}
    >
      {/* Mobile styling in CSS handles active/inactive via generic class if needed, or reuses nav-item */}
      {children}
    </Link>
  );

  return (
    <header className="header-nav">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
            <div className="nav-logo-icon">
              <UtensilsCrossed size={20} absoluteStrokeWidth />
            </div>
            <span className="nav-logo-text">
              Brrrgrrr<span className="text-brand">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/build">Build Burger</NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="nav-actions">
            <Link to="/cart" className="cart-link">
              <ShoppingCart size={22} strokeWidth={2} />
              {cartItems.length > 0 && (
                <span className="cart-badge">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="user-actions">
                <Link to="/orders" className="nav-text-link">
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="nav-text-link">
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <div className="user-avatar">
                    {user.name.charAt(0)}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-logout"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="user-actions">
                <Link to="/login" className="btn-login-nav">
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/build">Build Burger</NavLink>

            <hr className="mobile-divider" />
            <Link to="/cart" className="nav-item inactive mobile-link-cart" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart size={18} /> Cart ({cartItems.length})
            </Link>

            {user ? (
              <>
                <NavLink to="/orders">Orders</NavLink>
                {user.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
                <button
                  onClick={handleLogout}
                  className="mobile-logout-btn"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mobile-login-btn"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;