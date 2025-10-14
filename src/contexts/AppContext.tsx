import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Detection {
  id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  damageType: 'Pothole' | 'Crack' | 'Patch' | 'Debris';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  depth: number;
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

const AppContext = createContext<AppContextType | undefined>(undefined);

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
