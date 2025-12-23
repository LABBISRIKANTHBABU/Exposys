import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Post from './models/Post.js';

dotenv.config();
connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456'
  }
];

const products = [
  {
    name: 'Classic Burger',
    description: 'Our signature beef burger with fresh vegetables',
    ingredients: ['beef patty', 'lettuce', 'tomato', 'onion', 'pickles', 'cheese'],
    basePrice: 8.99,
    image: '/images/classic-burger.jpg'
  },
  {
    name: 'Veggie Burger',
    description: 'Delicious plant-based burger with fresh vegetables',
    ingredients: ['veggie patty', 'lettuce', 'tomato', 'onion', 'avocado', 'sprouts'],
    basePrice: 7.99,
    image: '/images/veggie-burger.jpg'
  },
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Custom Burger Base',
    description: 'A blank canvas for your culinary creativity. Built by you, for you.',
    ingredients: ['bun'],
    basePrice: 5.00,
    image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
  }
];

const posts = [
  {
    title: 'Welcome to Brrrgrrr!',
    content: 'We are excited to launch our new burger ordering platform. Customize your perfect burger and enjoy it fresh!',
    image: '/images/welcome-post.jpg',
    category: 'Announcements'
  },
  {
    title: 'New Seasonal Burger',
    content: 'Try our new seasonal burger featuring locally sourced ingredients and a special sauce recipe.',
    image: '/images/seasonal-burger.jpg',
    category: 'Menu Updates'
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Post.deleteMany();

    // Insert users (using create to trigger pre-save hook for hashing)
    for (const user of users) {
      await User.create(user);
    }

    // Fetch the created admin user if needed, but we don't strictly need the ID for products/posts as they are independent or hardcoded
    const adminUser = await User.findOne({ email: 'admin@example.com' });

    // Insert products
    await Product.insertMany(products);

    // Insert posts
    await Post.insertMany(posts);

    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Post.deleteMany();

    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}