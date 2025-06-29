import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Transaction from '../src/models/Transaction';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || '';
const DATA_PATH = path.resolve(__dirname, '../../../transactions.json');

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed(); 