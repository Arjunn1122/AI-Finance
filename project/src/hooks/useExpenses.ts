import { useState, useEffect } from 'react';
import { Expense, CreateExpenseDTO } from '../types/expense';

const STORAGE_KEY = 'expenses';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem(STORAGE_KEY);
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  // Add new expense
  const addExpense = async (expenseData: CreateExpenseDTO) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Math.random().toString(36).substr(2, 9), // Simple ID generation
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  // Update expense
  const updateExpense = async (id: string, updates: Partial<CreateExpenseDTO>) => {
    setExpenses(prev =>
      prev.map(expense =>
        expense.id === id ? { ...expense, ...updates } : expense
      )
    );
  };

  // Delete expense
  const deleteExpense = async (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  // Get total expenses
  const getTotal = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  // Get expenses by category
  const getExpensesByCategory = () => {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);
  };

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotal,
    getExpensesByCategory,
  };
}; 