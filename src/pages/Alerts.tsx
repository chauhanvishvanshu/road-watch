import Navbar from '@/components/Navbar';
import AlertPanel from '@/components/AlertPanel';
import { Bell } from 'lucide-react';

const Alerts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <Bell className="h-6 w-6 text-warning" />
            </div>
            <h1 className="text-4xl font-bold">Alert Management</h1>
          </div>
          <p className="text-muted-foreground">
            Review and send alerts for critical road damage to local authorities
          </p>
        </div>

        <AlertPanel />
      </main>
    </div>
  );
};

export default Alerts;
