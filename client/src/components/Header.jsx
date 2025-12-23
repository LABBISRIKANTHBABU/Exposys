import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { ShoppingCart, User, LogOut, Menu, X, UtensilsCrossed } from 'lucide-react';

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
    return location.pathname === path ? 'text-brand-600 bg-brand-50' : 'text-neutral-600 hover:text-brand-600 hover:bg-neutral-50';
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive(to)}`}
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
            <div className="w-10 h-10 bg-brand-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/20 transition-transform group-hover:scale-105 group-hover:rotate-3">
              <UtensilsCrossed size={20} absoluteStrokeWidth />
            </div>
            <span className="text-2xl font-heading font-bold text-neutral-900 tracking-tight">
              Brrrgrrr<span className="text-brand-600">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/build">Build Burger</NavLink>

          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 text-neutral-600 hover:text-brand-600 transition-colors"
            >
              <ShoppingCart size={22} strokeWidth={2} />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-0 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm border border-white">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-neutral-200">
                <Link to="/orders" className="text-sm font-medium text-neutral-600 hover:text-brand-600">
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-medium text-neutral-600 hover:text-brand-600">
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold ring-2 ring-white shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-3 border-l border-neutral-200">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl bg-brand-600 text-white font-medium text-sm shadow-lg shadow-brand-600/25 hover:bg-brand-500 hover:shadow-brand-600/40 hover:-translate-y-0.5 transition-all"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-200 shadow-xl animate-slide-up">
          <div className="p-4 flex flex-col gap-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/build">Build Burger</NavLink>

            <hr className="my-2 border-neutral-100" />
            <NavLink to="/cart">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} /> Cart ({cartItems.length})
              </div>
            </NavLink>
            {user ? (
              <>
                <NavLink to="/orders">Orders</NavLink>
                {user.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center mt-2 px-4 py-2.5 bg-brand-600 text-white rounded-xl font-medium shadow-md"
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