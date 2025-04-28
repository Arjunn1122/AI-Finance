import React from 'react';
import { PiggyBank, TrendingUp, BarChart2, DollarSign, Briefcase, AlertCircle } from 'lucide-react';
import { formatRupees } from '../utils/currency';

const Investments = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Smart Investments</h1>
          <p className="text-gray-600 mt-2">AI-powered investment recommendations</p>
        </div>
        <button className="btn-primary">
          <PiggyBank className="h-5 w-5 mr-2" />
          Add Investment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Portfolio Value</h3>
            <Briefcase className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{formatRupees(3754920)}</p>
          <p className="text-sm text-green-500 mt-2">+12.5% this month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Return</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{formatRupees(424960)}</p>
          <p className="text-sm text-gray-500 mt-2">Since inception</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Risk Level</h3>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">Moderate</p>
          <p className="text-sm text-gray-500 mt-2">Balanced portfolio</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Cash Available</h3>
            <DollarSign className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{formatRupees(207500)}</p>
          <p className="text-sm text-gray-500 mt-2">Ready to invest</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Portfolio Performance</h2>
            <div className="aspect-[16/9] bg-gray-50 rounded-lg flex items-center justify-center">
              <BarChart2 className="h-48 w-48 text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Current Investments</h2>
            <div className="space-y-4">
              {[
                { name: 'S&P 500 ETF', allocation: '40%', value: 1501968, return: '+15.2%' },
                { name: 'Tech Growth Fund', allocation: '25%', value: 938730, return: '+22.4%' },
                { name: 'Bond Fund', allocation: '20%', value: 750984, return: '+4.5%' },
                { name: 'Real Estate ETF', allocation: '15%', value: 563238, return: '+8.7%' }
              ].map((investment) => (
                <div key={investment.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{investment.name}</p>
                    <p className="text-sm text-gray-500">Allocation: {investment.allocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatRupees(investment.value)}</p>
                    <p className="text-sm text-green-500">{investment.return}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Investment Recommendations</h2>
            <div className="space-y-4">
              {[
                { type: 'Buy', asset: 'Clean Energy ETF', reason: 'Sector growth potential' },
                { type: 'Hold', asset: 'Tech Growth Fund', reason: 'Strong performance' },
                { type: 'Sell', asset: 'Crypto Fund', reason: 'High volatility' }
              ].map((rec) => (
                <div key={rec.asset} className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rec.type === 'Buy' ? 'bg-green-100 text-green-800' :
                      rec.type === 'Sell' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {rec.type}
                    </span>
                    <button className="text-blue-600 text-sm hover:text-blue-700">View Details</button>
                  </div>
                  <p className="font-medium text-gray-900">{rec.asset}</p>
                  <p className="text-sm text-gray-500">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Rebalance Portfolio
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Set Investment Goals
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Update Risk Profile
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                View Tax Documents
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Market Insights</h2>
            <div className="space-y-4">
              {[
                { title: 'Market Rally Continues', time: '2 hours ago' },
                { title: 'Fed Announces Rate Decision', time: '5 hours ago' },
                { title: 'Tech Sector Analysis', time: '1 day ago' }
              ].map((news) => (
                <div key={news.title} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{news.title}</p>
                  <p className="text-sm text-gray-500">{news.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;