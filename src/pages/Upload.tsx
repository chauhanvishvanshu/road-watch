import Navbar from '@/components/Navbar';
import VideoUploader from '@/components/VideoUploader';
import { FileVideo, Zap, Shield, BarChart3, Brain, Map, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Upload = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms detect potholes, cracks, and road damage with high accuracy.',
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Watch your videos being processed live with instant detection feedback and visual overlays.',
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Comprehensive statistics and insights about detected road damage patterns and severity levels.',
    },
    {
      icon: Map,
      title: 'GPS Mapping',
      description: 'Visualize detected damage on interactive maps with precise location coordinates.',
    },
    {
      icon: FileText,
      title: 'Export Reports',
      description: 'Generate and download detailed CSV reports for further analysis and documentation.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is processed securely with industry-standard encryption and privacy protection.',
    },
  ];

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

        <div className="max-w-3xl mx-auto animate-slide-up mb-16">
          <VideoUploader />
        </div>

        {/* Powerful Features Section */}
        <section className="py-16 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to detect, analyze, and report road damage efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

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
