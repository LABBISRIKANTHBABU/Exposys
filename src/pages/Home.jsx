import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { MOCK_PRODUCTS } from '../constants/mockData'; // Use consistent mock data
import './Home.css';

const Home = () => {
  // Use first 3 products as featured
  const featuredBurgers = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="home-container">

      {/* Use the Refactored Hero Component */}
      <Hero />

      {/* Why Choose Us Section */}
      <section className="home-section bg-white">
        <div className="section-container text-center">
          <h2 className="section-title">Why Brrrgrrr?</h2>
          <div className="features-grid">
            {[
              { icon: '🌶️', title: 'Authentic Spices', desc: 'Hand-ground masalas in every patty.' },
              { icon: '🥬', title: 'Farm Fresh', desc: 'Vegetables sourced daily from local farms.' },
              { icon: '🔥', title: 'Flame Grilled', desc: 'Signature smoky flavor in every bite.' }
            ].map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Sellers Section */}
      <section className="home-section">
        <div className="section-container">
          <div className="section-header-row">
            <div className="section-heading-left">
              <h2>Crowd Favorites</h2>
              <p>The most loved burgers this week</p>
            </div>
            <Link to="/menu" className="see-all-link">See All &rarr;</Link>
          </div>

          <div className="products-grid">
            {featuredBurgers.map(burger => (
              <div key={burger._id} className="home-product-card group">
                <div className="product-image-area">
                  <span className="product-emoji-lg">🍔</span>
                </div>
                <div className="product-info-area">
                  <h3 className="product-name">{burger.name}</h3>
                  <span className="product-price">₹{burger.price}</span>
                  <p className="product-desc-short">{burger.description}</p>
                  <Link to="/build" className="btn-order">
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;