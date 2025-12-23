import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Lock, Mail, User, AlertCircle, Loader2 } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to authenticate');
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon-wrapper">
              <Lock size={32} strokeWidth={2.5} />
            </div>
            <h2 className="auth-title">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="auth-subtitle">
              {isLogin ? 'Or' : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="auth-toggle-btn"
              >
                {isLogin ? 'create a new account' : 'sign in to your account'}
              </button>
            </p>
          </div>

          {error && (
            <div className="auth-error text-center mb-6">
              <AlertCircle size={20} className="error-icon" />
              <span>{error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <div className="auth-input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="auth-input"
                    placeholder="Full Name"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <div className="auth-input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="auth-input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary auth-submit-btn"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <div className="auth-divider">
            <div className="divider-line"></div>
            <span className="divider-text">Test Credentials</span>
          </div>

          <div className="test-creds-grid">
            <button
              type="button"
              onClick={() => {
                setEmail('admin@brrr.com');
                setPassword('adminpassword'); // Updated to match mockData.js
                setIsLogin(true);
              }}
              className="test-cred-btn"
            >
              <Lock size={16} className="mb-1 text-orange-600" />
              Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('john@example.com');
                setPassword('password123'); // Updated to match mockData.js
                setIsLogin(true);
              }}
              className="test-cred-btn"
            >
              <User size={16} className="mb-1 text-orange-600" />
              User
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;