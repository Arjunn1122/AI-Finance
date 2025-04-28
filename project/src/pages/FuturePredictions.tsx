import React from 'react';
import { TrendingUp, Calendar, AlertTriangle, Settings, Download, RefreshCw } from 'lucide-react';

const FuturePredictions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Future Predictions</h1>
          <p className="text-gray-600 mt-2">AI-powered expense forecasting</p>
        </div>
        <div className="flex space-x-4">
          <button className="btn-secondary">
            <Download className="h-5 w-5 mr-2" />
            Export Report
          </button>
          <button className="btn-primary">
            <RefreshCw className="h-5 w-5 mr-2" />
            Update Predictions
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Forecast</h2>
            <div className="aspect-[16/9] bg-gray-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-48 w-48 text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Monthly Predictions</h2>
            <div className="space-y-6">
              {[
                { month: 'April 2024', predicted: 2800, change: '+5%', trend: 'up' },
                { month: 'May 2024', predicted: 3100, change: '+10%', trend: 'up' },
                { month: 'June 2024', predicted: 2950, change: '-5%', trend: 'down' }
              ].map((item) => (
                <div key={item.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.month}</p>
                    <p className="text-sm text-gray-500">Predicted: ${item.predicted}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.trend === 'up' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Model Settings</h2>
              <Settings className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prediction Window
                </label>
                <select className="input-field">
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>1 Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Include Seasonal Patterns
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">Enable seasonal analysis</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confidence Level
                </label>
                <input
                  type="range"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  min="0"
                  max="100"
                  defaultValue="95"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>90%</span>
                  <span>95%</span>
                  <span>99%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Risk Factors</h2>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="space-y-3">
              {[
                { factor: 'Irregular Income', risk: 'High' },
                { factor: 'Seasonal Spending', risk: 'Medium' },
                { factor: 'Fixed Expenses', risk: 'Low' }
              ].map((item) => (
                <div key={item.factor} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{item.factor}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.risk === 'High' ? 'bg-red-100 text-red-800' :
                    item.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {[
                { event: 'Annual Insurance', date: 'Apr 15, 2024', amount: '$1,200' },
                { event: 'Car Maintenance', date: 'May 1, 2024', amount: '$300' },
                { event: 'Property Tax', date: 'Jun 30, 2024', amount: '$2,500' }
              ].map((item) => (
                <div key={item.event} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.event}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                  <span className="text-blue-600 font-medium">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturePredictions;