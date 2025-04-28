import { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { ExpenseCategory } from '../types/expense';
import { toast } from 'react-hot-toast';

export function ExpenseTracker() {
  const { expenses, addExpense, deleteExpense, getTotal } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'food' as ExpenseCategory,
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.amount || !formData.category) {
        toast.error('Please fill in all required fields');
        return;
      }

      await addExpense({
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date,
      });

      setIsModalOpen(false);
      setFormData({
        description: '',
        amount: '',
        category: 'food',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      toast.error('Failed to add expense');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <span>+</span> Add Expense
        </button>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Total Expenses Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Total Expenses</h2>
          <div className="text-3xl font-bold text-blue-600">₹{getTotal().toFixed(2)}</div>
          <p className="text-sm text-green-600 mt-2">Track your spending</p>
        </div>

        {/* Categories Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="text-3xl font-bold text-blue-600">8</div>
          <p className="text-sm text-gray-600 mt-2">Track by category</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <div className="flex gap-4">
            <button className="text-blue-600 flex items-center gap-2">
              <span>Filter</span>
            </button>
            <button className="text-blue-600 flex items-center gap-2">
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-4">DATE</th>
              <th className="pb-4">DESCRIPTION</th>
              <th className="pb-4 text-right">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id} className="border-t">
                <td className="py-4">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="py-4">{expense.description || expense.category}</td>
                <td className="py-4 text-right">₹{expense.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as ExpenseCategory})}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="food">Food & Dining</option>
                  <option value="transportation">Transportation</option>
                  <option value="housing">Housing</option>
                  <option value="utilities">Utilities</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="shopping">Shopping</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 