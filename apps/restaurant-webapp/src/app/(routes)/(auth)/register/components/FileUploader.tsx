'use client'

import { useState, useRef } from 'react'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Input } from '@restaurant-webapp/components/ui/input'
import { toast } from 'sonner'
import { DocumentFile } from '@restaurant-webapp/lib/store/signup-store'
import { Check, File, Upload, X, Loader2 } from 'lucide-react'

interface FileUploaderProps {
  label: string;
  description: string;
  accepted: string;
  maxSize: number;
  onUpload: (file: File) => void;
  currentFile: DocumentFile | null;
  isRequired: boolean;
}

export function FileUploader({
  label,
  description,
  accepted,
  maxSize,
  onUpload,
  currentFile,
  isRequired,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUploadFile(e.target.files[0]);
    }
  };

  const validateAndUploadFile = (file: File) => {
    // Check file type
    const fileType = file.type;
    const validTypes = accepted.split(',').map(type => {
      return type.replace('.', '').replace('jpeg', 'jpg');
    });
    
    const isValidType = validTypes.some(type => {
      if (type === 'pdf') return fileType === 'application/pdf';
      if (type === 'jpg') return fileType === 'image/jpeg' || fileType === 'image/jpg';
      if (type === 'png') return fileType === 'image/png';
      return false;
    });
    
    if (!isValidType) {
      toast.error('Invalid file type', {
        description: `Please upload a file with one of the following formats: ${accepted}`,
      });
      return;
    }
    
    // Check file size
    if (file.size > maxSize) {
      toast.error('File too large', {
        description: `File size must be less than ${maxSize / (1024 * 1024)}MB`,
      });
      return;
    }
    
    // Upload file
    setIsUploading(true);
    onUpload(file);
    setIsUploading(false);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = () => {
    // In a real app, you would handle file deletion here
    // For now, we'll just reset the currentFile
    onUpload(new File([], "empty"));
  };

  return (
    <div>
      {!currentFile || !currentFile.url ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Input
            type="file"
            ref={fileInputRef}
            accept={accepted}
            onChange={handleFileInputChange}
            className="hidden"
            id={`file-upload-${label}`}
          />
          
          <label
            htmlFor={`file-upload-${label}`}
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium mb-1">{label}</p>
            <p className="text-xs text-muted-foreground mb-3">{description}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Select File'
              )}
            </Button>
            {isRequired && (
              <p className="text-xs text-muted-foreground mt-2">
                * Required
              </p>
            )}
          </label>
        </div>
      ) : (
        <div className="border rounded-lg p-4 flex items-start justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-primary/10 rounded-md mr-3">
              <File className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium truncate max-w-[200px]">{currentFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(currentFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-green-600"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={handleRemoveFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}