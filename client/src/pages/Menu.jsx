import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INDIAN_BURGERS } from '../constants/burgerData';
import CustomizationPopup from '../components/CustomizationPopup';
import { useCart } from '../contexts/CartContext';

const Menu = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [filter, setFilter] = useState('all');
    const [selectedBurger, setSelectedBurger] = useState(null);

    const filteredBurgers = filter === 'all'
        ? INDIAN_BURGERS
        : INDIAN_BURGERS.filter(b => b.name.toLowerCase().includes(filter));

    const handleOrderClick = (burger) => {
        setSelectedBurger(burger);
    };

    const handleCustomize = () => {
        // Navigate to build with pre-selected burger context
        navigate('/build', { state: { template: selectedBurger } });
        setSelectedBurger(null);
    };

    const handleOrderDirectly = () => {
        // Default ingredients from the preset
        const defaultIngredients = selectedBurger.ingredients.map(name => ({
            name,
            type: 'preset', // Simplified
            price: 0
        }));

        // Since our addToCart expects structured objects, we'll simplify for now
        // Ideally we map these names to STOCK items, but for "Preset" we can just pass names
        // But Cart expects {name, price...} or just strings?
        // Let's check Cart.jsx: it uses `item.ingredients` which seems to be [] of strings in some places
        // The current BuildBurger saves names. Let's send names.

        addToCart(selectedBurger, selectedBurger.ingredients, 1);
        setSelectedBurger(null);
        navigate('/cart');
    };

    return (
        <div className="bg-neutral-50 min-h-screen py-12">
            <CustomizationPopup
                isOpen={!!selectedBurger}
                onClose={() => setSelectedBurger(null)}
                onCustomize={handleCustomize}
                onOrderDirectly={handleOrderDirectly}
                burgerName={selectedBurger?.name}
            />

            <div className="container mx-auto px-4">

                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
                        Our Premium Menu
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Experience the fusion of authentic Indian flavors with classic burger craftsmanship.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-10 space-x-4">
                    {['all', 'paneer', 'chicken', 'aloo'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full capitalize font-bold transition ${filter === cat ? 'bg-orange-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBurgers.map(burger => (
                        <div key={burger.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">

                            <div className="relative h-64 overflow-hidden bg-orange-100 flex items-center justify-center">
                                <div className="text-9xl group-hover:scale-110 transition-transform duration-500">🍔</div>

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-orange-600 shadow-sm">
                                    ₹{burger.price}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-600 transition-colors">{burger.name}</h3>
                                <p className="text-gray-500 mb-4 line-clamp-2 h-12">{burger.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {burger.ingredients.slice(0, 3).map((ing, i) => (
                                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{ing}</span>
                                    ))}
                                    {burger.ingredients.length > 3 && (
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">+{burger.ingredients.length - 3} more</span>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate('/build', { state: { template: burger } })}
                                        className="flex-1 border-2 border-orange-600 text-orange-600 font-bold py-2 rounded-xl hover:bg-orange-50 transition"
                                    >
                                        Customize
                                    </button>
                                    <button
                                        onClick={() => handleOrderClick(burger)}
                                        className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-2 rounded-xl shadow-lg hover:shadow-orange-500/30 transition"
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Menu;
