import { createContext, useContext, useState, ReactNode } from 'react';

export interface Detection {
  frame_index: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  class_id: number;
  class_name: string;
  confidence: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  bbox_area_px: number;
  frame_w: number;
  frame_h: number;
  severity: string;
  imageUrl?: string;
}

interface AppContextType {
  detections: Detection[];
  setDetections: (detections: Detection[]) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  currentVideo: File | null;
  setCurrentVideo: (video: File | null) => void;
  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
}

const AppContext = createContext<AppContextType>({
  detections: [],
  setDetections: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  currentVideo: null,
  setCurrentVideo: () => {},
  uploadProgress: 0,
  setUploadProgress: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  return (
    <AppContext.Provider
      value={{
        detections,
        setDetections,
        isAuthenticated,
        setIsAuthenticated,
        currentVideo,
        setCurrentVideo,
        uploadProgress,
        setUploadProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
