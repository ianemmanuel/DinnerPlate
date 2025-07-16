"use client";

import { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@restaurant-webapp/components/ui/card";
import { Button } from "@restaurant-webapp/components/ui/button";
import { Upload, X, Image as ImageIcon, Camera } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { MealFormData } from "@restaurant-webapp/lib/validators/meal-validators"

interface ImageUploadSectionProps {
  form: UseFormReturn<MealFormData>;
}

export function ImageUploadSection({ form }: ImageUploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0 && !mainImagePreview) {
      // Set first image as main
      const firstFile = imageFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainImagePreview(e.target?.result as string);
        form.setValue('images.main', firstFile);
      };
      reader.readAsDataURL(firstFile);
      
      // Set remaining images as gallery
      const remainingFiles = imageFiles.slice(1, 6); // Max 5 gallery images
      remainingFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setGalleryPreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
      
      const currentGallery = form.getValues('images.gallery') || [];
      form.setValue('images.gallery', [...currentGallery, ...remainingFiles]);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainImagePreview(e.target?.result as string);
        form.setValue('images.main', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const currentGallery = form.getValues('images.gallery') || [];
    const remainingSlots = 5 - currentGallery.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);
    
    filesToAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGalleryPreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
    
    form.setValue('images.gallery', [...currentGallery, ...filesToAdd]);
  };

  const removeMainImage = () => {
    setMainImagePreview(null);
    form.setValue('images.main', null);
  };

  const removeGalleryImage = (index: number) => {
    const currentGallery = form.getValues('images.gallery') || [];
    const newGallery = currentGallery.filter((_, i) => i !== index);
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    
    form.setValue('images.gallery', newGallery);
    setGalleryPreviews(newPreviews);
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5" />
            <span>Images</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            High-quality images are crucial for attracting customers. Upload a main thumbnail image and up to 5 gallery images 
            showing different angles, ingredients, or serving suggestions.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Image */}
        <div>
          <h3 className="text-sm font-medium mb-3">Main Image (Thumbnail)</h3>
          {mainImagePreview ? (
            <div className="relative inline-block">
              <img
                src={mainImagePreview}
                alt="Main meal image"
                className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-dashed border-muted-foreground/25"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                onClick={removeMainImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className={`w-full max-w-md h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('main-image-input')?.click()}
            >
              <Camera className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                Drag & drop or click to upload main image
              </p>
              <p className="text-xs text-muted-foreground/75 mt-1">
                PNG, JPG up to 10MB
              </p>
            </div>
          )}
          <input
            id="main-image-input"
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="hidden"
          />
        </div>

        {/* Gallery Images */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Gallery Images (Up to 5)</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('gallery-input')?.click()}
              disabled={galleryPreviews.length >= 5}
            >
              <Upload className="h-4 w-4 mr-2" />
              Add Images
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryPreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={() => removeGalleryImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            
            {galleryPreviews.length < 5 && (
              <div
                className="w-full h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => document.getElementById('gallery-input')?.click()}
              >
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          
          <input
            id="gallery-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryImageChange}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
}