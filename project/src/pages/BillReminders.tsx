import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Clock, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react';
import { RemindersManager } from '../components/RemindersManager';
import { Toaster } from 'react-hot-toast';
import { reminderService, Reminder } from '../services/reminderService';

const BillReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const data = await reminderService.getReminders();
      setReminders(data);
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  const getDueThisWeek = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return reminders.filter(reminder => {
      const dueDate = new Date(reminder.dueDate);
      return dueDate >= today && dueDate <= nextWeek && !reminder.isPaid;
    });
  };

  const getPaidThisMonth = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return reminders.filter(reminder => {
      const dueDate = new Date(reminder.dueDate);
      return dueDate >= firstDayOfMonth && reminder.isPaid;
    });
  };

  const getUpcoming = () => {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return reminders.filter(reminder => {
      const dueDate = new Date(reminder.dueDate);
      return dueDate > today && dueDate <= thirtyDaysFromNow && !reminder.isPaid;
    });
  };

  const getRecurring = () => {
    return reminders.filter(reminder => reminder.isRecurring);
  };

  const calculateTotal = (reminders: Reminder[]) => {
    return reminders.reduce((sum, reminder) => sum + reminder.amount, 0);
  };

  const dueThisWeek = getDueThisWeek();
  const paidThisMonth = getPaidThisMonth();
  const upcoming = getUpcoming();
  const recurring = getRecurring();

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Bill Reminders</h1>
          <p className="text-gray-600 mt-2">Never miss a payment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Due This Week</h3>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{dueThisWeek.length}</p>
          <p className="text-sm text-gray-500 mt-2">Total: ${calculateTotal(dueThisWeek).toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Paid This Month</h3>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{paidThisMonth.length}</p>
          <p className="text-sm text-gray-500 mt-2">Total: ${calculateTotal(paidThisMonth).toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Upcoming</h3>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{upcoming.length}</p>
          <p className="text-sm text-gray-500 mt-2">Next 30 days</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Recurring Bills</h3>
            <Clock className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{recurring.length}</p>
          <p className="text-sm text-gray-500 mt-2">Active bills</p>
        </div>
      </div>

      <RemindersManager />
    </div>
  );
};

export default BillReminders;