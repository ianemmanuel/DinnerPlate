'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@restaurant-webapp/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Input } from '@restaurant-webapp/components/ui/input'
import { Textarea } from '@restaurant-webapp/components/ui/textarea'
import { Switch } from '@restaurant-webapp/components/ui/switch'
import { Checkbox } from '@restaurant-webapp/components/ui/checkbox'
import { VendorProfileFormData, vendorProfileSchema } from '@restaurant-webapp/lib/validators/profile-validators'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@restaurant-webapp/components/ui/form'
import { 
  Save, 
  Loader2, 
  Clock, 
  User, 
  Globe, 
  Upload, 
  X, 
  Plus,
  Camera,
  Image as ImageIcon
} from 'lucide-react'
import { daysOfWeek, cuisineTypes, socialPlatforms } from '@restaurant-webapp/lib/data/profileData'
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useAuthStore } from '@restaurant-webapp/lib/store/auth-store'
import Loader from '@restaurant-webapp/components/shared/Loader'
import { API_ENDPOINTS } from '@restaurant-webapp/lib/endpoints'
import { toast } from "sonner"

interface ImagePreview {
  file: File
  url: string
  id: string
} 
 
const CreateProfileForm = () => {
  const router = useRouter()
  const { vendor, isLoading: authLoading } = useAuthStore()
  
  const [avatarPreview, setAvatarPreview] = useState<ImagePreview | null>(null)
  const [coverPreview, setCoverPreview] = useState<ImagePreview | null>(null)
  const [galleryPreviews, setGalleryPreviews] = useState<ImagePreview[]>([])
  const [socialLinks, setSocialLinks] = useState<Array<{ platform: string; url: string }>>([])
  const [showCustomCuisine, setShowCustomCuisine] = useState(false)
  
  const form = useForm<VendorProfileFormData>({
    resolver: zodResolver(vendorProfileSchema) as any,
    defaultValues: {
      vendorId: '',
      bio: '',
      cuisines: [],
      customCuisine: '',
      website: '',
      socialLinks: [],
      images: [],
      openingHours: {
        monday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        tuesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        wednesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        thursday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        friday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        saturday: { isOpen: false, openTime: '', closeTime: '' },
        sunday: { isOpen: false, openTime: '', closeTime: '' }
      }
    }
  })

  const watchedCuisines = form.watch('cuisines')

  useEffect(() => {
    if (vendor && !authLoading) {
      form.setValue('vendorId', vendor.id)
    }
  }, [vendor, authLoading, form])

  useEffect(() => {
    setShowCustomCuisine(watchedCuisines?.includes('other') || false)
  }, [watchedCuisines])

  const createImagePreview = useCallback((file: File): ImagePreview => {
    return {
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }
  }, [])

  const handleImageUpload = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'avatar' | 'cover' | 'gallery'
  ) => {
    const files = event.target.files
    if (!files) return

    if (type === 'avatar' && files[0]) {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview.url)
      }
      setAvatarPreview(createImagePreview(files[0]))
    } else if (type === 'cover' && files[0]) {
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview.url)
      }
      setCoverPreview(createImagePreview(files[0]))
    } else if (type === 'gallery') {
      const newPreviews = Array.from(files).map(createImagePreview)
      setGalleryPreviews(prev => [...prev, ...newPreviews])
    }
  }, [avatarPreview, coverPreview, createImagePreview])

  const removeImage = useCallback((type: 'avatar' | 'cover' | 'gallery', id?: string) => {
    if (type === 'avatar' && avatarPreview) {
      URL.revokeObjectURL(avatarPreview.url)
      setAvatarPreview(null)
    } else if (type === 'cover' && coverPreview) {
      URL.revokeObjectURL(coverPreview.url)
      setCoverPreview(null)
    } else if (type === 'gallery' && id) {
      setGalleryPreviews(prev => {
        const imageToRemove = prev.find(img => img.id === id)
        if (imageToRemove) {
          URL.revokeObjectURL(imageToRemove.url)
        }
        return prev.filter(img => img.id !== id)
      })
    }
  }, [avatarPreview, coverPreview])

  const addSocialLink = useCallback(() => {
    setSocialLinks(prev => [...prev, { platform: '', url: '' }])
  }, [])

  const removeSocialLink = useCallback((index: number) => {
    setSocialLinks(prev => prev.filter((_, i) => i !== index))
  }, [])

  const updateSocialLink = useCallback((index: number, field: 'platform' | 'url', value: string) => {
    setSocialLinks(prev => prev.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    ))
  }, [])

  const createProfileMutation = useMutation({
    mutationFn: async (data: VendorProfileFormData) => {
      // Here you would typically upload images to AWS S3 first
      // For now, we'll just send the form data
      const formData = {
        ...data,
        socialLinks: socialLinks.filter(link => link.platform && link.url),
        avatar: avatarPreview?.file.name,
        coverBanner: coverPreview?.file.name,
        images: galleryPreviews.map(img => img.file.name)
      }
      
      const response = await axios.post(API_ENDPOINTS.PROFILE.CREATE_PROFILE, formData)
      return response.data
    },
    onSuccess: () => {
      toast.success("Your restaurant profile has been created successfully!")
      router.push('/dashboard/onBoarding')
    },
    onError: (error: AxiosError) => {
      let errorMessage = "Failed to create profile. Please try again."
      if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
        errorMessage = error.response.data.message as string
      }
      toast.error(errorMessage)
    }
  })

  const onSubmit = useCallback((data: VendorProfileFormData) => {
    createProfileMutation.mutate({
      ...data,
      socialLinks: socialLinks.filter(link => link.platform && link.url)
    })
  }, [createProfileMutation, socialLinks])

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview.url)
      if (coverPreview) URL.revokeObjectURL(coverPreview.url)
      galleryPreviews.forEach(img => URL.revokeObjectURL(img.url))
    }
  }, [avatarPreview, coverPreview, galleryPreviews])

  if (authLoading || !vendor) {
    return <Loader message='Preparing your profile form...' />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden Vendor ID Field */}
        <FormField
          control={form.control}
          name="vendorId"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Profile Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Profile Images
            </CardTitle>
            <CardDescription>
              Add images to showcase your restaurant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Upload */}
            <div className="space-y-4">
              <FormLabel>Restaurant Avatar</FormLabel>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden bg-muted/50">
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview.url} 
                        alt="Avatar preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  {avatarPreview && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage('avatar')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'avatar')}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Avatar
                  </Button>
                </div>
              </div>
            </div>

            {/* Cover Banner Upload */}
            <div className="space-y-4">
              <FormLabel>Cover Banner</FormLabel>
              <div className="space-y-4">
                <div className="relative">
                  <div className="w-full h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden bg-muted/50">
                    {coverPreview ? (
                      <img 
                        src={coverPreview.url} 
                        alt="Cover preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Cover banner preview</p>
                      </div>
                    )}
                  </div>
                  {coverPreview && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage('cover')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'cover')}
                    className="hidden"
                    id="cover-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('cover-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Cover Banner
                  </Button>
                </div>
              </div>
            </div>

            {/* Gallery Upload */}
            <div className="space-y-4">
              <FormLabel>Restaurant Gallery</FormLabel>
              <div className="space-y-4">
                {galleryPreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {galleryPreviews.map((preview) => (
                      <div key={preview.id} className="relative">
                        <div className="aspect-square rounded-lg overflow-hidden border">
                          <img 
                            src={preview.url} 
                            alt="Gallery preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage('gallery', preview.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'gallery')}
                    className="hidden"
                    id="gallery-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('gallery-upload')?.click()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Gallery Images
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Tell customers about your restaurant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Bio *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your restaurant, specialties, and what makes you unique..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed to customers when they view your restaurant (10-500 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cuisine Selection */}
            <FormField
              control={form.control}
              name="cuisines"
              render={() => (
                <FormItem>
                  <FormLabel>Cuisine Types *</FormLabel>
                  <FormDescription>
                    Select all cuisine types that apply to your restaurant
                  </FormDescription>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                    {cuisineTypes.map((cuisine) => (
                      <FormField
                        key={cuisine}
                        control={form.control}
                        name="cuisines"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={cuisine}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(cuisine.toLowerCase())}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, cuisine.toLowerCase()])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== cuisine.toLowerCase()
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {cuisine}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Custom Cuisine Input */}
            {showCustomCuisine && (
              <FormField
                control={form.control}
                name="customCuisine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe Your Cuisine</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Describe your unique cuisine style..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Tell us about your unique cuisine style since you selected "Other"
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        {/* Opening Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Opening Hours *
            </CardTitle>
            <CardDescription>
              Set your restaurant's operating hours for each day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {daysOfWeek.map((day) => (
                <div key={day.key} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-20 text-sm font-medium capitalize shrink-0">
                      {day.label}
                    </div>
                    
                    <FormField
                      control={form.control}
                      name={`openingHours.${day.key}.isOpen` as any}
                      render={({ field }) => (
                        <FormItem className="shrink-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {form.watch(`openingHours.${day.key}.isOpen` as any) ? (
                    <div className="flex items-center gap-2 sm:gap-4">
                      <FormField
                        control={form.control}
                        name={`openingHours.${day.key}.openTime` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="time"
                                {...field}
                                className="w-32"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <span className="text-muted-foreground text-sm">to</span>
                      
                      <FormField
                        control={form.control}
                        name={`openingHours.${day.key}.closeTime` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="time"
                                {...field}
                                className="w-32"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Closed</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Online Presence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Online Presence
            </CardTitle>
            <CardDescription>
              Add your website and social media links (optional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://your-restaurant.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Links */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Social Media Links</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSocialLink}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>
              
              {socialLinks.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <select
                    value={link.platform}
                    onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                    className="flex h-10 w-40 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select platform</option>
                    {socialPlatforms.map((platform) => (
                      <option key={platform.value} value={platform.value}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="url"
                    placeholder={socialPlatforms.find(p => p.value === link.platform)?.placeholder || "Enter URL"}
                    value={link.url}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSocialLink(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={createProfileMutation.isPending}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={createProfileMutation.isPending} 
            className="w-full sm:w-auto min-w-32"
          >
            {createProfileMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateProfileForm