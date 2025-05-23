import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ExpenseTracker from './pages/ExpenseTracker';
import AICategories from './pages/AICategories';
import VoiceCommands from './pages/VoiceCommands';
import BudgetPlanning from './pages/BudgetPlanning';
import FuturePredictions from './pages/FuturePredictions';
import Investments from './pages/Investments';
import BillReminders from './pages/BillReminders';
import AiChat from './components/AiChat';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/expense-tracker" element={
                <ProtectedRoute>
                  <ExpenseTracker />
                </ProtectedRoute>
              } />
              <Route path="/ai-categories" element={
                <ProtectedRoute>
                  <AICategories />
                </ProtectedRoute>
              } />
              <Route path="/voice-commands" element={
                <ProtectedRoute>
                  <VoiceCommands />
                </ProtectedRoute>
              } />
              <Route path="/budget-planning" element={
                <ProtectedRoute>
                  <BudgetPlanning />
                </ProtectedRoute>
              } />
              <Route path="/future-predictions" element={
                <ProtectedRoute>
                  <FuturePredictions />
                </ProtectedRoute>
              } />
              <Route path="/investments" element={
                <ProtectedRoute>
                  <Investments />
                </ProtectedRoute>
              } />
              <Route path="/bill-reminders" element={
                <ProtectedRoute>
                  <BillReminders />
                </ProtectedRoute>
              } />
              <Route path="/ai-chat" element={
                <ProtectedRoute>
                  <AiChat />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/expense-tracker" replace />} />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;