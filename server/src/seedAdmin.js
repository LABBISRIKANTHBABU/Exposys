import mongoose from 'mongoose';
import User from './models/User.js';

// Hardcoded URI to ensure it connects regardless of .env issues in this script context
const MONGO_URI = 'mongodb://localhost:27017/brrrgrrr';

const seedAdmin = async () => {
    try {
        console.log('Connecting to MongoDB at:', MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected successfully.');

        const adminEmail = 'admin@example.com';
        const adminPassword = 'admin123';

        let user = await User.findOne({ email: adminEmail });

        if (user) {
            console.log('User found. Updating permissions to ADMIN...');
            user.role = 'admin';
            user.name = 'Admin User';
            // Force update password. 
            // Note: If the User model has a pre-save hook that hashes passwords, 
            // this plain text assignment will be hashed when we save.
            // If we are unsure, we can assume the schema handles it (which it usually does in MERN stacks).
            user.password = adminPassword;
            await user.save();
            console.log('Existing user upgraded to ADMIN.');
        } else {
            console.log('Creating new ADMIN user...');
            user = await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
                address: {
                    street: 'Admin HQ',
                    city: 'Cyber City',
                    state: 'Tech State',
                    zip: '101010',
                    country: 'India'
                }
            });
            console.log('New Admin user created.');
        }

        console.log('Use these credentials:');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
