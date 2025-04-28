import React from 'react';
import { Mic, Volume2, Settings2, List } from 'lucide-react';

const VoiceCommands = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Voice Commands</h1>
          <p className="text-gray-600 mt-2">Control your finances with voice</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 mb-6">
                <Mic className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Start Speaking</h2>
              <p className="text-gray-600 mb-8">Click the button below to start using voice commands</p>
              <button className="btn-primary mx-auto">
                <Mic className="h-5 w-5 mr-2" />
                Start Listening
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Commands</h2>
            <div className="space-y-4">
              {[
                "Add expense of $50 for groceries",
                "Show my spending for last month",
                "What's my current balance?",
                "Set budget alert for dining"
              ].map((command, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Volume2 className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">{command}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Voice Settings</h2>
              <Settings2 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select className="input-field">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voice Speed
                </label>
                <input
                  type="range"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  min="0"
                  max="100"
                  defaultValue="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wake Word
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Hey TrackIt"
                  defaultValue="Hey TrackIt"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Available Commands</h2>
              <List className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {[
                "Add expense",
                "Show balance",
                "Set budget",
                "Show statistics",
                "Generate report",
                "Set reminder"
              ].map((command, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg text-gray-700">
                  {command}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommands;