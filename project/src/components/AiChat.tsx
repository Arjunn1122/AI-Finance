import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Download, History, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatHistory {
  id: string;
  messages: Message[];
  date: number;
}

// Quick questions for common financial topics
const quickQuestions = [
  // Budgeting Questions
  { text: "How do I create a monthly budget?", category: "Budget" },
  { text: "What is the 50/30/20 budgeting rule?", category: "Budget" },
  { text: "How can I stick to my budget?", category: "Budget" },
  
  // Saving Questions
  { text: "What are the best ways to save money?", category: "Saving" },
  { text: "How much should I save each month?", category: "Saving" },
  { text: "How do I build an emergency fund?", category: "Saving" },
  { text: "Tips for saving money on groceries?", category: "Saving" },
  
  // Investment Questions
  { text: "How should I start investing?", category: "Invest" },
  { text: "What are index funds?", category: "Invest" },
  { text: "How to invest with little money?", category: "Invest" },
  { text: "Stocks vs Mutual Funds?", category: "Invest" },
  
  // Debt Management
  { text: "Tips for managing debt?", category: "Debt" },
  { text: "How to pay off credit card debt?", category: "Debt" },
  { text: "What is debt consolidation?", category: "Debt" },
  { text: "How to improve credit score?", category: "Debt" },
  
  // Expense Tracking
  { text: "How can I track my expenses better?", category: "Expense" },
  { text: "Best apps for expense tracking?", category: "Expense" },
  { text: "How to reduce monthly expenses?", category: "Expense" },
  
  // Retirement Planning
  { text: "How to plan for retirement?", category: "Retire" },
  { text: "What is a 401(k)?", category: "Retire" },
  { text: "IRA vs 401(k)?", category: "Retire" },
];

// Mock responses for common financial questions
const mockResponses: { [key: string]: string } = {
  'budget': `Here's a step-by-step guide to create a monthly budget:
1. Calculate your total monthly income
2. List all fixed expenses (rent, utilities, etc.)
3. Track variable expenses (groceries, entertainment)
4. Set savings goals (20% of income recommended)
5. Use the 50/30/20 rule:
   - 50% for needs
   - 30% for wants
   - 20% for savings
6. Monitor and adjust regularly`,

  'saving': `Here are effective tips for saving money:
1. Automate your savings with direct deposits
2. Follow the 24-hour rule for big purchases
3. Use the 50/30/20 budgeting rule
4. Cut unnecessary subscriptions
5. Cook meals at home
6. Look for better deals on insurance
7. Build an emergency fund
8. Use cashback and rewards cards wisely`,

  'invest': `Here are basic investment strategies:
1. Start with an emergency fund
2. Maximize retirement accounts (401k, IRA)
3. Consider low-cost index funds
4. Diversify your portfolio
5. Invest for the long term
6. Research before investing
7. Consider consulting a financial advisor`,

  'debt': `Tips for managing and reducing debt:
1. List all debts with interest rates
2. Use either snowball or avalanche method
3. Make more than minimum payments
4. Consider debt consolidation
5. Negotiate interest rates
6. Create a debt repayment plan
7. Avoid taking on new debt`,

  'expense': `Tips for tracking expenses:
1. Use a budgeting app
2. Keep all receipts
3. Categorize your spending
4. Review expenses weekly
5. Set spending alerts
6. Use cash for discretionary spending
7. Monitor recurring charges`,

  'retire': `Retirement planning essentials:
1. Start saving early to benefit from compound interest
2. Contribute to employer-sponsored plans (401k)
3. Consider opening an IRA
4. Diversify retirement investments
5. Calculate retirement needs
6. Review and adjust plans annually
7. Consider healthcare costs
8. Plan for Social Security benefits`,

  '50/30/20': `The 50/30/20 budgeting rule explained:
1. 50% of income goes to needs:
   - Housing, utilities, food
   - Transportation, insurance
   - Minimum debt payments
2. 30% goes to wants:
   - Entertainment, dining out
   - Shopping, hobbies
   - Vacations
3. 20% goes to savings:
   - Emergency fund
   - Retirement accounts
   - Debt repayment above minimums`,

  'credit': `Tips to improve your credit score:
1. Pay all bills on time
2. Keep credit utilization below 30%
3. Don't close old credit accounts
4. Limit new credit applications
5. Check credit report regularly
6. Dispute any errors
7. Consider a secured credit card
8. Keep a mix of credit types`,

  'emergency': `Building an emergency fund:
1. Start with a goal of $1,000
2. Work towards 3-6 months of expenses
3. Keep it in a separate savings account
4. Make automatic contributions
5. Use windfalls (tax returns, bonuses)
6. Don't touch it for non-emergencies
7. Replenish after using
8. Consider high-yield savings accounts`,

  'grocery': `Tips for saving on groceries:
1. Plan meals and make a list
2. Use cashback apps and coupons
3. Buy generic brands
4. Shop seasonal produce
5. Buy in bulk when practical
6. Compare unit prices
7. Shop at discount stores
8. Avoid shopping when hungry
9. Use store loyalty programs`
};

const getAIResponse = (message: string): string => {
  const lowercaseMsg = message.toLowerCase();
  
  // Check for specific keywords
  if (lowercaseMsg.includes('50/30/20')) return mockResponses['50/30/20'];
  if (lowercaseMsg.includes('credit score')) return mockResponses['credit'];
  if (lowercaseMsg.includes('emergency fund')) return mockResponses['emergency'];
  if (lowercaseMsg.includes('grocery') || lowercaseMsg.includes('groceries')) return mockResponses['grocery'];
  if (lowercaseMsg.includes('retire') || lowercaseMsg.includes('401k') || lowercaseMsg.includes('ira')) return mockResponses['retire'];
  
  // Check for general categories
  if (lowercaseMsg.includes('budget') || lowercaseMsg.includes('monthly') || lowercaseMsg.includes('plan')) return mockResponses['budget'];
  if (lowercaseMsg.includes('save') || lowercaseMsg.includes('saving') || lowercaseMsg.includes('money')) return mockResponses['saving'];
  if (lowercaseMsg.includes('invest') || lowercaseMsg.includes('investment') || lowercaseMsg.includes('stock')) return mockResponses['invest'];
  if (lowercaseMsg.includes('debt') || lowercaseMsg.includes('loan') || lowercaseMsg.includes('credit')) return mockResponses['debt'];
  if (lowercaseMsg.includes('track') || lowercaseMsg.includes('expense') || lowercaseMsg.includes('spending')) return mockResponses['expense'];

  // Default response with suggestions
  return `I'm here to help with your financial questions. You can ask about:
• Budgeting and the 50/30/20 rule
• Saving strategies and emergency funds
• Investment options and retirement
• Debt management and credit scores
• Expense tracking and money-saving tips

Just ask your question and I'll help you out!`;
};

const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat histories from localStorage on component mount
  useEffect(() => {
    const savedHistories = localStorage.getItem('chatHistories');
    if (savedHistories) {
      setChatHistories(JSON.parse(savedHistories));
    }
  }, []);

  // Save current chat to history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const currentChat: ChatHistory = {
        id: Date.now().toString(),
        messages: messages,
        date: Date.now(),
      };
      
      setChatHistories(prev => {
        const updated = [currentChat, ...prev.slice(0, 9)]; // Keep last 10 chats
        localStorage.setItem('chatHistories', JSON.stringify(updated));
        return updated;
      });
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: Date.now() }]);
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: Date.now() }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const exportChat = () => {
    const chatText = messages
      .map(msg => `${msg.role.toUpperCase()} (${new Date(msg.timestamp).toLocaleString()}): ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadChatHistory = (history: ChatHistory) => {
    setMessages(history.messages);
    setShowHistory(false);
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Financial Advisor AI</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 hover:bg-blue-700 rounded-full transition-colors"
            title="Chat History"
          >
            <History className="w-5 h-5" />
          </button>
          <button
            onClick={exportChat}
            className="p-2 hover:bg-blue-700 rounded-full transition-colors"
            title="Export Chat"
            disabled={messages.length === 0}
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="p-2 border-b overflow-x-auto">
        <div className="flex space-x-2">
          {quickQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(q.text)}
              className="px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200 whitespace-nowrap flex items-center space-x-1"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{q.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat History Sidebar */}
      {showHistory && (
        <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg border-l transform translate-x-full">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Chat History</h3>
          </div>
          <div className="overflow-y-auto h-full">
            {chatHistories.map((history) => (
              <button
                key={history.id}
                onClick={() => loadChatHistory(history)}
                className="w-full p-4 text-left hover:bg-gray-50 border-b"
              >
                <div className="text-sm font-medium">
                  {new Date(history.date).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  {history.messages.length} messages
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="w-12 h-12 mx-auto mb-4" />
            <p>Hello! I'm your AI financial advisor. Ask me anything about personal finance, budgeting, or expense management.</p>
            <p className="mt-2 text-sm">Try clicking one of the quick questions above to get started!</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                message.role === 'user' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              {message.role === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div className="flex flex-col">
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-gray-200">
              <Bot className="w-5 h-5 text-gray-600" />
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about personal finance..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiChat; 