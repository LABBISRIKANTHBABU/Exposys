// Helper to get all ingredients
export const getIngredientsByCategory = (category) => {
    return INGREDIENT_STOCK.filter(item => item.category === category);
};

export const getIngredientById = (id) => {
    return INGREDIENT_STOCK.find(item => item.id === id);
};

export const calculateTotalPrice = (ingredientIds) => {
    return ingredientIds.reduce((total, id) => {
        const ingredient = getIngredientById(id);
        return total + (ingredient ? ingredient.price : 0);
    }, 0);
};

export const INDIAN_BURGERS = [
    {
        id: 'b1',
        name: 'Maharaja Mac',
        price: 189,
        description: 'The King of Burgers! Double patty of flame-grilled corn and cheese with rich jalapeno sauce.',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png', // Placeholder
        ingredients: ['Bun Bottom', 'Lettuce', 'Cheese', 'Corn Patty', 'Jalapeno Sauce', 'Bun Middle', 'Corn Patty', 'Onion', 'Bun Top']
    },
    {
        id: 'b2',
        name: 'Aloo Tikki Supreme',
        price: 99,
        description: 'A classic Indian favorite. Crispy golden potato patty topped with special veg sauce and onions.',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
        ingredients: ['Bun Bottom', 'Mayo', 'Aloo Tikki', 'Tomato', 'Onion', 'Bun Top']
    },
    // ... kept for compatibility if needed, but not used in new builder directly
];

export const INGREDIENT_STOCK = [
    // BUNS
    { id: 'sesame-bun', name: 'Sesame Bun', price: 20, category: 'bun', emoji: '🍞', color: '#F59E0B' },
    { id: 'brioche-bun', name: 'Brioche Bun', price: 30, category: 'bun', emoji: '🥯', color: '#FCD34D' },

    // PROTEINS
    { id: 'meat-patty', name: 'Meat Patty', price: 50, category: 'protein', emoji: '🥩', color: '#78350F' },
    { id: 'chicken-patty', name: 'Chicken Patty', price: 45, category: 'protein', emoji: '🍗', color: '#D97706' },
    { id: 'veg-patty', name: 'Veg Patty', price: 40, category: 'protein', emoji: '🥦', color: '#059669' },

    // CHEESE
    { id: 'cheddar', name: 'Cheddar', price: 15, category: 'cheese', emoji: '🧀', color: '#FBBF24' },
    { id: 'swiss', name: 'Swiss', price: 20, category: 'cheese', emoji: '🧀', color: '#FEF3C7' },

    // VEGGIES
    { id: 'lettuce', name: 'Lettuce', price: 5, category: 'veggie', emoji: '🥬', color: '#10B981' },
    { id: 'tomato', name: 'Tomato', price: 5, category: 'veggie', emoji: '🍅', color: '#EF4444' },
    { id: 'onion', name: 'Onion', price: 5, category: 'veggie', emoji: '🧅', color: '#E5E7EB' },
    { id: 'pickles', name: 'Pickles', price: 5, category: 'veggie', emoji: '🥒', color: '#047857' },

    // SAUCES
    { id: 'ketchup', name: 'Ketchup', price: 0, category: 'sauce', emoji: '🍅', color: '#DC2626' },
    { id: 'mayo', name: 'Mayo', price: 0, category: 'sauce', emoji: '🥚', color: '#FFFBEB' },
    { id: 'bbq', name: 'BBQ Sauce', price: 5, category: 'sauce', emoji: '🔥', color: '#7F1D1D' },
];
