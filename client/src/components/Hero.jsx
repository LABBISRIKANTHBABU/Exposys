import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChefHat, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden mb-24 pt-10 md:pt-16">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50 rounded-full blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100 rounded-full blur-3xl opacity-40 transform -translate-x-1/2 translate-y-1/4"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-700 font-medium text-sm mb-6 shadow-sm">
              <Sparkles size={16} className="text-brand-500" />
              <span>Voted #1 Burger in Town</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-neutral-900 leading-[1.1] mb-6 tracking-tight">
              One Bite, <br />
              <span className="text-gradient">Pure Delight.</span>
            </h1>

            <p className="text-lg lg:text-xl text-neutral-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Craft your own masterpiece with premium, locally sourced ingredients. 100% fresh beef, artisan buns, and house-made sauces.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/build"
                className="btn btn-primary w-full sm:w-auto h-14 px-8 text-lg group"
              >
                <span>Build Your Burger</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/menu"
                className="btn btn-secondary w-full sm:w-auto h-14 px-8 text-lg"
              >
                View Full Menu
              </Link>
            </div>

            {/* Mini Trust Signals */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 border-t border-neutral-200 pt-8">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex text-yellow-500 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm font-medium text-neutral-600">5k+ Reviews</span>
              </div>
              <div className="w-px h-10 bg-neutral-200"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-lg font-bold text-neutral-900 font-heading">30min</span>
                <span className="text-sm font-medium text-neutral-600">Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="lg:w-1/2 relative animate-fade-in delay-100">
            <div className="relative z-10 animate-float">
              {/* Replace with actual image later, currently using a CSS composition */}
              <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-orange-400 rounded-full opacity-10 blur-xl"></div>
                {/* Centered "Burger" representation using icons for now since I can't generate an image yet */}
                <div className="w-full h-full bg-white rounded-[2.5rem] shadow-2xl shadow-brand-900/10 flex items-center justify-center border-8 border-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-50 opacity-50"></div>
                  <div className="text-[10rem] md:text-[15rem] leading-none select-none relative z-10 transform hover:scale-110 transition-transform duration-500 cursor-default" role="img" aria-label="Giant Burger">
                    🍔
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute bottom-8 right-8 bg-white p-4 rounded-2xl shadow-layered animate-bounce border border-neutral-100 max-w-[160px]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30 text-brand-200 fill-current animate-spin-slow">
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