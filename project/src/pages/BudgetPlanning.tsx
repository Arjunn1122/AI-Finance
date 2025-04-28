import React from 'react';
import { DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Sliders, Bell } from 'lucide-react';
import { formatRupees } from '../utils/currency';

const BudgetPlanning = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Budget Planning</h1>
          <p className="text-gray-600 mt-2">AI-powered budget recommendations</p>
        </div>
        <button className="btn-primary">
          <DollarSign className="h-5 w-5 mr-2" />
          Set New Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Monthly Income</h3>
            <ArrowUpRight className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{formatRupees(434920)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Expenses</h3>
            <ArrowDownRight className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">{formatRupees(258960)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Savings</h3>
            <PieChart className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{formatRupees(175960)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Budget Health</h3>
            <Sliders className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">Good</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Category Budgets</h2>
            <div className="space-y-6">
              {[
                { category: 'Housing', allocated: 124500, spent: 120350, color: 'blue' },
                { category: 'Food & Dining', allocated: 49800, spent: 48140, color: 'green' },
                { category: 'Transportation', allocated: 33200, spent: 29050, color: 'yellow' },
                { category: 'Entertainment', allocated: 24900, spent: 24070, color: 'purple' }
              ].map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">{item.category}</span>
                    <span className="text-gray-600">
                      {formatRupees(item.spent)} / {formatRupees(item.allocated)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 bg-${item.color}-500 rounded-full`}
                      style={{ width: `${(item.spent / item.allocated) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Budget Alerts</h2>
              <Bell className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { category: 'Entertainment', message: 'Near budget limit', type: 'warning' },
                { category: 'Shopping', message: 'Over budget', type: 'danger' },
                { category: 'Savings', message: 'Goal achieved', type: 'success' }
              ].map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    alert.type === 'warning'
                      ? 'bg-yellow-50 text-yellow-800'
                      : alert.type === 'danger'
                      ? 'bg-red-50 text-red-800'
                      : 'bg-green-50 text-green-800'
                  }`}
                >
                  <p className="font-medium">{alert.category}</p>
                  <p className="text-sm mt-1">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Adjust Category Budgets
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Set Savings Goal
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                View Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanning;