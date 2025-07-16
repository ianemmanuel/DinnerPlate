'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignupStore } from '@restaurant-webapp/lib/store/signup-store';
import { Button } from '@restaurant-webapp/components/ui/button';
import { Input } from '@restaurant-webapp/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@restaurant-webapp/components/ui/form';
import { 
  businessProfileSchema, 
  BusinessProfileFormValues 
} from '@restaurant-webapp/lib/validators/signup-validators';
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@restaurant-webapp/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs'
import { BusinessType } from '@restaurant-webapp/lib/store/signup-store'
import { FileUploader } from './FileUploader'
import { MapPin, Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@restaurant-webapp/components/ui/alert'

// Sample countries list
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'in', label: 'India' },
  { value: 'ng', label: 'Nigeria' },
];

interface BusinessProfileStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function BusinessProfileStep({ onNext, onBack }: BusinessProfileStepProps) {
  const { 
    businessType,
    legalBusinessName,
    businessPhone,
    country,
    city,
    street,
    postalCode,
    latitude,
    longitude,
    documents,
    updateField,
    updateDocument
  } = useSignupStore();
  
  const [activeTab, setActiveTab] = useState('details');
  const [isUploading, setIsUploading] = useState(false);
  
  
  const form = useForm<BusinessProfileFormValues>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      legalBusinessName: legalBusinessName || '',
      businessPhone: businessPhone || '',
      country: country || '',
      city: city || '',
      street: street || '',
      postalCode: postalCode || '',
      latitude: latitude || null,
      longitude: longitude || null,
    },
  });

  console.log('Manu')
  const onSubmit = async (data: BusinessProfileFormValues) => {
    // Check if documents are uploaded
    const isMissingDocuments = !documents.businessLicense || !documents.healthCertificate;
    
    if (isMissingDocuments) {
      setActiveTab('documents');
      toast.error('Required documents missing', {
        description: 'Please upload all required documents before proceeding.',
      });
      return;
    }
    
    // Update store
    updateField('legalBusinessName', data.legalBusinessName);
    updateField('businessPhone', data.businessPhone);
    updateField('country', data.country);
    updateField('city', data.city);
    updateField('street', data.street);
    updateField('postalCode', data.postalCode);
    updateField('latitude', data.latitude);
    updateField('longitude', data.longitude);
    
    onNext();
  };

  const handleMapPinDrop = () => {
    // In a real app, this would open a map component to select a location
    // For demo purposes, we'll set random coordinates
    const lat = 40.7128 + (Math.random() - 0.5) * 0.1;
    const lng = -74.0060 + (Math.random() - 0.5) * 0.1;
    
    form.setValue('latitude', lat);
    form.setValue('longitude', lng);
    
    toast.success('Location pinned', {
      description: `Your business location has been set at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    });
  };

  const handleFileUpload = (
    type: 'businessLicense' | 'healthCertificate' | 'nationalId',
    file: File
  ) => {
    setIsUploading(true);
    
    // In a real app, we would upload the file to the server
    // For demonstration, we'll simulate an upload with a timeout
    setTimeout(() => {
      const documentFile = {
        id: Math.random().toString(36).substring(7),
        file,
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
      };
      
      updateDocument(type, documentFile);
      setIsUploading(false);
      
      toast.success('File uploaded', {
        description: `${file.name} has been uploaded successfully.`,
      });
    }, 1500);
  };

  const getDocumentRequirements = (type: BusinessType | null) => {
    if (type === 'restaurant') {
      return [
        'Valid business license issued by local authorities',
        'Current health department certificate/permit',
        'Proof of food safety certification',
        'Liquor license (if applicable)'
      ];
    } else {
      return [
        'Commercial kitchen license or permit',
        'Health department certification',
        'Food handler certification',
        'Business registration documents'
      ];
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Business Profile
      </h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="details">Business Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="legalBusinessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legal Business Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Legal name of your business" {...field} />
                    </FormControl>
                    <FormDescription>
                      This name will be used for legal and tax purposes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="businessPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormDescription>
                      This number will be used for verification and customer contact.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="py-2">
                <h3 className="text-sm font-medium mb-2">
                  Business Type
                </h3>
                <div className="p-3 bg-muted rounded-md">
                  {businessType === 'restaurant' ? 'Restaurant' : 'Commercial Kitchen'}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-md font-medium">Business Address</h3>
                
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Postal code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="py-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleMapPinDrop}
                    className="w-full"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Drop Pin on Map
                  </Button>
                  
                  {form.getValues().latitude && form.getValues().longitude && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Location set at {form.getValues().latitude?.toFixed(4)}, {form.getValues().longitude?.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                >
                  Back
                </Button>
                
                <div className="space-x-2">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab('documents')}
                  >
                    Next: Documents
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="documents">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Document Requirements</AlertTitle>
            <AlertDescription>
              <p className="mb-2">Please upload the following documents:</p>
              <ul className="list-disc pl-5 space-y-1">
                {getDocumentRequirements(businessType).map((req, index) => (
                  <li key={index} className="text-sm">{req}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium mb-3">Business License</h3>
              <FileUploader
                label="Upload Business License"
                description="PDF, JPG or PNG (max. 5MB)"
                accepted=".pdf,.jpg,.jpeg,.png"
                maxSize={5 * 1024 * 1024}
                onUpload={(file) => handleFileUpload('businessLicense', file)}
                currentFile={documents.businessLicense}
                isRequired={true}
              />
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-3">Health Certificate</h3>
              <FileUploader
                label="Upload Health Certificate"
                description="PDF, JPG or PNG (max. 5MB)"
                accepted=".pdf,.jpg,.jpeg,.png"
                maxSize={5 * 1024 * 1024}
                onUpload={(file) => handleFileUpload('healthCertificate', file)}
                currentFile={documents.healthCertificate}
                isRequired={true}
              />
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-3">National ID / Passport (Optional)</h3>
              <FileUploader
                label="Upload ID Document"
                description="PDF, JPG or PNG (max. 5MB)"
                accepted=".pdf,.jpg,.jpeg,.png"
                maxSize={5 * 1024 * 1024}
                onUpload={(file) => handleFileUpload('nationalId', file)}
                currentFile={documents.nationalId}
                isRequired={false}
              />
            </div>
            
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab('details')}
              >
                Back to Details
              </Button>
              
              <Button 
                onClick={form.handleSubmit(onSubmit)}
                disabled={isUploading}
              >
                Continue
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}