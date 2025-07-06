import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  Star,
  Eye,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in MB
  onFilesChange?: (files: UploadedFile[]) => void;
  initialFiles?: UploadedFile[];
  uploadType?: "documents" | "images";
  allowPrimarySelection?: boolean;
  className?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadProgress?: number;
  isPrimary?: boolean;
}

export function FileUpload({
  accept = "*",
  maxFiles = 10,
  maxSize = 10,
  onFilesChange,
  initialFiles = [],
  uploadType = "images",
  allowPrimarySelection = false,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (selectedFiles: FileList) => {
      const newFiles: UploadedFile[] = [];

      Array.from(selectedFiles).forEach((file) => {
        if (files.length + newFiles.length >= maxFiles) return;
        if (file.size > maxSize * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB`);
          return;
        }

        const fileUrl = URL.createObjectURL(file);
        const uploadedFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          url: fileUrl,
          uploadProgress: 0,
          isPrimary:
            files.length === 0 &&
            newFiles.length === 0 &&
            allowPrimarySelection,
        };

        newFiles.push(uploadedFile);

        // Simulate upload progress
        const interval = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id
                ? {
                    ...f,
                    uploadProgress: Math.min((f.uploadProgress || 0) + 10, 100),
                  }
                : f,
            ),
          );
        }, 100);

        setTimeout(() => {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id ? { ...f, uploadProgress: 100 } : f,
            ),
          );
        }, 1000);
      });

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    },
    [files, maxFiles, maxSize, onFilesChange, allowPrimarySelection],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        handleFileSelect(droppedFiles);
      }
    },
    [handleFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter((f) => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const setPrimaryFile = (fileId: string) => {
    const updatedFiles = files.map((f) => ({
      ...f,
      isPrimary: f.id === fileId,
    }));
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragOver ? "border-primary bg-primary/5" : "border-gray-300",
          "hover:border-primary hover:bg-primary/5 cursor-pointer",
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm font-medium mb-1">
          Drop {uploadType} here or click to browse
        </p>
        <p className="text-xs text-gray-500">
          Maximum {maxFiles} files, {maxSize}MB each
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Uploaded {uploadType} ({files.length}/{maxFiles})
          </p>
          <div
            className={cn(
              "grid gap-2",
              uploadType === "images"
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1",
            )}
          >
            {files.map((file) => (
              <Card key={file.id} className="relative">
                <CardContent className="p-3">
                  {uploadType === "images" && file.type.startsWith("image/") ? (
                    <div className="relative">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-24 object-cover rounded"
                      />
                      {allowPrimarySelection && (
                        <Button
                          size="sm"
                          variant={file.isPrimary ? "default" : "outline"}
                          className="absolute top-1 left-1 p-1 h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPrimaryFile(file.id);
                          }}
                        >
                          <Star
                            className={cn(
                              "w-3 h-3",
                              file.isPrimary && "fill-current",
                            )}
                          />
                        </Button>
                      )}
                      <div className="absolute top-1 right-1 flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="p-1 h-6 w-6 bg-white/80"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(file.url, "_blank");
                          }}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="p-1 h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(file.id);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="p-1 h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            const link = document.createElement("a");
                            link.href = file.url;
                            link.download = file.name;
                            link.click();
                          }}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="p-1 h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(file.id);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {file.uploadProgress !== undefined &&
                    file.uploadProgress < 100 && (
                      <div className="mt-2">
                        <Progress value={file.uploadProgress} className="h-1" />
                      </div>
                    )}

                  {file.isPrimary && allowPrimarySelection && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-1 -right-1 text-xs"
                    >
                      Primary
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
