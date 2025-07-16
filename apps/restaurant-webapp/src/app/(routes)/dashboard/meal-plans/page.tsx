'use client';

import { useState } from 'react';
import { Button } from '@restaurant-webapp/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card';
import { Input } from '@restaurant-webapp/components/ui/input';
import { Label } from '@restaurant-webapp/components/ui/label';
import { Textarea } from '@restaurant-webapp/components/ui/textarea';
import { Badge } from '@restaurant-webapp/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@restaurant-webapp/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@restaurant-webapp/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@restaurant-webapp/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs';
import { Plus, Edit, Trash2, Eye, Users, Calendar, DollarSign } from 'lucide-react';

const mealPlans = [
  {
    id: 1,
    name: 'Mediterranean Week',
    description: '7-day Mediterranean diet meal plan with fresh ingredients',
    duration: 7,
    price: 89.99,
    subscribers: 234,
    status: 'Active',
    startDate: '2024-01-15',
    meals: ['Mediterranean Bowl', 'Grilled Salmon', 'Greek Salad', 'Stuffed Peppers'],
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 2,
    name: 'Healthy Protein Pack',
    description: '5-day high-protein meal plan for fitness enthusiasts',
    duration: 5,
    price: 74.99,
    subscribers: 189,
    status: 'Active',
    startDate: '2024-01-20',
    meals: ['Grilled Chicken', 'Salmon Bowl', 'Turkey Wrap', 'Protein Smoothie'],
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 3,
    name: 'Vegan Delight',
    description: '7-day plant-based meal plan with diverse flavors',
    duration: 7,
    price: 69.99,
    subscribers: 156,
    status: 'Draft',
    startDate: '2024-01-25',
    meals: ['Buddha Bowl', 'Quinoa Salad', 'Veggie Curry', 'Lentil Soup'],
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

export default function MealPlansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredPlans = mealPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || plan.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meal Plans</h1>
          <p className="text-muted-foreground">
            Create and manage subscription-based meal plans
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Meal Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Meal Plan</DialogTitle>
              <DialogDescription>
                Design a subscription meal plan for your customers
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="meals">Meals</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan-name">Plan Name</Label>
                    <Input id="plan-name" placeholder="Enter plan name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan-price">Price ($)</Label>
                    <Input id="plan-price" type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan-description">Description</Label>
                  <Textarea id="plan-description" placeholder="Describe your meal plan..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input id="duration" type="number" placeholder="7" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthy">Healthy</SelectItem>
                        <SelectItem value="protein">High Protein</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="keto">Keto</SelectItem>
                        <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="meals" className="space-y-4">
                <div className="space-y-4">
                  <Label>Select Meals for This Plan</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Mediterranean Bowl', 'Grilled Salmon', 'Chicken Teriyaki', 'Vegan Buddha Bowl', 'Greek Salad', 'Quinoa Bowl'].map((meal) => (
                      <div key={meal} className="flex items-center space-x-2">
                        <input type="checkbox" id={meal} className="rounded" />
                        <label htmlFor={meal} className="text-sm">{meal}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="schedule" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-time">Delivery Window</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8-10 AM)</SelectItem>
                        <SelectItem value="lunch">Lunch (12-2 PM)</SelectItem>
                        <SelectItem value="evening">Evening (6-8 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Delivery Days</Label>
                  <div className="flex gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <input type="checkbox" id={day} className="rounded" />
                        <label htmlFor={day} className="text-sm">{day}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Cancel</Button>
              <Button>Create Plan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plan Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89,432</div>
            <p className="text-xs text-muted-foreground">
              +25% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Plan Duration</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.2</div>
            <p className="text-xs text-muted-foreground">
              days per plan
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Search meal plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={plan.image}
                alt={plan.name}
                className="object-cover w-full h-full"
              />
              <Badge 
                className="absolute top-2 right-2"
                variant={plan.status === 'Active' ? 'default' : 'secondary'}
              >
                {plan.status}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {plan.description}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">${plan.price}</div>
                  <div className="text-sm text-muted-foreground">
                    {plan.duration} days
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Subscribers</span>
                  <span className="font-medium">{plan.subscribers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Start Date</span>
                  <span className="font-medium">{plan.startDate}</span>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Included Meals</span>
                  <div className="flex flex-wrap gap-1">
                    {plan.meals.slice(0, 3).map((meal, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {meal}
                      </Badge>
                    ))}
                    {plan.meals.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{plan.meals.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meal Plan Performance</CardTitle>
          <CardDescription>
            Detailed analytics for all your meal plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {plan.description.substring(0, 40)}...
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{plan.duration} days</TableCell>
                  <TableCell>${plan.price}</TableCell>
                  <TableCell>{plan.subscribers}</TableCell>
                  <TableCell>${(plan.price * plan.subscribers).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={plan.status === 'Active' ? 'default' : 'secondary'}>
                      {plan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}