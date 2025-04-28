import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Define the mock storage interface
export interface MockStorage {
  getItem: (key: string) => Promise<{ data: any; error: null }>;
  setItem: (key: string, value: any) => Promise<{ data: null; error: null }>;
  removeItem: (key: string) => Promise<{ data: null; error: null }>;
}

// Create a mock storage using localStorage
export const mockStorage: MockStorage = {
  getItem: async (key: string) => {
    try {
      const data = localStorage.getItem(key);
      return { data: data ? JSON.parse(data) : [], error: null };
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return { data: [], error: null };
    }
  },
  setItem: async (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return { data: null, error: null };
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return { data: null, error: null };
    }
  },
  removeItem: async (key: string) => {
    try {
      localStorage.removeItem(key);
      return { data: null, error: null };
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return { data: null, error: null };
    }
  }
};

// Always use localStorage regardless of Supabase configuration
export const storage = mockStorage;

// Helper functions that work with both Supabase and localStorage
export const createUserProfile = async (userId: string, userData: any) => {
  if (storage === mockStorage) {
    return storage.setItem('userProfile', { id: userId, ...userData });
  }
  
  const { error } = await (storage as any)
    .from('users')
    .insert([{ id: userId, ...userData }]);
  
  if (error) throw error;
};

export const fetchUserExpenses = async (userId: string) => {
  if (storage === mockStorage) {
    const { data } = await storage.getItem('expenses');
    return data || [];
  }

  const { data, error } = await (storage as any)
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
};

export const addExpense = async (userId: string, expenseData: any) => {
  if (storage === mockStorage) {
    const { data: existingData } = await storage.getItem('expenses');
    const expenses = existingData || [];
    const newExpense = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: userId,
      ...expenseData,
      created_at: new Date().toISOString()
    };
    expenses.unshift(newExpense);
    return storage.setItem('expenses', expenses);
  }

  const { error } = await (storage as any)
    .from('expenses')
    .insert([{ user_id: userId, ...expenseData }]);

  if (error) throw error;
};

export const fetchUserBills = async (userId: string) => {
  if (storage === mockStorage) {
    const { data } = await storage.getItem('bills');
    return data || [];
  }

  const { data, error } = await (storage as any)
    .from('bills')
    .select('*')
    .eq('user_id', userId)
    .order('due_date', { ascending: true });

  if (error) throw error;
  return data;
};

export const addBill = async (userId: string, billData: any) => {
  if (storage === mockStorage) {
    const { data: existingData } = await storage.getItem('bills');
    const bills = existingData || [];
    const newBill = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: userId,
      ...billData,
      created_at: new Date().toISOString()
    };
    bills.unshift(newBill);
    return storage.setItem('bills', bills);
  }

  const { error } = await (storage as any)
    .from('bills')
    .insert([{ user_id: userId, ...billData }]);

  if (error) throw error;
};

export const fetchUserInvestments = async (userId: string) => {
  if (storage === mockStorage) {
    const { data } = await storage.getItem('investments');
    return data || [];
  }

  const { data, error } = await (storage as any)
    .from('investments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const addInvestment = async (userId: string, investmentData: any) => {
  if (storage === mockStorage) {
    const { data: existingData } = await storage.getItem('investments');
    const investments = existingData || [];
    const newInvestment = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: userId,
      ...investmentData,
      created_at: new Date().toISOString()
    };
    investments.unshift(newInvestment);
    return storage.setItem('investments', investments);
  }

  const { error } = await (storage as any)
    .from('investments')
    .insert([{ user_id: userId, ...investmentData }]);

  if (error) throw error;
}; 