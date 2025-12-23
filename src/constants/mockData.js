export const MOCK_USERS = [
    {
        _id: "user_1",
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user"
    },
    {
        _id: "admin_1",
        name: "Admin User",
        email: "admin@brrr.com",
        password: "adminpassword",
        role: "admin"
    }
];

export const MOCK_PRODUCTS = [
    {
        _id: "prod_1",
        name: "Maharaja Chicken Mac",
        description: "Double layer of flame-grilled chicken patties, rich habanero sauce, and cheddar cheese.",
        price: 249,
        category: "chicken",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
        ingredients: ["Chicken Patty", "Cheddar Cheese", "Lettuce", "Jalapenos", "Habanero Sauce"]
    },
    {
        _id: "prod_2",
        name: "Spicy Paneer Wrap Burger",
        description: "Crispy paneer patty topped with spicy tandoori mayo and crunchy onions.",
        price: 189,
        category: "veggie",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
        ingredients: ["Paneer Patty", "Tandoori Mayo", "Onion", "Lettuce"]
    },
    {
        _id: "prod_3",
        name: "Mutton Kebab Burger",
        description: "Juicy mutton kebab patty with mint chutney and caramelized onions.",
        price: 299,
        category: "mutton",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000&auto=format&fit=crop",
        ingredients: ["Mutton Patty", "Mint Chutney", "Caramelized Onions", "Tomato"]
    },
    {
        _id: "prod_4",
        name: "Aloo Tikki Supreme",
        description: "Classic Indian potato patty with sweet and spicy sauces, topped with fresh veggies.",
        price: 99,
        category: "veggie",
        image: "https://images.unsplash.com/photo-1615557960916-5f4791effe9d?q=80&w=1000&auto=format&fit=crop",
        ingredients: ["Aloo Tikki", "Sweet Onion Sauce", "Tomato", "Onion"]
    },
    {
        _id: "prod_5",
        name: "Crispy Chicken Zinger",
        description: "Crunchy fried chicken fillet with spicy mayo and fresh lettuce.",
        price: 219,
        category: "chicken",
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1000&auto=format&fit=crop",
        ingredients: ["Fried Chicken Fillet", "Spicy Mayo", "Lettuce"]
    }
];

export const MOCK_INGREDIENTS = [
    { _id: "ing_1", name: "Chicken Patty", price: 60, category: "protein" },
    { _id: "ing_2", name: "Mutton Patty", price: 90, category: "protein" },
    { _id: "ing_3", name: "Aloo Tikki", price: 30, category: "protein" },
    { _id: "ing_4", name: "Paneer Patty", price: 50, category: "protein" },
    { _id: "ing_5", name: "Cheddar Cheese", price: 20, category: "cheese" },
    { _id: "ing_6", name: "Tandoori Mayo", price: 15, category: "sauce" },
    { _id: "ing_7", name: "Mint Chutney", price: 10, category: "sauce" },
    { _id: "ing_8", name: "Fried Egg", price: 15, category: "addon" },
    { _id: "ing_9", name: "Lettuce", price: 10, category: "veggie" },
    { _id: "ing_10", name: "Tomato", price: 10, category: "veggie" },
    { _id: "ing_11", name: "Onion", price: 5, category: "veggie" }
];

export const MOCK_POSTS = [
    {
        _id: "post_1",
        title: "The Secret to Our Tandoori Sauce",
        excerpt: "How we blend 12 spices to create the perfect Indian burger glaze.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        author: "Chef Kapoor",
        createdAt: "2023-11-15T10:00:00Z",
        image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        _id: "post_2",
        title: "Why Aloo Tikki is a Classic",
        excerpt: "The history of the humble potato patty and its rise to burger fame.",
        content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        author: "Priya Singh",
        createdAt: "2023-11-20T14:30:00Z",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop"
    }
];
