import { useState, useEffect } from 'react';
import { Reminder, reminderService } from '../services/reminderService';
import { toast } from 'react-hot-toast';
import { Bell, Plus, X, Check, Calendar, DollarSign, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

export function RemindersManager() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    title: '',
    amount: 0,
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    isPaid: false,
    isRecurring: false,
    description: ''
  });

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      setLoading(true);
      const data = await reminderService.getReminders();
      setReminders(data.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
    } catch (error) {
      toast.error('Failed to load reminders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminder.title || !newReminder.amount || !newReminder.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      const reminder = await reminderService.addReminder(newReminder);
      setReminders(prev => [...prev, reminder].sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      ));
      setIsModalOpen(false);
      setNewReminder({
        title: '',
        amount: 0,
        dueDate: format(new Date(), 'yyyy-MM-dd'),
        isPaid: false,
        isRecurring: false,
        description: ''
      });
      toast.success('Reminder added successfully');
    } catch (error) {
      toast.error('Failed to add reminder');
      console.error(error);
    }
  };

  const handleDeleteReminder = async (id: string) => {
    try {
      await reminderService.deleteReminder(id);
      setReminders(prev => prev.filter(reminder => reminder.id !== id));
      toast.success('Reminder deleted successfully');
    } catch (error) {
      toast.error('Failed to delete reminder');
      console.error(error);
    }
  };

  const handleTogglePaid = async (id: string, currentStatus: boolean) => {
    try {
      const updatedReminder = await reminderService.togglePaidStatus(id, !currentStatus);
      setReminders(prev =>
        prev.map(reminder => (reminder.id === id ? updatedReminder : reminder))
      );
      toast.success(`Reminder marked as ${!currentStatus ? 'paid' : 'unpaid'}`);
    } catch (error) {
      toast.error('Failed to update reminder status');
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manage Bills</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Bill
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
          <p className="text-gray-600 mt-2">Loading bills...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reminders.map(reminder => (
            <div
              key={reminder.id}
              className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${
                reminder.isPaid ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-medium text-gray-900">{reminder.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Due: {format(new Date(reminder.dueDate), 'MMM dd, yyyy')}</span>
                    <DollarSign className="h-4 w-4 ml-2 mr-1" />
                    <span>${reminder.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {reminder.isRecurring && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Recurring
                  </span>
                )}
                <button
                  onClick={() => handleTogglePaid(reminder.id, reminder.isPaid)}
                  className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
                    reminder.isPaid
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Check className="h-4 w-4" />
                  {reminder.isPaid ? 'Paid' : 'Mark Paid'}
                </button>
                <button
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Bill</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddReminder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newReminder.title}
                  onChange={e => setNewReminder({ ...newReminder, title: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={newReminder.amount}
                  onChange={e => setNewReminder({ ...newReminder, amount: parseFloat(e.target.value) })}
                  className="w-full p-2 border rounded-lg"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newReminder.dueDate}
                  onChange={e => setNewReminder({ ...newReminder, dueDate: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={newReminder.description}
                  onChange={e => setNewReminder({ ...newReminder, description: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newReminder.isRecurring}
                  onChange={e => setNewReminder({ ...newReminder, isRecurring: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">
                  This is a recurring bill
                </label>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
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
                  Add Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 