

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs'
import { Overview } from '@restaurant-webapp/components/dashboard/overview'
import { RecentOrders } from '@restaurant-webapp/components/dashboard/recent-orders'
import { TopMeals } from '@restaurant-webapp/components/dashboard/top-meals'
import { DeliveryMap } from '@restaurant-webapp/components/dashboard/delivery-map'
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Clock,
  Star,
  Package,
  Truck
} from 'lucide-react'

export const revalidate = 60

export default function DashboardPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Welcome back! Here's what's happening with your restaurant today.
        </p>
      </div>
      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total Revenue" icon={<DollarSign />} value="$45,231.89" note="+20.1% from last month" />
        <SummaryCard title="Active Subscriptions" icon={<Users />} value="+2,350" note="+180.1% from last month" />
        <SummaryCard title="Orders Today" icon={<ShoppingCart />} value="+12,234" note="+19% from yesterday" />
        <SummaryCard title="Average Rating" icon={<Star />} value="4.8" note="+0.2 from last week" />
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Recent Orders</CardTitle>
            <CardDescription>
              You have 265 orders this week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Live Delivery Tracking</CardTitle>
            <CardDescription>
              Track your active deliveries in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DeliveryMap />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Top Performing Meals</CardTitle>
            <CardDescription>
              Your best-selling items this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TopMeals />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="quick-stats" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick-stats" className="text-xs md:text-sm">Quick Stats</TabsTrigger>
          <TabsTrigger value="performance" className="text-xs md:text-sm">Performance</TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs md:text-sm">Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="quick-stats" className="space-y-4">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Pending Orders</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting preparation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Out for Delivery</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  Currently being delivered
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Low Stock Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Need restocking
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Growth Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">+12.5%</div>
                <p className="text-xs text-muted-foreground">
                  Month over month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Delivery Performance</CardTitle>
                <CardDescription>Average delivery times and success rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Delivery Time</span>
                    <span className="text-sm text-muted-foreground">28 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">On-Time Delivery Rate</span>
                    <span className="text-sm text-muted-foreground">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <span className="text-sm text-muted-foreground">4.8/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Meal Plan Performance</CardTitle>
                <CardDescription>Subscription metrics and retention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Meal Plans</span>
                    <span className="text-sm text-muted-foreground">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Retention Rate</span>
                    <span className="text-sm text-muted-foreground">87.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Plan Duration</span>
                    <span className="text-sm text-muted-foreground">3.2 months</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
              <CardHeader>
                <CardTitle className="text-orange-800 dark:text-orange-200 text-lg">Inventory Alert</CardTitle>
                <CardDescription className="text-orange-700 dark:text-orange-300">
                  5 ingredients are running low and need restocking
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200 text-lg">New Reviews</CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-300">
                  You have 12 new customer reviews to respond to
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200 text-lg">Milestone Achieved</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  Congratulations! You've reached 2,500 active subscribers
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

//* Helper component
function SummaryCard({ title, icon, value, note }: { title: string; icon: React.ReactNode; value: string; note: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs md:text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-lg md:text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  );
}