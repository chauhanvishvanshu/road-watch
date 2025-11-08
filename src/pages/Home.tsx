import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, BarChart3, FileText, Map, Shield, Zap, Brain } from 'lucide-react';

const Home = () => {
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
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Zap className="h-4 w-4" />
              AI-Powered Road Damage Detection
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Road Watch
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Detect and analyze road damage automatically with cutting-edge AI technology.
              Upload videos, get instant results, and export comprehensive reports.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/dashboard">
                  <Upload className="h-5 w-5 mr-2" />
                  Start Processing
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/reports">
                  <FileText className="h-5 w-5 mr-2" />
                  View Reports
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-background border-primary/20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload your road footage and let our AI do the heavy lifting.
              Get detailed insights in minutes.
            </p>
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/dashboard">
                <Upload className="h-5 w-5 mr-2" />
                Upload Video Now
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Road Watch. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/reports" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Reports
              </Link>
              <Link to="/results" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Results
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
