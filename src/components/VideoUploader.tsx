import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Video, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { mockDetections } from '@/data/mockDetections';
import { toast } from 'sonner';

const VideoUploader = () => {
  const { setCurrentVideo, uploadProgress, setUploadProgress, setDetections } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setCurrentVideo(file);
      setPreview(URL.createObjectURL(file));
      setIsComplete(false);

      // Simulate upload
      setUploadProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
          setUploadProgress(100);
          simulateProcessing();
        } else {
          setUploadProgress(progress);
        }
      }, 200);
    },
    [setCurrentVideo, setUploadProgress]
  );

  const simulateProcessing = () => {
    setIsProcessing(true);
    toast.info('Processing video...', {
      description: 'AI is analyzing road conditions',
    });

    setTimeout(() => {
      setDetections(mockDetections);
      setIsProcessing(false);
      setIsComplete(true);
      toast.success('Processing complete!', {
        description: `Detected ${mockDetections.length} road damage instances`,
      });
    }, 3000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-6">
      <Card
        {...getRootProps()}
        className={`border-2 border-dashed cursor-pointer transition-all hover:border-primary/50 ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-border'
        }`}
      >
        <input {...getInputProps()} />
        <div className="p-12 text-center">
          <div className="flex justify-center mb-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isDragActive ? 'bg-primary/10' : 'bg-muted'
              }`}
            >
              <Upload className={`h-8 w-8 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {isDragActive ? 'Drop your video here' : 'Upload Road Video'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop a video file, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supported formats: MP4, AVI, MOV, MKV
          </p>
        </div>
      </Card>

      {preview && (
        <Card className="p-6 space-y-4 animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Video className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Video Preview</p>
                <p className="text-sm text-muted-foreground">Ready for analysis</p>
              </div>
            </div>
            {isComplete && (
              <CheckCircle className="h-6 w-6 text-success" />
            )}
          </div>

          <video
            src={preview}
            controls
            className="w-full rounded-lg max-h-64 bg-black"
          />

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {isProcessing && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm font-medium">Processing video with AI...</span>
            </div>
          )}

          {isComplete && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <p className="text-sm font-medium text-success-foreground">
                ✓ Analysis complete! Check the Results tab to view detected road damage.
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default VideoUploader;
