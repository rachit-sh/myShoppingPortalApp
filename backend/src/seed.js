import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

import mongoose from 'mongoose';
import { Product } from './models/product.model.js';

const sampleProducts = [
  {
    name: 'Electric Blender Pro',
    price: 89.99,
    description: 'High-speed blender with multiple presets for smoothies and soups.',
    category: 'Kitchen Appliances',
    stock: 25,
    imageUrl: 'https://via.placeholder.com/300x200?text=Blender+Pro',
  },
  {
    name: 'Noise Cancelling Headphones',
    price: 199.50,
    description: 'Over-ear headphones with premium sound quality and long battery life.',
    category: 'Electronics',
    stock: 15,
    imageUrl: 'https://via.placeholder.com/300x200?text=Headphones',
  },
  {
    name: 'Ergonomic Office Chair',
    price: 349.00,
    description: 'Fully adjustable chair designed for all-day comfort and support.',
    category: 'Furniture',
    stock: 10,
    imageUrl: 'https://via.placeholder.com/300x200?text=Office+Chair',
  },
  {
    name: '4K Smart TV 55"',
    price: 650.99,
    description: 'Stunning 4K resolution with built-in streaming apps.',
    category: 'Electronics',
    stock: 8,
    imageUrl: 'https://via.placeholder.com/300x200?text=Smart+TV',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log('Database connection successful for seeding.');

    // 1. CLEAR EXISTING DATA
    await Product.deleteMany({});
    console.log('Existing products cleared.');

    // 2. INSERT SAMPLE DATA
    await Product.insertMany(sampleProducts);
    console.log('Database seeded successfully with 4 products!');
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  } finally {
    // 3. CLOSE CONNECTION
    await mongoose.connection.close();
  }
};

seedDB();
// To run this script, open terminal in backend and use the command: node src/seed.js
