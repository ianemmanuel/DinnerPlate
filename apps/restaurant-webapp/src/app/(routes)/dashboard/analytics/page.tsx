'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs';
import { Badge } from '@restaurant-webapp/components/ui/badge';
import { Progress } from '@restaurant-webapp/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@restaurant-webapp/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Users, 
  ShoppingCart, 
  Star,
  Calendar,
  MapPin,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Zap
} from 'lucide-react';
import { Bar, BarChart, Line, LineChart, Pie, PieChart as RechartsPieChart, Cell, Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45231, orders: 1247, customers: 892 },
  { month: 'Feb', revenue: 52847, orders: 1456, customers: 1034 },
  { month: 'Mar', revenue: 48392, orders: 1332, customers: 967 },
  { month: 'Apr', revenue: 61205, orders: 1689, customers: 1245 },
  { month: 'May', revenue: 58734, orders: 1578, customers: 1156 },
  { month: 'Jun', revenue: 67891, orders: 1823, customers: 1389 },
  { month: 'Jul', revenue: 72456, orders: 1945, customers: 1467 },
  { month: 'Aug', revenue: 69823, orders: 1876, customers: 1423 },
  { month: 'Sep', revenue: 75234, orders: 2034, customers: 1534 },
  { month: 'Oct', revenue: 81567, orders: 2187, customers: 1645 },
  { month: 'Nov', revenue: 78945, orders: 2098, customers: 1589 },
  { month: 'Dec', revenue: 89234, orders: 2345, customers: 1723 },
];

const mealPerformanceData = [
  { name: 'Mediterranean Bowl', orders: 2847, revenue: 54093, rating: 4.8, growth: 12.5 },
  { name: 'Grilled Salmon', orders: 2156, revenue: 53896, rating: 4.9, growth: 8.3 },
  { name: 'Chicken Teriyaki', orders: 1923, revenue: 32661, rating: 4.7, growth: 15.2 },
  { name: 'Vegan Buddha Bowl', orders: 1745, revenue: 27920, rating: 4.6, growth: 22.1 },
  { name: 'Pasta Primavera', orders: 1534, revenue: 26078, rating: 4.5, growth: 5.7 },
];

const customerSegmentData = [
  { name: 'New Customers', value: 35, color: '#8884d8' },
  { name: 'Returning Customers', value: 45, color: '#82ca9d' },
  { name: 'VIP Customers', value: 20, color: '#ffc658' },
];

const deliveryData = [
  { area: 'Downtown', orders: 456, avgTime: 28, satisfaction: 4.8 },
  { area: 'Midtown', orders: 389, avgTime: 32, satisfaction: 4.6 },
  { area: 'Uptown', orders: 234, avgTime: 35, satisfaction: 4.5 },
  { area: 'Westside', orders: 198, avgTime: 29, satisfaction: 4.7 },
  { area: 'Eastside', orders: 167, avgTime: 31, satisfaction: 4.4 },
];

const hourlyOrderData = [
  { hour: '6AM', orders: 12 },
  { hour: '7AM', orders: 28 },
  { hour: '8AM', orders: 45 },
  { hour: '9AM', orders: 67 },
  { hour: '10AM', orders: 89 },
  { hour: '11AM', orders: 134 },
  { hour: '12PM', orders: 189 },
  { hour: '1PM', orders: 156 },
  { hour: '2PM', orders: 98 },
  { hour: '3PM', orders: 76 },
  { hour: '4PM', orders: 87 },
  { hour: '5PM', orders: 123 },
  { hour: '6PM', orders: 198 },
  { hour: '7PM', orders: 234 },
  { hour: '8PM', orders: 189 },
  { hour: '9PM', orders: 145 },
  { hour: '10PM', orders: 87 },
  { hour: '11PM', orders: 34 },
];

const mealPlanData = [
  { plan: 'Mediterranean Week', subscribers: 1247, retention: 87.3, revenue: 111423 },
  { plan: 'Healthy Protein Pack', subscribers: 892, retention: 82.1, revenue: 66894 },
  { plan: 'Vegan Delight', subscribers: 634, retention: 91.2, revenue: 44380 },
  { plan: 'Asian Fusion', subscribers: 456, retention: 78.9, revenue: 36480 },
  { plan: 'Comfort Classics', subscribers: 389, retention: 85.6, revenue: 31120 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('12months');

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Comprehensive insights into your restaurant performance
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="12months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">$847,234</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">21,847</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +8.2% from last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">16,234</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +15.3% from last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">4.7</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +0.2 from last period
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="revenue" className="text-xs md:text-sm">Revenue</TabsTrigger>
          <TabsTrigger value="customers" className="text-xs md:text-sm">Customers</TabsTrigger>
          <TabsTrigger value="meals" className="text-xs md:text-sm">Meals</TabsTrigger>
          <TabsTrigger value="delivery" className="text-xs md:text-sm">Delivery</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Customer Segments</CardTitle>
                <CardDescription>Distribution of customer types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={customerSegmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {customerSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Order Patterns</CardTitle>
                <CardDescription>Orders by hour of day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={hourlyOrderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Order Fulfillment Rate</span>
                    <span className="text-sm text-muted-foreground">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Customer Retention</span>
                    <span className="text-sm text-muted-foreground">87.3%</span>
                  </div>
                  <Progress value={87.3} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Delivery Time</span>
                    <span className="text-sm text-muted-foreground">28 min</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">$89,234</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Avg Order Value</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">$38.76</div>
                <p className="text-xs text-muted-foreground">+$2.34 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Meal Plan Revenue</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">$290,297</div>
                <p className="text-xs text-muted-foreground">65% of total revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">One-time Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">$156,937</div>
                <p className="text-xs text-muted-foreground">35% of total revenue</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Revenue Breakdown</CardTitle>
              <CardDescription>Detailed revenue analysis over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">New Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Customer Lifetime Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">$295.83</div>
                <p className="text-xs text-muted-foreground">Average CLV</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Churn Rate</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">12.7%</div>
                <p className="text-xs text-muted-foreground">-2.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Repeat Order Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">73.2%</div>
                <p className="text-xs text-muted-foreground">+5.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Customer Acquisition</CardTitle>
              <CardDescription>New customers acquired over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="customers" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Meal Performance Analysis</CardTitle>
              <CardDescription>Detailed performance metrics for each meal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mealPerformanceData.map((meal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{meal.name}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{meal.orders} orders</span>
                        <span>${meal.revenue.toLocaleString()} revenue</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          {meal.rating}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={meal.growth > 10 ? 'default' : 'secondary'}>
                        +{meal.growth}% growth
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Meal Plan Performance</CardTitle>
              <CardDescription>Subscription meal plan analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mealPlanData.map((plan, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{plan.plan}</span>
                      <span className="text-sm text-muted-foreground">{plan.subscribers} subscribers</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Retention: {plan.retention}%</span>
                      <span>Revenue: ${plan.revenue.toLocaleString()}</span>
                    </div>
                    <Progress value={plan.retention} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-4">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Avg Delivery Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">28 min</div>
                <p className="text-xs text-muted-foreground">-2 min from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">On-Time Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">+1.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Delivery Areas</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Active zones</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Customer Satisfaction</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">4.6</div>
                <p className="text-xs text-muted-foreground">Delivery rating</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Delivery Performance by Area</CardTitle>
              <CardDescription>Performance metrics for each delivery zone</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryData.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {area.area}
                      </h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{area.orders} orders</span>
                        <span>{area.avgTime} min avg</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          {area.satisfaction}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={area.satisfaction > 4.5 ? 'default' : 'secondary'}>
                        {area.satisfaction > 4.5 ? 'Excellent' : 'Good'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}