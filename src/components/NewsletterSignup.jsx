import React, { useState } from 'react';
import './NewsletterSignup.css';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // In a real app, you would send this to your backend
    console.log('Subscribing email:', email);

    setSubmitted(true);
    setEmail('');
    setError('');

    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="newsletter-container">
      {!submitted && (
        <div className="newsletter-header">
          <h3 className="newsletter-title">Stay Updated</h3>
          <p className="newsletter-desc">Subscribe to our newsletter for the latest burger recipes and offers</p>
        </div>
      )}

      {submitted ? (
        <div className="success-message">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Subscribed successfully!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            {error && <p className="error-msg">{error}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary newsletter-btn"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;