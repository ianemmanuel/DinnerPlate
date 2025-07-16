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
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react';

const meals = [
  {
    id: 1,
    name: 'Mediterranean Bowl',
    description: 'Fresh quinoa bowl with grilled vegetables, feta cheese, and tahini dressing',
    price: 18.99,
    category: 'Healthy',
    status: 'Active',
    rating: 4.8,
    orders: 234,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 2,
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with roasted vegetables and lemon herb sauce',
    price: 24.99,
    category: 'Seafood',
    status: 'Active',
    rating: 4.9,
    orders: 189,
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 3,
    name: 'Chicken Teriyaki',
    description: 'Grilled chicken breast with teriyaki glaze, steamed rice, and vegetables',
    price: 16.99,
    category: 'Asian',
    status: 'Active',
    rating: 4.7,
    orders: 156,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 4,
    name: 'Vegan Buddha Bowl',
    description: 'Colorful bowl with quinoa, roasted chickpeas, avocado, and tahini dressing',
    price: 15.99,
    category: 'Vegan',
    status: 'Draft',
    rating: 4.6,
    orders: 143,
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

export default function MealsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || meal.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Meals</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage your restaurant's meal offerings
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add New Meal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl mx-4">
            <DialogHeader>
              <DialogTitle>Add New Meal</DialogTitle>
              <DialogDescription>
                Create a new meal for your restaurant menu
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Meal Name</Label>
                  <Input id="name" placeholder="Enter meal name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your meal..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthy">Healthy</SelectItem>
                      <SelectItem value="seafood">Seafood</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prep-time">Prep Time (minutes)</Label>
                  <Input id="prep-time" type="number" placeholder="30" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" placeholder="https://..." />
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-end">
              <Button variant="outline" className="w-full md:w-auto">Cancel</Button>
              <Button className="w-full md:w-auto">Create Meal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <Input
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="healthy">Healthy</SelectItem>
            <SelectItem value="seafood">Seafood</SelectItem>
            <SelectItem value="asian">Asian</SelectItem>
            <SelectItem value="vegan">Vegan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredMeals.map((meal) => (
          <Card key={meal.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={meal.image}
                alt={meal.name}
                className="object-cover w-full h-full"
              />
              <Badge 
                className="absolute top-2 right-2"
                variant={meal.status === 'Active' ? 'default' : 'secondary'}
              >
                {meal.status}
              </Badge>
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base md:text-lg truncate">{meal.name}</CardTitle>
                  <CardDescription className="mt-1 text-sm line-clamp-2">
                    {meal.description}
                  </CardDescription>
                </div>
                <div className="text-right ml-2">
                  <div className="text-base md:text-lg font-bold">${meal.price}</div>
                  <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    {meal.rating}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center mb-4">
                <Badge variant="outline" className="text-xs">{meal.category}</Badge>
                <span className="text-xs md:text-sm text-muted-foreground">
                  {meal.orders} orders
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs md:text-sm">
                  <Eye className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs md:text-sm">
                  <Edit className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="px-2">
                  <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Meal Performance</CardTitle>
          <CardDescription>
            Detailed view of all your meals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Meal</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMeals.map((meal) => (
                  <TableRow key={meal.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-sm md:text-base truncate">{meal.name}</div>
                          <div className="text-xs md:text-sm text-muted-foreground truncate">
                            {meal.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{meal.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">${meal.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        <span className="text-sm">{meal.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{meal.orders}</TableCell>
                    <TableCell>
                      <Badge variant={meal.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                        {meal.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}