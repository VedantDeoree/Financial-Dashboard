import express from 'express';
import Transaction from '../models/Transaction';

const router = express.Router();

// GET /api/transactions
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, sort = 'date', order = 'desc', ...filters } = req.query;
    const query: any = {};
    // Filtering
    if (filters.category) query.category = filters.category;
    if (filters.status) query.status = filters.status;
    if (filters.user_id) query.user_id = filters.user_id;
    if (filters.date) query.date = filters.date;
    // Add more filters as needed

    // Sorting
    const sortObj: any = {};
    sortObj[sort as string] = order === 'asc' ? 1 : -1;

    const transactions = await Transaction.find(query)
      .sort(sortObj)
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const total = await Transaction.countDocuments(query);
    res.json({ data: transactions, total });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 