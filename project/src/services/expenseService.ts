import { storage, mockStorage } from '../lib/supabase';
import { CreateExpenseDTO, Expense } from '../types/expense';

const EXPENSE_TABLE = 'expenses';
const MOCK_USER_ID = 'local-user'; // Used for localStorage when no auth

interface StorageExpense extends Expense {
  user_id: string;
}

export const expenseService = {
  // Create a new expense
  async createExpense(expense: CreateExpenseDTO): Promise<Expense | null> {
    if (storage.getItem === mockStorage.getItem) {
      // Using localStorage
      const { data: existingData } = await storage.getItem(EXPENSE_TABLE);
      const expenses = existingData || [];
      const newExpense: StorageExpense = {
        ...expense,
        id: Math.random().toString(36).substr(2, 9),
        user_id: MOCK_USER_ID,
      };
      expenses.unshift(newExpense);
      await storage.setItem(EXPENSE_TABLE, expenses);
      return newExpense;
    } else {
      // Using Supabase
      const { data, error } = await (storage as any)
        .from(EXPENSE_TABLE)
        .insert([{
          ...expense,
          user_id: (await (storage as any).auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating expense:', error);
        throw error;
      }

      return data;
    }
  },

  // Get all expenses for the current user
  async getAllExpenses(): Promise<Expense[]> {
    if (storage.getItem === mockStorage.getItem) {
      // Using localStorage
      const { data } = await storage.getItem(EXPENSE_TABLE);
      return data || [];
    } else {
      // Using Supabase
      const { data, error } = await (storage as any)
        .from(EXPENSE_TABLE)
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching expenses:', error);
        throw error;
      }

      return data || [];
    }
  },

  // Get a single expense by ID
  async getExpenseById(id: string): Promise<Expense | null> {
    if (storage.getItem === mockStorage.getItem) {
      // Using localStorage
      const { data } = await storage.getItem(EXPENSE_TABLE);
      const expenses = data || [];
      return expenses.find((e: StorageExpense) => e.id === id) || null;
    } else {
      // Using Supabase
      const { data, error } = await (storage as any)
        .from(EXPENSE_TABLE)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching expense:', error);
        throw error;
      }

      return data;
    }
  },

  // Update an expense
  async updateExpense(id: string, updates: Partial<CreateExpenseDTO>): Promise<Expense | null> {
    if (storage.getItem === mockStorage.getItem) {
      // Using localStorage
      const { data } = await storage.getItem(EXPENSE_TABLE);
      const expenses = data || [];
      const updatedExpenses = expenses.map((expense: StorageExpense) =>
        expense.id === id ? { ...expense, ...updates } : expense
      );
      await storage.setItem(EXPENSE_TABLE, updatedExpenses);
      return updatedExpenses.find((e: StorageExpense) => e.id === id) || null;
    } else {
      // Using Supabase
      const { data, error } = await (storage as any)
        .from(EXPENSE_TABLE)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating expense:', error);
        throw error;
      }

      return data;
    }
  },

  // Delete an expense
  async deleteExpense(id: string): Promise<void> {
    if (storage.getItem === mockStorage.getItem) {
      // Using localStorage
      const { data } = await storage.getItem(EXPENSE_TABLE);
      const expenses = (data || []).filter((e: StorageExpense) => e.id !== id);
      await storage.setItem(EXPENSE_TABLE, expenses);
    } else {
      // Using Supabase
      const { error } = await (storage as any)
        .from(EXPENSE_TABLE)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting expense:', error);
        throw error;
      }
    }
  },

  // Get expenses summary by category
  async getExpensesByCategory(startDate: string, endDate: string): Promise<Record<string, number>> {
    const expenses = await this.getAllExpenses();
    const filteredExpenses = expenses.filter(expense => 
      expense.date >= startDate && expense.date <= endDate
    );

    return filteredExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);
  }
}; 