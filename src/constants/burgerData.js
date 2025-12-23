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

// Deprecated for Menu display (used MockData instead), but kept for reference
export const INDIAN_BURGERS = [
    {
        id: 'b1',
        name: 'Maharaja Mac',
        price: 249,
        description: 'The King of Burgers! Double patty of flame-grilled chicken with rich habanero sauce.',
        image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
        ingredients: ['sesame-bun', 'lettuce', 'cheddar', 'chicken-patty', 'jalapeno', 'sesame-bun', 'chicken-patty', 'onion', 'sesame-bun']
    }
];

export const INGREDIENT_STOCK = [
    // BUNS
    { id: 'sesame-bun', name: 'Sesame Bun', price: 40, category: 'bun', emoji: '🍞', color: '#F59E0B' },
    { id: 'brioche-bun', name: 'Brioche Bun', price: 60, category: 'bun', emoji: '🥯', color: '#FCD34D' },

    // PROTEINS
    { id: 'chicken-patty', name: 'Chicken Patty', price: 60, category: 'protein', emoji: '🍗', color: '#D97706' },
    { id: 'mutton-patty', name: 'Mutton Patty', price: 90, category: 'protein', emoji: '�', color: '#78350F' },
    { id: 'aloo-tikki', name: 'Aloo Tikki', price: 30, category: 'protein', emoji: '🥔', color: '#D4A373' },
    { id: 'paneer-patty', name: 'Paneer Patty', price: 50, category: 'protein', emoji: '�', color: '#FEF3C7' },

    // CHEESE
    { id: 'cheddar', name: 'Cheddar', price: 20, category: 'cheese', emoji: '🧀', color: '#FBBF24' },
    { id: 'swiss', name: 'Swiss', price: 25, category: 'cheese', emoji: '🧀', color: '#FEF3C7' },

    // VEGGIES
    { id: 'lettuce', name: 'Lettuce', price: 10, category: 'veggie', emoji: '🥬', color: '#10B981' },
    { id: 'tomato', name: 'Tomato', price: 10, category: 'veggie', emoji: '🍅', color: '#EF4444' },
    { id: 'onion', name: 'Onion', price: 5, category: 'veggie', emoji: '🧅', color: '#E5E7EB' },
    { id: 'jalapeno', name: 'Jalapeno', price: 15, category: 'veggie', emoji: '🌶️', color: '#047857' },

    // SAUCES
    { id: 'ketchup', name: 'Ketchup', price: 0, category: 'sauce', emoji: '🍅', color: '#DC2626' },
    { id: 'mayo', name: 'Mayo', price: 0, category: 'sauce', emoji: '🥚', color: '#FFFBEB' },
    { id: 'tandoori-mayo', name: 'Tandoori Mayo', price: 15, category: 'sauce', emoji: '🔥', color: '#C2410C' },
    { id: 'mint-chutney', name: 'Mint Chutney', price: 10, category: 'sauce', emoji: '🌿', color: '#15803D' },
];
