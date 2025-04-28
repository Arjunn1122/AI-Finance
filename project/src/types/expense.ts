export type ExpenseCategory = 
  | 'food'
  | 'transportation'
  | 'housing'
  | 'utilities'
  | 'entertainment'
  | 'healthcare'
  | 'shopping'
  | 'other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
}

export interface CreateExpenseDTO {
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
} 