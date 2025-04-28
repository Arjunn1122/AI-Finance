export interface Reminder {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  isRecurring: boolean;
  frequency?: 'monthly' | 'weekly' | 'yearly';
  description?: string;
}

const REMINDERS_KEY = 'reminders';

export const reminderService = {
  // Get all reminders
  async getReminders(): Promise<Reminder[]> {
    try {
      const reminders = localStorage.getItem(REMINDERS_KEY);
      return reminders ? JSON.parse(reminders) : [];
    } catch (error) {
      console.error('Error fetching reminders:', error);
      return [];
    }
  },

  // Add new reminder
  async addReminder(reminder: Omit<Reminder, 'id'>): Promise<Reminder> {
    try {
      const reminders = await this.getReminders();
      const newReminder = {
        ...reminder,
        id: Math.random().toString(36).substring(2, 15)
      };
      reminders.push(newReminder);
      localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
      return newReminder;
    } catch (error) {
      console.error('Error adding reminder:', error);
      throw error;
    }
  },

  // Update reminder
  async updateReminder(id: string, updates: Partial<Omit<Reminder, 'id'>>): Promise<Reminder> {
    try {
      const reminders = await this.getReminders();
      const index = reminders.findIndex(r => r.id === id);
      if (index === -1) throw new Error('Reminder not found');
      
      const updatedReminder = { ...reminders[index], ...updates };
      reminders[index] = updatedReminder;
      localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
      return updatedReminder;
    } catch (error) {
      console.error('Error updating reminder:', error);
      throw error;
    }
  },

  // Delete reminder
  async deleteReminder(id: string): Promise<void> {
    try {
      const reminders = await this.getReminders();
      const filteredReminders = reminders.filter(r => r.id !== id);
      localStorage.setItem(REMINDERS_KEY, JSON.stringify(filteredReminders));
    } catch (error) {
      console.error('Error deleting reminder:', error);
      throw error;
    }
  },

  // Toggle reminder paid status
  async togglePaidStatus(id: string, isPaid: boolean): Promise<Reminder> {
    return this.updateReminder(id, { isPaid });
  }
}; 