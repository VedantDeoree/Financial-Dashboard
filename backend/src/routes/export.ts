import express, { Request, Response } from 'express';
import * as createCsvWriter from 'csv-writer';
import Transaction from '../models/Transaction';
import { authenticateJWT, AuthRequest } from '../middleware/auth';
import fs from 'fs';

const router = express.Router();

// POST /api/export/csv
router.post('/csv', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { columns = ['id', 'date', 'amount', 'category', 'status', 'user_id'], filters = {} } = req.body;
    
    // Build query based on filters
    const query: any = {};
    if (filters.category) query.category = filters.category;
    if (filters.status) query.status = filters.status;
    if (filters.user_id) query.user_id = filters.user_id;
    if (filters.date) query.date = filters.date;

    const transactions = await Transaction.find(query);
    
    if (transactions.length === 0) {
      res.status(404).json({ error: 'No transactions found' });
      return;
    }

    // Create CSV writer
    const filePath = 'transactions_export.csv';
    const csvWriter = createCsvWriter.createObjectCsvWriter({
      path: filePath,
      header: columns.map((col: string) => ({
        id: col,
        title: col.charAt(0).toUpperCase() + col.slice(1)
      }))
    });

    // Prepare data for CSV
    const csvData = transactions.map(transaction => {
      const row: any = {};
      columns.forEach((col: string) => {
        row[col] = transaction[col as keyof typeof transaction];
      });
      return row;
    });

    await csvWriter.writeRecords(csvData);

    // Send file to client
    res.download(filePath, filePath, (err) => {
      if (err) {
        console.error('Download error:', err);
      }
      // Clean up the file after download
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('File cleanup error:', unlinkErr);
      });
    });

  } catch (error) {
    console.error('CSV export error:', error);
    res.status(500).json({ error: 'Failed to export CSV' });
  }
});

export default router; 