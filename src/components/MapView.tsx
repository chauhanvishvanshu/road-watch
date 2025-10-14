import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { format } from 'date-fns';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const getSeverityColor = (severity: string): "default" | "secondary" | "destructive" | "outline" | "warning" => {
  switch (severity) {
    case 'Critical':
      return 'destructive';
    case 'High':
      return 'warning';
    case 'Medium':
      return 'secondary';
    case 'Low':
      return 'default';
    default:
      return 'default';
  }
};

const MapView = () => {
  const { detections } = useApp();

  if (detections.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
            <svg
              className="h-8 w-8 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">No detections yet</h3>
          <p className="text-sm text-muted-foreground">
            Upload a video to start detecting road damage
          </p>
        </div>
      </Card>
    );
  }

  const center: L.LatLngExpression = [
    detections[0]?.latitude || 40.7128,
    detections[0]?.longitude || -74.006,
  ];

  return (
    <Card className="overflow-hidden">
      <div className="h-[600px] w-full relative">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {detections.filter(d => d.latitude && d.longitude).map((detection) => (
            <Marker
              key={detection.frame_index}
              position={[detection.latitude, detection.longitude] as L.LatLngExpression}
            >
              <Popup>
                <div className="p-2 min-w-[220px]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold capitalize">{detection.class_name}</h4>
                    <Badge variant={getSeverityColor(detection.severity)}>
                      {detection.severity}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Confidence:</span> {(detection.confidence * 100).toFixed(1)}%
                    </p>
                    <p>
                      <span className="font-medium">Frame:</span> #{detection.frame_index}
                    </p>
                    <p>
                      <span className="font-medium">BBox Area:</span> {detection.bbox_area_px.toLocaleString()}px
                    </p>
                    <p>
                      <span className="font-medium">Location:</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {detection.latitude.toFixed(4)}, {detection.longitude.toFixed(4)}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {detection.timestamp}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
};

export default MapView;
