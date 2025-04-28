import React from 'react';
import { Send, Bot, User, RefreshCw, Download, Settings } from 'lucide-react';

const AIChat = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">AI Financial Assistant</h1>
          <p className="text-gray-600 mt-2">Get expert financial advice instantly</p>
        </div>
        <div className="flex space-x-4">
          <button className="btn-secondary">
            <Download className="h-5 w-5 mr-2" />
            Export Chat
          </button>
          <button className="btn-secondary">
            <RefreshCw className="h-5 w-5 mr-2" />
            New Chat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-md h-[600px] flex flex-col">
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-gray-800">Hello! I'm your AI financial assistant. How can I help you today?</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">11:30 AM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 flex-row-reverse">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-blue-600 rounded-lg p-4">
                    <p className="text-white">Can you help me create a budget plan?</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">11:31 AM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-gray-800">I'd be happy to help you create a budget plan. First, let's analyze your monthly income and essential expenses. Could you share those details with me?</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">11:32 AM</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700">
                  <Send className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Chat Settings</h2>
              <Settings className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AI Response Style
                </label>
                <select className="input-field">
                  <option>Detailed</option>
                  <option>Concise</option>
                  <option>Simple</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Include Charts
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">Show visual aids</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Suggested Topics</h2>
            <div className="space-y-3">
              {[
                'How to reduce expenses?',
                'Investment strategies',
                'Debt management tips',
                'Retirement planning',
                'Emergency fund advice'
              ].map((topic) => (
                <button
                  key={topic}
                  className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Conversations</h2>
            <div className="space-y-3">
              {[
                { title: 'Budget Planning', time: '2 hours ago' },
                { title: 'Investment Advice', time: 'Yesterday' },
                { title: 'Expense Analysis', time: '2 days ago' }
              ].map((conv) => (
                <div key={conv.title} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{conv.title}</p>
                  <p className="text-sm text-gray-500">{conv.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;