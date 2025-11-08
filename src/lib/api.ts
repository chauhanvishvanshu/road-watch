import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://vishvanshu-pothole-backend.hf.space';

const api = axios.create({
  baseURL: API_BASE,
});

export const apiService = {
  // Health check
  ping: async () => {
    const response = await api.get('/ping');
    return response.data;
  },

  // Upload video
  uploadVideo: async (file: File, onUploadProgress?: (progressEvent: any) => void) => {
    const formData = new FormData();
    formData.append('video', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response.data;
  },

  // Get video feed URL
  getVideoFeedUrl: () => `${API_BASE}/video_feed`,

  // Get detection count
  getDetectionCount: async () => {
    const response = await api.get('/detection_count');
    return response.data;
  },

  // Get processing status
  getProcessingStatus: async () => {
    const response = await api.get('/processing_status');
    return response.data;
  },

  // Get last report
  getLastReport: async () => {
    const response = await api.get('/last_report');
    return response.data;
  },

  // Get report file URL
  getReportUrl: (filename: string) => `${API_BASE}/reports/${filename}`,

  // Export CSV
  exportCsv: async () => {
    const response = await api.get('/export_csv', {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
