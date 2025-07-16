'use client'

import { useState } from 'react'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Input } from '@restaurant-webapp/components/ui/input'
import { Label } from '@restaurant-webapp/components/ui/label'
import { Textarea } from '@restaurant-webapp/components/ui/textarea'
import { Switch } from '@restaurant-webapp/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@restaurant-webapp/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs'
import { ThemeToggle } from '@restaurant-webapp/components/shared/ThemeToggle'
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  CreditCard,
  Truck,
  Clock,
  MapPin,
  Phone,
  Mail,
  Save
} from 'lucide-react'

export default function SettingsPage() {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'Rustic Plates',
    description: 'Farm-to-table restaurant specializing in fresh, locally sourced ingredients',
    cuisine: 'Mediterranean',
    phone: '+1 (555) 123-4567',
    email: 'info@rusticplates.com',
    website: 'www.rusticplates.com',
    address: '123 Main Street, Downtown, NY 10001',
    operatingHours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '21:00', closed: false },
    },
  });

  const [deliverySettings, setDeliverySettings] = useState({
    deliveryRadius: 15,
    minOrderAmount: 25,
    deliveryFee: 3.99,
    freeDeliveryThreshold: 50,
    estimatedDeliveryTime: 30,
    maxDeliveryTime: 60,
    enableScheduledDelivery: true,
    enableContactlessDelivery: true,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    acceptCreditCards: true,
    acceptDigitalWallets: true,
    acceptBankTransfers: false,
    processingFeePassthrough: false,
    autoRefunds: true,
    refundProcessingTime: 3,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderAlerts: true,
    inventoryAlerts: true,
    reviewAlerts: true,
    customerAlerts: false,
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Manage your restaurant profile, preferences, and system configuration
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile" className="text-xs md:text-sm">Profile</TabsTrigger>
          <TabsTrigger value="delivery" className="text-xs md:text-sm">Delivery</TabsTrigger>
          <TabsTrigger value="payments" className="text-xs md:text-sm">Payments</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs md:text-sm">Notifications</TabsTrigger>
          <TabsTrigger value="appearance" className="text-xs md:text-sm">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <User className="h-5 w-5" />
                Restaurant Profile
              </CardTitle>
              <CardDescription>
                Update your restaurant information and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/avatars/restaurant.png" alt="Restaurant" />
                  <AvatarFallback>RP</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Logo</Button>
                  <p className="text-xs text-muted-foreground">
                    Recommended: 400x400px, PNG or JPG
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Restaurant Name</Label>
                  <Input
                    id="restaurant-name"
                    value={restaurantInfo.name}
                    onChange={(e) => setRestaurantInfo(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cuisine-type">Cuisine Type</Label>
                  <Select value={restaurantInfo.cuisine} onValueChange={(value) => setRestaurantInfo(prev => ({ ...prev, cuisine: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Asian">Asian</SelectItem>
                      <SelectItem value="American">American</SelectItem>
                      <SelectItem value="Mexican">Mexican</SelectItem>
                      <SelectItem value="Indian">Indian</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={restaurantInfo.description}
                  onChange={(e) => setRestaurantInfo(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={restaurantInfo.phone}
                    onChange={(e) => setRestaurantInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={restaurantInfo.email}
                    onChange={(e) => setRestaurantInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={restaurantInfo.website}
                    onChange={(e) => setRestaurantInfo(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={restaurantInfo.address}
                    onChange={(e) => setRestaurantInfo(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Clock className="h-5 w-5" />
                Operating Hours
              </CardTitle>
              <CardDescription>
                Set your restaurant's operating hours for each day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(restaurantInfo.operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium capitalize">{day}</div>
                    <Switch
                      checked={!hours.closed}
                      onCheckedChange={(checked) => 
                        setRestaurantInfo(prev => ({
                          ...prev,
                          operatingHours: {
                            ...prev.operatingHours,
                            [day]: { ...hours, closed: !checked }
                          }
                        }))
                      }
                    />
                    {!hours.closed && (
                      <>
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) => 
                            setRestaurantInfo(prev => ({
                              ...prev,
                              operatingHours: {
                                ...prev.operatingHours,
                                [day]: { ...hours, open: e.target.value }
                              }
                            }))
                          }
                          className="w-32"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) => 
                            setRestaurantInfo(prev => ({
                              ...prev,
                              operatingHours: {
                                ...prev.operatingHours,
                                [day]: { ...hours, close: e.target.value }
                              }
                            }))
                          }
                          className="w-32"
                        />
                      </>
                    )}
                    {hours.closed && (
                      <span className="text-muted-foreground text-sm">Closed</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Truck className="h-5 w-5" />
                Delivery Settings
              </CardTitle>
              <CardDescription>
                Configure delivery options and pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="delivery-radius">Delivery Radius (km)</Label>
                  <Input
                    id="delivery-radius"
                    type="number"
                    value={deliverySettings.deliveryRadius}
                    onChange={(e) => setDeliverySettings(prev => ({ ...prev, deliveryRadius: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-order">Minimum Order Amount ($)</Label>
                  <Input
                    id="min-order"
                    type="number"
                    step="0.01"
                    value={deliverySettings.minOrderAmount}
                    onChange={(e) => setDeliverySettings(prev => ({ ...prev, minOrderAmount: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="delivery-fee">Delivery Fee ($)</Label>
                  <Input
                    id="delivery-fee"
                    type="number"
                    step="0.01"
                    value={deliverySettings.deliveryFee}
                    onChange={(e) => setDeliverySettings(prev => ({ ...prev, deliveryFee: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="free-delivery">Free Delivery Threshold ($)</Label>
                  <Input
                    id="free-delivery"
                    type="number"
                    step="0.01"
                    value={deliverySettings.freeDeliveryThreshold}
                    onChange={(e) => setDeliverySettings(prev => ({ ...prev, freeDeliveryThreshold: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="estimated-time">Estimated Delivery Time (minutes)</Label>
                  <Input
                    id="estimated-time"
                    type="number"
                    value={deliverySettings.estimatedDeliveryTime}
                    onChange={(e) => setDeliverySettings(prev => ({ ...prev, estimatedDeliveryTime: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-time">Maximum Delivery Time (minutes)</Label>
                  <Input
                    id="max-time"
                    type="number"
                    value={deliverySettings.maxDeliveryTime}
                    onChange={(e) => setDeliverySettings(prev => ({ ...prev, maxDeliveryTime: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="scheduled-delivery">Enable Scheduled Delivery</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to schedule deliveries</p>
                  </div>
                  <Switch
                    id="scheduled-delivery"
                    checked={deliverySettings.enableScheduledDelivery}
                    onCheckedChange={(checked) => setDeliverySettings(prev => ({ ...prev, enableScheduledDelivery: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="contactless-delivery">Enable Contactless Delivery</Label>
                    <p className="text-sm text-muted-foreground">Offer contactless delivery option</p>
                  </div>
                  <Switch
                    id="contactless-delivery"
                    checked={deliverySettings.enableContactlessDelivery}
                    onCheckedChange={(checked) => setDeliverySettings(prev => ({ ...prev, enableContactlessDelivery: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Delivery Settings
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>
                Configure accepted payment methods and processing options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="credit-cards">Accept Credit Cards</Label>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                  </div>
                  <Switch
                    id="credit-cards"
                    checked={paymentSettings.acceptCreditCards}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, acceptCreditCards: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="digital-wallets">Accept Digital Wallets</Label>
                    <p className="text-sm text-muted-foreground">Apple Pay, Google Pay, Samsung Pay</p>
                  </div>
                  <Switch
                    id="digital-wallets"
                    checked={paymentSettings.acceptDigitalWallets}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, acceptDigitalWallets: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="bank-transfers">Accept Bank Transfers</Label>
                    <p className="text-sm text-muted-foreground">Direct bank transfers and ACH</p>
                  </div>
                  <Switch
                    id="bank-transfers"
                    checked={paymentSettings.acceptBankTransfers}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, acceptBankTransfers: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="fee-passthrough">Pass Processing Fees to Customers</Label>
                    <p className="text-sm text-muted-foreground">Add processing fees to customer total</p>
                  </div>
                  <Switch
                    id="fee-passthrough"
                    checked={paymentSettings.processingFeePassthrough}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, processingFeePassthrough: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-refunds">Enable Automatic Refunds</Label>
                    <p className="text-sm text-muted-foreground">Automatically process eligible refunds</p>
                  </div>
                  <Switch
                    id="auto-refunds"
                    checked={paymentSettings.autoRefunds}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, autoRefunds: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refund-time">Refund Processing Time (business days)</Label>
                <Input
                  id="refund-time"
                  type="number"
                  value={paymentSettings.refundProcessingTime}
                  onChange={(e) => setPaymentSettings(prev => ({ ...prev, refundProcessingTime: Number(e.target.value) }))}
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Payment Settings
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="order-alerts">Order Alerts</Label>
                      <p className="text-sm text-muted-foreground">New orders and order updates</p>
                    </div>
                    <Switch
                      id="order-alerts"
                      checked={notificationSettings.orderAlerts}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, orderAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
                      <p className="text-sm text-muted-foreground">Low stock and inventory warnings</p>
                    </div>
                    <Switch
                      id="inventory-alerts"
                      checked={notificationSettings.inventoryAlerts}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, inventoryAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="review-alerts">Review Alerts</Label>
                      <p className="text-sm text-muted-foreground">New customer reviews and ratings</p>
                    </div>
                    <Switch
                      id="review-alerts"
                      checked={notificationSettings.reviewAlerts}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, reviewAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="customer-alerts">Customer Alerts</Label>
                      <p className="text-sm text-muted-foreground">New customers and customer messages</p>
                    </div>
                    <Switch
                      id="customer-alerts"
                      checked={notificationSettings.customerAlerts}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, customerAlerts: checked }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Notification Settings
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Palette className="h-5 w-5" />
                Appearance & Theme
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                </div>
                <ThemeToggle />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="est">
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                    <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                    <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="cad">CAD (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Appearance Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}