'use client';

import { useState } from 'react';
import { Button } from '@restaurant-webapp/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card';
import { Input } from '@restaurant-webapp/components/ui/input';
import { Label } from '@restaurant-webapp/components/ui/label';
import { Textarea } from '@restaurant-webapp/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar';
import { Badge } from '@restaurant-webapp/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@restaurant-webapp/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@restaurant-webapp/components/ui/select';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Star,
  Award,
  TrendingUp,
  Edit,
  Save,
  Camera,
  Building2,
  Clock,
  Globe,
  Users,
  ChefHat,
  Plus,
  Eye,
  FileText,
  CreditCard,
  Settings,
  Upload,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  XCircle,
  DollarSign,
  Package,
  Utensils
} from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeImageDialog, setActiveImageDialog] = useState(false);



  const [profileData, setProfileData] = useState({
    // Vendor Basic Info
    businessName: 'Rustic Plates Kitchen',
    legalBusinessName: 'Rustic Plates Kitchen LLC',
    type: 'restaurant',
    businessEmail: 'contact@rusticplates.com',
    businessPhone: '+1 (555) 123-4567',
    ownerFirstName: 'Alex',
    ownerLastName: 'Rodriguez',
    
    // Profile Info
    bio: 'Passionate chef and restaurant owner with over 15 years of experience in the culinary industry. Specializing in farm-to-table Mediterranean cuisine with a focus on fresh, locally sourced ingredients.',
    website: 'https://rusticplates.com',
    
    // Address
    country: 'United States',
    city: 'New York',
    street: '123 Main Street, Downtown',
    postalCode: '10001',
    
    // Status & Verification
    status: 'APPROVED',
    emailVerified: true,
    phoneVerified: true,
    
    // Timestamps
    joinDate: '2023-01-15',
    lastLogin: '2024-01-15 14:30',
    
    // Ratings & Performance
    ratings: 4.8,
    totalReviews: 247,
    
    // Opening Hours
    openingHours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '21:00', closed: false }
    }
  });

  const [socialLinks, setSocialLinks] = useState([
    { platform: 'Instagram', url: 'https://instagram.com/rusticplates', icon: '📷' },
    { platform: 'Facebook', url: 'https://facebook.com/rusticplates', icon: '📘' },
    { platform: 'Twitter', url: 'https://twitter.com/rusticplates', icon: '🐦' }
  ]);

  const achievements = [
    {
      title: 'Top Rated Restaurant',
      description: 'Maintained 4.8+ rating for 6 months',
      icon: Star,
      date: '2024-01-01',
      color: 'text-yellow-500',
    },
    {
      title: 'Customer Favorite',
      description: '1000+ satisfied customers',
      icon: Award,
      date: '2023-12-15',
      color: 'text-blue-500',
    },
    {
      title: 'Growth Champion',
      description: '50% revenue increase this year',
      icon: TrendingUp,
      date: '2023-11-30',
      color: 'text-green-500',
    },
    {
      title: 'Verified Business',
      description: 'Completed business verification',
      icon: Shield,
      date: '2023-01-20',
      color: 'text-purple-500',
    },
  ];

  const stats = [
    { label: 'Total Orders', value: '2,847', change: '+12%', icon: Package },
    { label: 'Revenue Generated', value: '$89,234', change: '+25%', icon: DollarSign },
    { label: 'Customer Rating', value: '4.8', change: '+0.2', icon: Star },
    { label: 'Active Meal Plans', value: '12', change: '+3', icon: Utensils },
  ];

  const documents = [
    { type: 'BUSINESS_LICENSE', name: 'Business License', status: 'APPROVED', uploadDate: '2023-01-15' },
    { type: 'HEALTH_CERTIFICATE', name: 'Health Certificate', status: 'APPROVED', uploadDate: '2023-01-20' },
    { type: 'NATIONAL_ID', name: 'Owner ID', status: 'APPROVED', uploadDate: '2023-01-15' }
  ];

  const branches = [
    {
      id: '1',
      name: 'Main Branch - Downtown',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, Downtown, NY 10001',
      deliveryRadius: 5.0,
      isActive: true
    },
    {
      id: '2', 
      name: 'Branch 2 - Uptown',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Avenue, Uptown, NY 10002',
      deliveryRadius: 3.5,
      isActive: true
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      APPROVED: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-500' },
      PENDING: { variant: 'secondary' as const, icon: AlertCircle, color: 'text-yellow-500' },
      REJECTED: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-500' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const handleSaveProfile = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
    // Show success toast
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Restaurant Profile</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage your restaurant information, settings, and team
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
          <Button variant="outline" asChild>
            <a href="/dashboard/chefs">
              <ChefHat className="mr-2 h-4 w-4" />
              Manage Chefs
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Restaurant" />
                <AvatarFallback>{profileData.businessName.charAt(0)}</AvatarFallback>
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
              <CardTitle className="text-xl">{profileData.businessName} 1</CardTitle>
              <CardDescription className="capitalize">{profileData.type.replace('_', ' ')}</CardDescription>
              <div className="flex justify-center">
                {getStatusBadge(profileData.status)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{profileData.businessEmail}</span>
                {profileData.emailVerified && <CheckCircle className="h-3 w-3 text-green-500" />}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{profileData.businessPhone}</span>
                {profileData.phoneVerified && <CheckCircle className="h-3 w-3 text-green-500" />}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{profileData.street}, {profileData.city}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {profileData.joinDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{profileData.ratings} ({profileData.totalReviews} reviews)</span>
              </div>
            </div>
            
            {profileData.website && (
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Visit Website
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="business" className="text-xs md:text-sm">Business</TabsTrigger>
              <TabsTrigger value="operations" className="text-xs md:text-sm">Operations</TabsTrigger>
              <TabsTrigger value="documents" className="text-xs md:text-sm">Documents</TabsTrigger>
              <TabsTrigger value="settings" className="text-xs md:text-sm">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Performance Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Performance Overview</CardTitle>
                  <CardDescription>
                    Your restaurant's key performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="text-center p-4 border rounded-lg">
                          <Icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <div className="text-lg md:text-2xl font-bold">{stat.value}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                          <div className="text-xs text-green-600">{stat.change}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Achievements</CardTitle>
                  <CardDescription>
                    Milestones and accomplishments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className={`p-2 rounded-lg bg-muted ${achievement.color}`}>
                          <achievement.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Social Media</CardTitle>
                  <CardDescription>
                    Your social media presence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-3">
                    {socialLinks.map((link, index) => (
                      <Button key={index} variant="outline" size="sm" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <span className="mr-2">{link.icon}</span>
                          {link.platform}
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="business" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Business Information</CardTitle>
                  <CardDescription>
                    Update your business details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input
                        id="business-name"
                        value={profileData.businessName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, businessName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="legal-name">Legal Business Name</Label>
                      <Input
                        id="legal-name"
                        value={profileData.legalBusinessName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, legalBusinessName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="business-type">Business Type</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder={profileData.type.replace('_', ' ')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="commercial_kitchen">Commercial Kitchen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        disabled={!isEditing}
                        placeholder="https://yourrestaurant.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="business-email">Business Email</Label>
                      <Input
                        id="business-email"
                        type="email"
                        value={profileData.businessEmail}
                        onChange={(e) => setProfileData(prev => ({ ...prev, businessEmail: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-phone">Business Phone</Label>
                      <Input
                        id="business-phone"
                        value={profileData.businessPhone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, businessPhone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Business Description</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      className="min-h-[100px]"
                      placeholder="Tell customers about your restaurant..."
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="owner-first">Owner First Name</Label>
                      <Input
                        id="owner-first"
                        value={profileData.ownerFirstName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, ownerFirstName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="owner-last">Owner Last Name</Label>
                      <Input
                        id="owner-last"
                        value={profileData.ownerLastName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, ownerLastName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Address Information</CardTitle>
                  <CardDescription>
                    Your primary business address
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={profileData.country}
                        onChange={(e) => setProfileData(prev => ({ ...prev, country: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={profileData.street}
                      onChange={(e) => setProfileData(prev => ({ ...prev, street: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input
                      id="postal"
                      value={profileData.postalCode}
                      onChange={(e) => setProfileData(prev => ({ ...prev, postalCode: e.target.value }))}
                      disabled={!isEditing}
                      className="max-w-xs"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="operations" className="space-y-4">
              {/* Opening Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Opening Hours</CardTitle>
                  <CardDescription>
                    Set your restaurant's operating hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(profileData.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-medium capitalize">{day}</div>
                        {hours.closed ? (
                          <div className="text-sm text-muted-foreground">Closed</div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm">
                            <span>{hours.open}</span>
                            <span>-</span>
                            <span>{hours.close}</span>
                          </div>
                        )}
                        {isEditing && (
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Branches */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Branch Locations</CardTitle>
                  <CardDescription>
                    Manage your restaurant branches and delivery areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {branches.map((branch) => (
                      <div key={branch.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <h4 className="font-medium">{branch.name}</h4>
                          <p className="text-sm text-muted-foreground">{branch.address}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{branch.phone}</span>
                            <span>Delivery: {branch.deliveryRadius}km radius</span>
                            <Badge variant={branch.isActive ? "default" : "secondary"}>
                              {branch.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Branch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Business Documents</CardTitle>
                  <CardDescription>
                    Manage your business verification documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(doc.status)}
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Account Status</h4>
                        <p className="text-sm text-muted-foreground">Your account verification status</p>
                      </div>
                      {getStatusBadge(profileData.status)}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Email Verification</h4>
                        <p className="text-sm text-muted-foreground">Verify your business email</p>
                      </div>
                      <Badge variant={profileData.emailVerified ? "default" : "secondary"}>
                        {profileData.emailVerified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Phone Verification</h4>
                        <p className="text-sm text-muted-foreground">Verify your business phone</p>
                      </div>
                      <Badge variant={profileData.phoneVerified ? "default" : "secondary"}>
                        {profileData.phoneVerified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <Button variant="outline" className="w-full md:w-auto">
                      <Settings className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto">
                      <Shield className="mr-2 h-4 w-4" />
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Settings
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto">
                      <FileText className="mr-2 h-4 w-4" />
                      Download Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}