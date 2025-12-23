import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import CustomizationPopup from '../components/CustomizationPopup';
import { useCart } from '../contexts/CartContext';
import './Menu.css';

const Menu = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [filter, setFilter] = useState('all');
    const [selectedBurger, setSelectedBurger] = useState(null);
    const [burgers, setBurgers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBurgers = async () => {
            try {
                // Use the mock API instead of static import
                const response = await productsAPI.getAll();
                setBurgers(response.data);
            } catch (error) {
                console.error("Failed to load menu", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBurgers();
    }, []);

    const filteredBurgers = filter === 'all'
        ? burgers
        : burgers.filter(b => (b.category || '').toLowerCase() === filter || b.name.toLowerCase().includes(filter));

    const handleOrderClick = (burger) => {
        setSelectedBurger(burger);
    };

    const handleCustomize = () => {
        navigate('/build', { state: { template: selectedBurger } });
        setSelectedBurger(null);
    };

    const handleOrderDirectly = () => {
        // Construct ingredients array from simple string array in Mock Data
        // Ideally Mock Data ingredients should be objects, but to match legacy logic:
        const ingredients = (selectedBurger.ingredients || []).map(name => ({
            name,
            price: 0,
            _id: `ing_${Math.random()}` // Dummy ID for logic compatibility
        }));

        addToCart(selectedBurger, ingredients, 1);
        setSelectedBurger(null);
        navigate('/cart');
    };

    if (loading) {
        return (
            <div className="menu-page">
                <div className="container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
                    <p>Loading Menu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="menu-page">
            <CustomizationPopup
                isOpen={!!selectedBurger}
                onClose={() => setSelectedBurger(null)}
                onCustomize={handleCustomize}
                onOrderDirectly={handleOrderDirectly}
                burgerName={selectedBurger?.name}
            />

            <div className="container">

                <div className="menu-header">
                    <h1 className="menu-title">Our Premium Menu</h1>
                    <p className="menu-subtitle">
                        Experience the fusion of authentic flavors with classic burger craftsmanship.
                    </p>
                </div>

                {/* Filter Tabs - Categories match mockData.js somewhat */}
                <div className="filters-container">
                    {['all', 'chicken', 'mutton', 'veggie'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="menu-grid">
                    {filteredBurgers.map(burger => (
                        <div key={burger._id} className="menu-card decoration-none">
                            <div className="menu-card-image">
                                <div className="menu-emoji">🍔</div>
                                <div className="menu-price-tag">
                                    ₹{burger.price}
                                </div>
                            </div>

                            <div className="menu-card-content">
                                <h3 className="menu-card-title">{burger.name}</h3>
                                <p className="menu-card-desc">{burger.description}</p>

                                <div className="menu-tags">
                                    {burger.ingredients && burger.ingredients.slice(0, 3).map((ing, i) => (
                                        <span key={i} className="menu-tag">{ing}</span>
                                    ))}
                                    {burger.ingredients && burger.ingredients.length > 3 && (
                                        <span className="menu-tag">+{burger.ingredients.length - 3} more</span>
                                    )}
                                </div>

                                <div className="menu-actions">
                                    <button
                                        onClick={() => navigate('/build', { state: { template: burger } })}
                                        className="btn-menu-customize"
                                    >
                                        Customize
                                    </button>
                                    <button
                                        onClick={() => handleOrderClick(burger)}
                                        className="btn-menu-order"
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
