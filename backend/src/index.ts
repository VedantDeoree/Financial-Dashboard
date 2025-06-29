import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import transactionRouter from './routes/transaction';
import authRouter from './routes/auth';
import exportRouter from './routes/export';
import analyticsRouter from './routes/analytics';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Financial Analytics Dashboard Backend');
});

app.use('/api/transactions', transactionRouter);
app.use('/api/auth', authRouter);
app.use('/api/export', exportRouter);
app.use('/api/analytics', analyticsRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 