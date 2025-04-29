import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart, 
  Bot,
  Calendar,
  DollarSign,
  Home,
  LogOut,
  Mic,
  PieChart,
  TrendingUp
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/expense-tracker', icon: <DollarSign size={20} />, label: 'Expenses' },
    { path: '/ai-categories', icon: <PieChart size={20} />, label: 'Categories' },
    { path: '/voice-commands', icon: <Mic size={20} />, label: 'Voice' },
    { path: '/budget-planning', icon: <BarChart size={20} />, label: 'Budget' },
    { path: '/future-predictions', icon: <TrendingUp size={20} />, label: 'Predictions' },
    { path: '/bill-reminders', icon: <Calendar size={20} />, label: 'Reminders' },
    { path: '/ai-chat', icon: <Bot size={20} />, label: 'AI Chat' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                TrackIt
              </Link>
            </div>
            
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                      isActive(item.path)
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-blue-600 hover:border-b-2 hover:border-blue-600'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-1">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <button
                onClick={() => signOut()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut size={20} className="mr-2" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;