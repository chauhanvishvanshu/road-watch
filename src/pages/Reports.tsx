import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { apiService } from '@/lib/api';
import { Download, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ReportData {
  csv_path?: string;
  total_detections?: number;
  total_area?: number;
  avg_confidence?: number;
}

const Reports = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLastReport();
  }, []);

  const fetchLastReport = async () => {
    try {
      setLoading(true);
      const data = await apiService.getLastReport();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report:', error);
      toast.error('Failed to fetch report data');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCsv = async () => {
    try {
      const blob = await apiService.exportCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `detections_${new Date().getTime()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('CSV downloaded successfully');
    } catch (error) {
      console.error('Error downloading CSV:', error);
      toast.error('Failed to download CSV');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Detection Reports</h1>
          <p className="text-muted-foreground">
            View and download your road damage detection reports
          </p>
        </div>

        {loading ? (
          <Card className="p-12 text-center">
            <div className="animate-pulse">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Loading report data...</p>
            </div>
          </Card>
        ) : reportData && reportData.csv_path ? (
          <div className="grid gap-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Latest Detection Report</h2>
                    <p className="text-sm text-muted-foreground">
                      {reportData.csv_path}
                    </p>
                  </div>
                </div>
                <Button onClick={handleDownloadCsv} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download CSV
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Total Detections</p>
                  <p className="text-2xl font-bold">
                    {reportData.total_detections || 0}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Total Area (px)</p>
                  <p className="text-2xl font-bold">
                    {reportData.total_area?.toFixed(0) || 0}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Avg Confidence</p>
                  <p className="text-2xl font-bold">
                    {reportData.avg_confidence 
                      ? `${(reportData.avg_confidence * 100).toFixed(1)}%`
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <Card className="p-12 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Reports Yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload and process a video to generate your first report
            </p>
            <Button asChild>
              <a href="/dashboard">Go to Dashboard</a>
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Reports;
