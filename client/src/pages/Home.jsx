import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { INDIAN_BURGERS } from '../constants/burgerData';

const Home = () => {
  const featuredBurgers = INDIAN_BURGERS.slice(0, 3);

  return (
    <div className="bg-neutral-50 min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-orange-600 text-white py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
              Taste the <span className="text-yellow-300">Indian Soul</span> in every Bite
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover Brrrgrrr's exclusive line of fusion burgers, crafted with authentic spices and premium ingredients.
            </p>
            <div className="flex gap-4">
              <Link to="/menu" className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition">
                View Menu
              </Link>
              <Link to="/build" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">
                Build Your Own
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
            <div className="w-80 h-80 bg-yellow-400 rounded-full blur-3xl absolute opacity-50 animate-pulse"></div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
              alt="Giant Burger"
              className="w-96 relative z-10 animate-float drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">Why Brrrgrrr?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌶️', title: 'Authentic Spices', desc: 'Hand-ground masalas in every patty.' },
              { icon: '🥬', title: 'Farm Fresh', desc: 'Vegetables sourced daily from local farms.' },
              { icon: '🔥', title: 'Flame Grilled', desc: 'Signature smoky flavor in every bite.' }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-orange-50 hover:bg-orange-100 transition cursor-default">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Sellers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Crowd Favorites</h2>
              <p className="text-gray-500">The most loved burgers this week</p>
            </div>
            <Link to="/menu" className="text-orange-600 font-bold hover:underline">See All &rarr;</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBurgers.map(burger => (
              <div key={burger.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden group">
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                  <span className="text-6xl group-hover:scale-110 transition">🍔</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{burger.name}</h3>
                  <span className="text-orange-600 font-bold block mb-3">₹{burger.price}</span>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{burger.description}</p>
                  <Link to="/build" className="block w-full text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition">
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