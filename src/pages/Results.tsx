import Navbar from '@/components/Navbar';
import MapView from '@/components/MapView';
import ResultsTable from '@/components/ResultsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, Table } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';

const Results = () => {
  const { detections } = useApp();

  const criticalCount = detections.filter((d) => d.severity === 'Critical').length;
  const highCount = detections.filter((d) => d.severity === 'High').length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Detection Results</h1>
          <p className="text-muted-foreground">
            View detected road damage on the map or in detailed table format
          </p>
        </div>

        {detections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Detections</p>
              <p className="text-3xl font-bold">{detections.length}</p>
            </Card>
            <Card className="p-6 border-destructive/20 bg-destructive/5">
              <p className="text-sm font-medium text-muted-foreground mb-1">Critical</p>
              <p className="text-3xl font-bold text-destructive">{criticalCount}</p>
            </Card>
            <Card className="p-6 border-warning/20 bg-warning/5">
              <p className="text-sm font-medium text-muted-foreground mb-1">High Priority</p>
              <p className="text-3xl font-bold text-warning">{highCount}</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">Avg Confidence</p>
              <p className="text-3xl font-bold">
                {(detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length * 100).toFixed(1)}%
              </p>
            </Card>
          </div>
        )}

        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <Map className="h-4 w-4" />
              <span>Map View</span>
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center space-x-2">
              <Table className="h-4 w-4" />
              <span>Table View</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="animate-fade-in">
            <MapView />
          </TabsContent>

          <TabsContent value="table" className="animate-fade-in">
            <ResultsTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Results;
