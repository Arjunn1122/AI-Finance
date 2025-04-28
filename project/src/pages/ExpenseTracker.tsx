import { ExpenseTracker as ExpenseTrackerComponent } from '../components/ExpenseTracker';
import { Toaster } from 'react-hot-toast';

export default function ExpenseTracker() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <ExpenseTrackerComponent />
    </div>
  );
}