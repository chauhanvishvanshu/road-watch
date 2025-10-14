import Navbar from '@/components/Navbar';
import VideoUploader from '@/components/VideoUploader';
import { FileVideo, Zap, Shield, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Upload = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Road Damage Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload road videos and let AI identify potholes and damage with precision
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <FileVideo className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Upload Video</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop your road inspection videos in any format
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Advanced computer vision detects and classifies road damage
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">View Results</h3>
            <p className="text-sm text-muted-foreground">
              Get detailed maps, tables, and insights for maintenance planning
            </p>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto animate-slide-up">
          <VideoUploader />
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-muted rounded-full">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Secure & Private Processing</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
