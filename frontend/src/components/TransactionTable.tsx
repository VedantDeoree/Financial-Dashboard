import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { transactionAPI, exportAPI } from '../services/api';
import { Transaction, TransactionQuery } from '../types';

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<TransactionQuery>({
    page: 1,
    limit: 20,
    sort: 'date',
    order: 'desc',
  });

  useEffect(() => {
    fetchTransactions();
  }, [query]);

  const fetchTransactions = async () => {
    try {
      const response = await transactionAPI.getTransactions(query);
      setTransactions(response.data);
      setTotal(response.total);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const columns = ['id', 'date', 'amount', 'category', 'status', 'user_id'];
      const filters = {
        category: query.category,
        status: query.status,
        user_id: query.user_id,
      };
      await exportAPI.exportCSV(columns, filters);
    } catch (err: any) {
      setError('Failed to export CSV');
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date', width: 150, valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
    { field: 'amount', headerName: 'Amount', width: 120, valueFormatter: (params) => `$${params.value.toLocaleString()}` },
    { field: 'category', headerName: 'Category', width: 120 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={params.value === 'Paid' ? 'success' : 'warning'}
          size="small"
        />
      )
    },
    { field: 'user_id', headerName: 'User ID', width: 120 },
  ];

  if (loading && transactions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Transactions</Typography>
        <Button variant="contained" onClick={handleExport}>
          Export CSV
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Search"
          size="small"
          onChange={(e) => setQuery({ ...query, user_id: e.target.value })}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={query.category || ''}
            label="Category"
            onChange={(e) => setQuery({ ...query, category: e.target.value })}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Revenue">Revenue</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={query.status || ''}
            label="Status"
            onChange={(e) => setQuery({ ...query, status: e.target.value })}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Data Grid */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={transactions}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                page: query.page ? query.page - 1 : 0,
                pageSize: query.limit || 20,
              },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          rowCount={total}
          paginationMode="server"
          onPaginationModelChange={(model) => {
            setQuery({ 
              ...query, 
              page: model.page + 1,
              limit: model.pageSize
            });
          }}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default TransactionTable; 