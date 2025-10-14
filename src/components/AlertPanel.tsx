import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import { Bell, Send, AlertTriangle, CheckCircle } from 'lucide-react';

const AlertPanel = () => {
  const { detections } = useApp();
  const [sentAlerts, setSentAlerts] = useState<Set<string>>(new Set());

  const criticalDetections = detections.filter((d) => d.severity === 'Critical' || d.severity === 'High');

  const handleSendAlert = (id: string, damageType: string) => {
    setSentAlerts((prev) => new Set(prev).add(id));
    toast.success('Alert sent successfully!', {
      description: `Authorities notified about ${damageType}`,
    });
  };

  if (detections.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
            <Bell className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No alerts available</h3>
          <p className="text-sm text-muted-foreground">
            Process a video to generate alerts for critical road damage
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-warning/10 border-warning/20">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Critical Alerts</h3>
            <p className="text-sm text-muted-foreground">
              {criticalDetections.length} high-priority issues detected that require immediate attention
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {criticalDetections.map((detection) => {
          const isSent = sentAlerts.has(detection.id);

          return (
            <Card key={detection.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-lg">{detection.damageType}</h4>
                    <Badge variant={detection.severity === 'Critical' ? 'destructive' : 'warning' as const}>
                      {detection.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Detected at {new Date(detection.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Depth</p>
                  <p className="text-lg font-semibold">{detection.depth} cm</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="text-sm font-mono">
                    {detection.latitude.toFixed(4)}, {detection.longitude.toFixed(4)}
                  </p>
                </div>
              </div>

              {isSent ? (
                <div className="flex items-center space-x-2 text-success">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Alert sent to authorities</span>
                </div>
              ) : (
                <Button
                  onClick={() => handleSendAlert(detection.id, detection.damageType)}
                  className="w-full"
                  variant="default"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Alert to Authorities
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      {criticalDetections.length === 0 && (
        <Card className="p-8 text-center">
          <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
          <h3 className="font-semibold mb-2">All Clear!</h3>
          <p className="text-sm text-muted-foreground">
            No critical road damage detected in the analyzed video
          </p>
        </Card>
      )}
    </div>
  );
};

export default AlertPanel;
