import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { apiService } from '@/lib/api';
import { Upload, Download, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface DetectionStats {
  detections?: number;
  total_area?: number;
  avg_confidence?: number;
}

const Dashboard = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [detectionStats, setDetectionStats] = useState<DetectionStats>({});
  const [videoFeedKey, setVideoFeedKey] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    try {
      setUploading(true);
      setUploadProgress(0);
      
      await apiService.uploadVideo(file, (progressEvent: any) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(progress);
      });
      
      toast.success('Video uploaded successfully!');
      setUploading(false);
      setProcessing(true);
      setVideoFeedKey(prev => prev + 1); // Force refresh video feed
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload video');
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
    },
    maxFiles: 1,
    disabled: uploading || processing,
  });

  // Polling for processing status and detection stats
  useEffect(() => {
    if (!processing) return;

    const pollInterval = setInterval(async () => {
      try {
        const [statusData, countData] = await Promise.all([
          apiService.getProcessingStatus(),
          apiService.getDetectionCount(),
        ]);

        if (statusData.processing === false) {
          setProcessing(false);
          toast.success('Video processing completed!');
        }

        setDetectionStats(countData);
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [processing]);

  const handleExportCsv = async () => {
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
      toast.success('CSV exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export CSV');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Processing Dashboard</h1>
          <p className="text-muted-foreground">
            Upload videos and monitor real-time detection processing
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          {/* Upload Area */}
          <Card className="p-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                ${(uploading || processing) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input {...getInputProps()} />
              <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
              {uploading ? (
                <div>
                  <p className="text-lg font-semibold mb-4">Uploading video...</p>
                  <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">{uploadProgress}%</p>
                </div>
              ) : processing ? (
                <div>
                  <p className="text-lg font-semibold text-primary">Processing video...</p>
                  <p className="text-sm text-muted-foreground mt-2">Please wait while we analyze the video</p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-semibold mb-2">
                    {isDragActive ? 'Drop video here' : 'Drag & drop video or click to browse'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports MP4, AVI, MOV, MKV formats
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Video Feed */}
          {processing && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Processing Feed
              </h3>
              <div className="bg-black rounded-lg overflow-hidden">
                <img
                  key={videoFeedKey}
                  src={apiService.getVideoFeedUrl()}
                  alt="Video processing feed"
                  className="w-full h-auto"
                  onError={(e) => {
                    console.error('Video feed error');
                  }}
                />
              </div>
            </Card>
          )}

          {/* Detection Stats */}
          {(processing || detectionStats.detections !== undefined) && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Detection Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">Total Detections</p>
                  </div>
                  <p className="text-3xl font-bold">{detectionStats.detections || 0}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">Total Area (px)</p>
                  </div>
                  <p className="text-3xl font-bold">
                    {detectionStats.total_area?.toFixed(0) || 0}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">Avg Confidence</p>
                  </div>
                  <p className="text-3xl font-bold">
                    {detectionStats.avg_confidence
                      ? `${(detectionStats.avg_confidence * 100).toFixed(1)}%`
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleExportCsv} className="gap-2">
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
                <Button asChild variant="outline">
                  <Link to="/reports" className="gap-2">
                    <FileText className="h-4 w-4" />
                    View Reports
                  </Link>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
