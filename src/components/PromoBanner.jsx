import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const PromoBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-brand-600 shadow-glow mb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 p-10 md:p-16 text-center text-white">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-sm mb-6">
          <Sparkles size={16} />
          <span>Limited Time Offer</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6 leading-tight">
          Get 20% Off Your First Order!
        </h2>

        <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join the Brrrgrrr family today and experience the taste of perfection. Sign up now to claim your exclusive discount.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login" className="btn bg-white text-brand-600 hover:bg-brand-50 hover:text-brand-700 shadow-lg px-8 py-4 text-lg">
            Sign Up Now
          </Link>
          <Link to="/build" className="btn bg-brand-700 text-white border border-brand-500 hover:bg-brand-800 px-8 py-4 text-lg">
            Build Your Burger
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;