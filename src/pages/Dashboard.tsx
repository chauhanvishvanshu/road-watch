import Navbar from '@/components/Navbar';
import ChatbotPanel from '@/components/ChatbotPanel';
import { Card } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const { detections } = useApp();

  // Prepare chart data
  const damageTypeData = [
    {
      name: 'Pothole',
      count: detections.filter((d) => d.damageType === 'Pothole').length,
    },
    {
      name: 'Crack',
      count: detections.filter((d) => d.damageType === 'Crack').length,
    },
    {
      name: 'Patch',
      count: detections.filter((d) => d.damageType === 'Patch').length,
    },
    {
      name: 'Debris',
      count: detections.filter((d) => d.damageType === 'Debris').length,
    },
  ];

  const severityData = [
    {
      name: 'Critical',
      count: detections.filter((d) => d.severity === 'Critical').length,
    },
    {
      name: 'High',
      count: detections.filter((d) => d.severity === 'High').length,
    },
    {
      name: 'Medium',
      count: detections.filter((d) => d.severity === 'Medium').length,
    },
    {
      name: 'Low',
      count: detections.filter((d) => d.severity === 'Low').length,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of road damage detections and trends
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{detections.length}</h3>
            <p className="text-sm text-muted-foreground">Total Detections</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {detections.filter((d) => d.severity === 'Critical').length}
            </h3>
            <p className="text-sm text-muted-foreground">Critical Issues</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {detections.length > 0
                ? ((detections.filter((d) => d.severity === 'Low').length / detections.length) * 100).toFixed(0)
                : 0}
              %
            </h3>
            <p className="text-sm text-muted-foreground">Low Severity</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Damage by Type</h3>
            {detections.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={damageTypeData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Damage by Severity</h3>
            {detections.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={severityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--warning))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
          <ChatbotPanel />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
