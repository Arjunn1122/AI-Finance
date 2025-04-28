import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Brain, Mic, Calculator, TrendingUp, PiggyBank, Bell, MessageSquare } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, link }) => (
  <Link to={link} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="flex flex-col items-center text-center">
      <Icon className="h-12 w-12 text-blue-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to TrackIt</h1>
        <p className="text-xl text-gray-600 mb-8">Your AI-Powered Personal Finance Assistant</p>
        
        <div className="flex justify-center space-x-4 mb-12">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={BarChart2}
          title="Expense Tracking"
          description="Track and categorize your expenses effortlessly"
          link="/expense-tracker"
        />
        <FeatureCard
          icon={Brain}
          title="AI Categorization"
          description="Smart expense categorization using NLP"
          link="/ai-categories"
        />
        <FeatureCard
          icon={Mic}
          title="Voice Commands"
          description="Manage your finances using voice commands"
          link="/voice-commands"
        />
        <FeatureCard
          icon={Calculator}
          title="Budget Planning"
          description="AI-powered budget planning and analysis"
          link="/budget-planning"
        />
        <FeatureCard
          icon={TrendingUp}
          title="Future Predictions"
          description="Predict future expenses using AI"
          link="/future-predictions"
        />
        <FeatureCard
          icon={PiggyBank}
          title="Investment Tips"
          description="Smart investment suggestions"
          link="/investments"
        />
        <FeatureCard
          icon={Bell}
          title="Bill Reminders"
          description="Never miss a payment with smart reminders"
          link="/bill-reminders"
        />
        <FeatureCard
          icon={MessageSquare}
          title="AI Chat"
          description="Get financial advice from our AI assistant"
          link="/ai-chat"
        />
      </div>
    </div>
  );
};

export default Home;