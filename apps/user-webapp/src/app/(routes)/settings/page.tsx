"use client";

import { useState } from "react";
import { Card } from "@user-webapp/components/ui/card";
import { Input } from "@user-webapp/components/ui/input";
import { Button } from "@user-webapp/components/ui/button";
import { Badge } from "@user-webapp/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@user-webapp/components/ui/tabs";
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield, 
  HelpCircle, 
  LogOut,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Star,
  Check,
  AlertTriangle
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94110",
    notifications: true,
    newsletter: true,
    twoFactor: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings updated successfully!", {
      position: "top-center",
      style: {
        background: '#4ade80',
        color: '#fff',
        border: 'none',
      }
    });
  };

  return (
    <div className="container mx-auto px-6 py-8 lg:px-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your account preferences</p>
      </div>

      <Tabs 
        defaultValue="profile" 
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden md:inline">Support</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-8">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-32 w-32 rounded-full border-2 border-primary/20">
                  <Image
                    src="/avatars/user-1.jpg"
                    alt="User profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-8">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Password
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Change Password</Button>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-medium text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={formData.twoFactor ? "default" : "secondary"}>
                    {formData.twoFactor ? "Enabled" : "Disabled"}
                  </Badge>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, twoFactor: !prev.twoFactor }));
                      toast.success(
                        `Two-factor authentication ${formData.twoFactor ? "disabled" : "enabled"}`,
                        { position: "top-center" }
                      );
                    }}
                  >
                    {formData.twoFactor ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-medium text-lg">Active Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">MacBook Pro</p>
                      <p className="text-sm text-muted-foreground">
                        San Francisco, CA • Chrome • Active now
                      </p>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm">
                    Log Out
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <path d="M12 18h.01" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">iPhone 14</p>
                      <p className="text-sm text-muted-foreground">
                        San Francisco, CA • Safari • 2 hours ago
                      </p>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm">
                    Log Out
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-8">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">
                      Get weekly updates and promotions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-medium text-lg">Notification Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <ShoppingBag className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Order confirmations and status changes
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">Promotions</p>
                    <p className="text-sm text-muted-foreground">
                      Special offers and discounts
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Account Activity</p>
                    <p className="text-sm text-muted-foreground">
                      Login alerts and security notices
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Messages</p>
                    <p className="text-sm text-muted-foreground">
                      New messages from restaurants
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-8">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Visa •••• 4242</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 05/25
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>

                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-medium text-lg">Billing History</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Meal Plan Subscription</p>
                    <p className="text-sm text-muted-foreground">
                      May 15, 2023
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$29.99</p>
                    <p className="text-sm text-muted-foreground">
                      Visa •••• 4242
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Dinner Order</p>
                    <p className="text-sm text-muted-foreground">
                      May 10, 2023
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$42.50</p>
                    <p className="text-sm text-muted-foreground">
                      Visa •••• 4242
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="mt-8">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Help & Support
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-lg w-fit mb-3">
                    <HelpCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">FAQs</h4>
                  <p className="text-sm text-muted-foreground">
                    Find answers to common questions
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="bg-purple-100 p-3 rounded-lg w-fit mb-3">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium mb-1">Contact Us</h4>
                  <p className="text-sm text-muted-foreground">
                    Send us a message
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="bg-green-100 p-3 rounded-lg w-fit mb-3">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium mb-1">Live Chat</h4>
                  <p className="text-sm text-muted-foreground">
                    Chat with our support team
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="bg-yellow-100 p-3 rounded-lg w-fit mb-3">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h4 className="font-medium mb-1">Report Issue</h4>
                  <p className="text-sm text-muted-foreground">
                    Report a problem with your order
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-medium text-lg">Account Actions</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Download Data
                </Button>
                <Button variant="outline" className="w-full">
                  Request Account Deletion
                </Button>
                <Button
                  variant="destructive"
                  className="w-full flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}