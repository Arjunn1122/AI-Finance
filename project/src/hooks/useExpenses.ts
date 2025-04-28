import { useState, useEffect } from 'react';
import { Expense, CreateExpenseDTO } from '../types/expense';
import { expenseService } from '../services/expenseService';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses from storage on mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await expenseService.getAllExpenses();
        setExpenses(data);
      } catch (error) {
        console.error('Failed to load expenses:', error);
      }
    };
    loadExpenses();
  }, []);

  // Add new expense
  const addExpense = async (expenseData: CreateExpenseDTO) => {
    const newExpense = await expenseService.createExpense(expenseData);
    if (newExpense) {
      setExpenses(prev => [newExpense, ...prev]);
    }
  };

  // Update expense
  const updateExpense = async (id: string, updates: Partial<CreateExpenseDTO>) => {
    const updatedExpense = await expenseService.updateExpense(id, updates);
    if (updatedExpense) {
      setExpenses(prev =>
        prev.map(expense =>
          expense.id === id ? updatedExpense : expense
        )
      );
    }
  };

  // Delete expense
  const deleteExpense = async (id: string) => {
    await expenseService.deleteExpense(id);
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