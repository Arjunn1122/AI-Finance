import React from 'react';
import { Brain, RefreshCw, Settings, PieChart } from 'lucide-react';

const AICategories = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">AI Categories</h1>
          <p className="text-gray-600 mt-2">Smart expense categorization powered by NLP</p>
        </div>
        <button className="btn-primary">
          <RefreshCw className="h-5 w-5 mr-2" />
          Retrain Model
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Category Distribution</h2>
            <div className="aspect-[16/9] bg-gray-50 rounded-lg flex items-center justify-center">
              <PieChart className="h-48 w-48 text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Categorizations</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Amazon Purchase</p>
                    <p className="text-sm text-gray-500">Confidence: 95%</p>
                  </div>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Electronics
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
                  Confidence Threshold
                </label>
                <input
                  type="range"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  min="0"
                  max="100"
                  defaultValue="80"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0%</span>
                  <span>80%</span>
                  <span>100%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-categorization
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">Enable automatic categorization</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Custom Categories</h2>
            <div className="space-y-2">
              {['Food & Dining', 'Shopping', 'Transportation', 'Bills & Utilities'].map((category) => (
                <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{category}</span>
                  <button className="text-red-500 hover:text-red-600">
                    <span className="sr-only">Delete</span>
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Add Custom Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICategories;