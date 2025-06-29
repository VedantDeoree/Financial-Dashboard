import express, { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

// GET /api/analytics/summary
router.get('/summary', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({});
    let totalRevenue = 0;
    let totalExpense = 0;
    const categoryBreakdown: Record<string, number> = {};
    const monthlyTrend: Record<string, { revenue: number; expense: number }> = {};

    transactions.forEach(tx => {
      const month = tx.date.slice(0, 7); // YYYY-MM
      if (!monthlyTrend[month]) monthlyTrend[month] = { revenue: 0, expense: 0 };
      if (tx.category.toLowerCase() === 'revenue') {
        totalRevenue += tx.amount;
        monthlyTrend[month].revenue += tx.amount;
      } else if (tx.category.toLowerCase() === 'expense') {
        totalExpense += tx.amount;
        monthlyTrend[month].expense += tx.amount;
      }
      // Category breakdown
      if (!categoryBreakdown[tx.category]) categoryBreakdown[tx.category] = 0;
      categoryBreakdown[tx.category] += tx.amount;
    });

    res.json({
      totalRevenue,
      totalExpense,
      net: totalRevenue - totalExpense,
      categoryBreakdown,
      monthlyTrend
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router; 