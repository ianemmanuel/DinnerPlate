import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@restaurant-webapp/components/ui/dialog'
import { useAuthStore } from '@restaurant-webapp/lib/store/auth-store'
import { Calendar, Camera, CheckCircle, ExternalLink, Globe, Mail, MapPin, Phone, Star, Upload } from 'lucide-react'
import React from 'react'

const ProfileCard = () => {

    const { vendor, isLoading } = useAuthStore()
    const getInitials = (name?: string | null) => {
        if (!name) return 'VP'
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
    }
    return (
        <Card className="lg:col-span-1">
            <CardHeader className="text-center">
                <div className="relative mx-auto">
                    <Avatar className="h-24 w-24 mx-auto">
                        <AvatarImage 
                            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200" 
                            alt={vendor?.businessName || 'Vendor'} 
                        />
                        <AvatarFallback>{getInitials(vendor?.businessName)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                        <Dialog open={activeImageDialog} onOpenChange={setActiveImageDialog}>
                            <DialogTrigger asChild>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                                >
                                    <Camera className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Update Restaurant Image</DialogTitle>
                                    <DialogDescription>
                                    Upload a new image for your restaurant profile
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            Drag and drop an image, or click to browse
                                        </p>
                                    </div>
                                    <Button onClick={() => setActiveImageDialog(false)} className="w-full">
                                        Upload Image
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-xl">{vendor?.businessName || 'Vendor'}</CardTitle>
                    <CardDescription className="capitalize">{vendor?.type || 'Vendor'}</CardDescription>
                    <div className="flex justify-center">
                        {getStatusBadge(profileData.status)}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{vendor?.businessEmail || ''}</span>
                        {profileData.emailVerified && <CheckCircle className="h-3 w-3 text-green-500" />}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{vendor?.businessPhone || ''}</span>
                        {profileData.phoneVerified && <CheckCircle className="h-3 w-3 text-green-500" />}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{profileData.street}, {profileData.city}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined {vendor?.created_at || ''}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{profileData.ratings} ({profileData.totalReviews} reviews)</span>
                    </div>
                </div>
            
            {vendor?.website && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={vendor?.website || ''} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Website
                        <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                </Button>
            )}
            </CardContent>
        </Card>
  )
}

export default ProfileCard