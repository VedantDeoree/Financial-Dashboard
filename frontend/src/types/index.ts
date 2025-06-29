export interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  user_profile: string;
}

export interface User {
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalExpense: number;
  net: number;
  categoryBreakdown: Record<string, number>;
  monthlyTrend: Record<string, { revenue: number; expense: number }>;
}

export interface TransactionFilters {
  category?: string;
  status?: string;
  user_id?: string;
  date?: string;
}

export interface TransactionQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  category?: string;
  status?: string;
  user_id?: string;
  date?: string;
} 