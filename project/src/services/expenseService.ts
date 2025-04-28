import { storage } from '../lib/supabase';
import { CreateExpenseDTO, Expense } from '../types/expense';

const EXPENSE_TABLE = 'expenses';

export const expenseService = {
  // Create a new expense
  async createExpense(expense: CreateExpenseDTO): Promise<Expense | null> {
    try {
      const { data: existingData } = await storage.getItem(EXPENSE_TABLE);
      const expenses = existingData || [];
      const newExpense: Expense = {
        ...expense,
        id: Math.random().toString(36).substr(2, 9),
      };
      expenses.unshift(newExpense);
      await storage.setItem(EXPENSE_TABLE, expenses);
      return newExpense;
    } catch (error) {
      console.error('Error creating expense:', error);
      return null;
    }
  },

  // Get all expenses
  async getAllExpenses(): Promise<Expense[]> {
    try {
      const { data } = await storage.getItem(EXPENSE_TABLE);
      return data || [];
    } catch (error) {
      console.error('Error fetching expenses:', error);
      return [];
    }
  },

  // Get a single expense by ID
  async getExpenseById(id: string): Promise<Expense | null> {
    try {
      const { data } = await storage.getItem(EXPENSE_TABLE);
      const expenses = data || [];
      return expenses.find((e: Expense) => e.id === id) || null;
    } catch (error) {
      console.error('Error fetching expense:', error);
      return null;
    }
  },

  // Update an expense
  async updateExpense(id: string, updates: Partial<CreateExpenseDTO>): Promise<Expense | null> {
    try {
      const { data } = await storage.getItem(EXPENSE_TABLE);
      const expenses = data || [];
      const updatedExpenses = expenses.map((expense: Expense) =>
        expense.id === id ? { ...expense, ...updates } : expense
      );
      await storage.setItem(EXPENSE_TABLE, updatedExpenses);
      return updatedExpenses.find((e: Expense) => e.id === id) || null;
    } catch (error) {
      console.error('Error updating expense:', error);
      return null;
    }
  },

  // Delete an expense
  async deleteExpense(id: string): Promise<void> {
    try {
      const { data } = await storage.getItem(EXPENSE_TABLE);
      const expenses = (data || []).filter((e: Expense) => e.id !== id);
      await storage.setItem(EXPENSE_TABLE, expenses);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  },

  // Get expenses summary by category
  async getExpensesByCategory(): Promise<Record<string, number>> {
    try {
      const expenses = await this.getAllExpenses();
      return expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {} as Record<string, number>);
    } catch (error) {
      console.error('Error getting expenses by category:', error);
      return {};
    }
  }
}; 