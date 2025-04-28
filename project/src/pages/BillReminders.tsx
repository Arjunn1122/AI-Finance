import React from 'react';
import { Bell, Calendar, Clock, Plus, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react';

const BillReminders = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Bill Reminders</h1>
          <p className="text-gray-600 mt-2">Never miss a payment</p>
        </div>
        <button className="btn-primary">
          <Plus className="h-5 w-5 mr-2" />
          Add Bill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Due This Week</h3>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">3</p>
          <p className="text-sm text-gray-500 mt-2">Total: $524.00</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Paid This Month</h3>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">8</p>
          <p className="text-sm text-gray-500 mt-2">Total: $1,890.00</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Upcoming</h3>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">5</p>
          <p className="text-sm text-gray-500 mt-2">Next 30 days</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Autopay Enabled</h3>
            <Clock className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">6</p>
          <p className="text-sm text-gray-500 mt-2">Active bills</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Upcoming Bills</h2>
            <div className="space-y-4">
              {[
                { name: 'Electricity Bill', amount: 150, due: '2024-03-20', status: 'pending', autopay: true },
                { name: 'Internet Service', amount: 89, due: '2024-03-22', status: 'pending', autopay: true },
                { name: 'Water Bill', amount: 45, due: '2024-03-25', status: 'pending', autopay: false },
                { name: 'Netflix Subscription', amount: 15.99, due: '2024-03-28', status: 'pending', autopay: true },
                { name: 'Gym Membership', amount: 50, due: '2024-04-01', status: 'upcoming', autopay: true }
              ].map((bill) => (
                <div key={bill.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{bill.name}</p>
                      <p className="text-sm text-gray-500">Due: {bill.due}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${bill.amount}</p>
                      {bill.autopay && (
                        <span className="text-xs text-green-600">Autopay enabled</span>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200">
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Reminders</h2>
              <Bell className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { message: 'Electricity bill due in 2 days', type: 'urgent' },
                { message: 'Internet bill due next week', type: 'warning' },
                { message: 'Water bill payment successful', type: 'success' }
              ].map((reminder, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    reminder.type === 'urgent'
                      ? 'bg-red-50 text-red-800'
                      : reminder.type === 'warning'
                      ? 'bg-yellow-50 text-yellow-800'
                      : 'bg-green-50 text-green-800'
                  }`}
                >
                  <p className="text-sm">{reminder.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Methods</h2>
            <div className="space-y-3">
              {[
                { name: 'Chase Credit Card', last4: '4521', default: true },
                { name: 'Bank of America Debit', last4: '8542', default: false },
                { name: 'Wells Fargo Checking', last4: '9654', default: false }
              ].map((method) => (
                <div key={method.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{method.name}</p>
                    <p className="text-sm text-gray-500">****{method.last4}</p>
                  </div>
                  {method.default && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Default
                    </span>
                  )}
                </div>
              ))}
              <button className="w-full mt-2 p-3 text-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                Add Payment Method
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Schedule Payment
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                View Payment History
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Manage Autopay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillReminders;