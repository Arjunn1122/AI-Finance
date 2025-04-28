import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart2, Brain, Mic, PiggyBank, Calendar, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BarChart2 className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-blue-500">TrackIt</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/expense-tracker" className="nav-link">
              <BarChart2 className="h-5 w-5" />
              <span>Expenses</span>
            </Link>
            <Link to="/ai-categories" className="nav-link">
              <Brain className="h-5 w-5" />
              <span>AI Categories</span>
            </Link>
            <Link to="/voice-commands" className="nav-link">
              <Mic className="h-5 w-5" />
              <span>Voice</span>
            </Link>
            <Link to="/investments" className="nav-link">
              <PiggyBank className="h-5 w-5" />
              <span>Invest</span>
            </Link>
            <Link to="/bill-reminders" className="nav-link">
              <Calendar className="h-5 w-5" />
              <span>Bills</span>
            </Link>
            <Link to="/ai-chat" className="nav-link">
              <MessageSquare className="h-5 w-5" />
              <span>AI Chat</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-500 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;