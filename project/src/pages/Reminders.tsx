import { RemindersManager } from '../components/RemindersManager';
import { Toaster } from 'react-hot-toast';

export default function Reminders() {
  return (
    <div>
      <Toaster position="top-right" />
      <RemindersManager />
    </div>
  );
} 