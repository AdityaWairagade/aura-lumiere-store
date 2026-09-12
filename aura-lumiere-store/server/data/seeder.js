import dotenv from 'dotenv';
import colors from 'colors';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import { sampleProducts } from './sampleProducts.js';

dotenv.config();
connectDB();

const adminUser = {
  name: 'Admin',
  email: 'admin@auralumiere.com',
  password: 'Admin@123456',
  role: 'admin',
};

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdAdmin = await User.create(adminUser);
    console.log('Admin user created'.green);

    const products = sampleProducts.map((p) => ({ ...p }));
    await Product.insertMany(products);
    console.log(`${products.length} products seeded`.green);

    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
