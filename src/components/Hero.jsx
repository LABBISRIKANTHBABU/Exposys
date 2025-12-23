import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChefHat, Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-section">
      {/* Abstract Background Shapes */}
      <div className="hero-bg-container">
        <div className="hero-bg-blob-1"></div>
        <div className="hero-bg-blob-2"></div>
      </div>

      <div className="hero-container">
        <div className="hero-layout">

          {/* Text Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} className="text-brand-500" />
              <span>Voted #1 Burger in Town</span>
            </div>

            <h1 className="hero-title">
              One Bite, <br />
              <span className="text-gradient">Pure Delight.</span>
            </h1>

            <p className="hero-description">
              Craft your own masterpiece with premium, locally sourced ingredients. 100% fresh beef, artisan buns, and house-made sauces.
            </p>

            <div className="hero-actions">
              <Link
                to="/build"
                className="btn btn-primary hero-btn group"
              >
                <span>Build Your Burger</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/menu"
                className="btn btn-secondary hero-btn"
              >
                View Full Menu
              </Link>
            </div>

            {/* Mini Trust Signals */}
            <div className="hero-trust">
              <div className="trust-item">
                <div className="trust-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="trust-label-sm">5k+ Reviews</span>
              </div>
              <div className="trust-separator"></div>
              <div className="trust-item">
                <span className="trust-label-lg">30min</span>
                <span className="trust-label-sm">Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="hero-visual">
            <div className="burger-showcase-container">
              {/* Replace with actual image later, currently using a CSS composition */}
              <div className="burger-placeholder">
                <div className="burger-glow"></div>
                {/* Centered "Burger" representation */}
                <div className="burger-circle">
                  <div className="burger-circle-bg"></div>
                  <div className="burger-emoji" role="img" aria-label="Giant Burger">
                    🍔
                  </div>

                  {/* Floating Badge */}
                  <div className="fresh-badge">
                    <div className="fresh-content">
                      <div className="fresh-icon">
                        <ChefHat size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900 text-sm">Fresh Daily</p>
                        <p className="text-xs text-neutral-500">100% Organic</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background blobs behind image */}
            <div className="bg-pattern">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,87.6,-6.8C85.1,6.8,77.4,19.7,68.4,30.9C59.4,42.1,49.1,51.6,37.6,60.2C26.1,68.8,13.4,76.5,0.3,76C-12.8,75.4,-25.3,66.6,-36.4,57.2C-47.5,47.8,-57.2,37.8,-65.4,26.2C-73.6,14.6,-80.3,1.4,-78.9,-11.1C-77.5,-23.6,-68,-35.4,-57.4,-44.8C-46.8,-54.2,-35.1,-61.2,-22.8,-69.6C-10.5,-78,2.4,-87.8,16.2,-87.1C30,-86.4,45,-75.2,56.6,-63.9L44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;