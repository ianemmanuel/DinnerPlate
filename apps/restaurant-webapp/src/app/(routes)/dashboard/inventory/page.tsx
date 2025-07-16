'use client'

import { useState } from 'react'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Input } from '@restaurant-webapp/components/ui/input'
import { Badge } from '@restaurant-webapp/components/ui/badge'
import { Progress } from '@restaurant-webapp/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@restaurant-webapp/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@restaurant-webapp/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@restaurant-webapp/components/ui/dialog'
import { Label } from '@restaurant-webapp/components/ui/label'
import { 
  Package, 
  AlertTriangle, 
  TrendingDown,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  DollarSign,
  BarChart3
} from 'lucide-react'

const inventoryItems = [
  {
    id: 1,
    name: 'Fresh Salmon Fillets',
    category: 'Seafood',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: 'lbs',
    costPerUnit: 12.50,
    supplier: 'Ocean Fresh Co.',
    lastRestocked: '2024-01-14',
    expiryDate: '2024-01-18',
    status: 'In Stock',
    weeklyUsage: 35,
    monthlyUsage: 140,
  },
  {
    id: 2,
    name: 'Organic Quinoa',
    category: 'Grains',
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unit: 'lbs',
    costPerUnit: 4.25,
    supplier: 'Organic Farms Ltd.',
    lastRestocked: '2024-01-10',
    expiryDate: '2024-06-15',
    status: 'Low Stock',
    weeklyUsage: 12,
    monthlyUsage: 48,
  },
  {
    id: 3,
    name: 'Extra Virgin Olive Oil',
    category: 'Oils & Vinegars',
    currentStock: 25,
    minStock: 10,
    maxStock: 40,
    unit: 'bottles',
    costPerUnit: 8.75,
    supplier: 'Mediterranean Imports',
    lastRestocked: '2024-01-12',
    expiryDate: '2024-12-31',
    status: 'In Stock',
    weeklyUsage: 6,
    monthlyUsage: 24,
  },
  {
    id: 4,
    name: 'Free-Range Chicken Breast',
    category: 'Poultry',
    currentStock: 2,
    minStock: 25,
    maxStock: 80,
    unit: 'lbs',
    costPerUnit: 6.50,
    supplier: 'Farm Fresh Poultry',
    lastRestocked: '2024-01-13',
    expiryDate: '2024-01-17',
    status: 'Critical',
    weeklyUsage: 28,
    monthlyUsage: 112,
  },
  {
    id: 5,
    name: 'Fresh Basil',
    category: 'Herbs & Spices',
    currentStock: 12,
    minStock: 5,
    maxStock: 20,
    unit: 'bunches',
    costPerUnit: 2.50,
    supplier: 'Local Herb Garden',
    lastRestocked: '2024-01-15',
    expiryDate: '2024-01-20',
    status: 'In Stock',
    weeklyUsage: 8,
    monthlyUsage: 32,
  },
  {
    id: 6,
    name: 'Feta Cheese',
    category: 'Dairy',
    currentStock: 18,
    minStock: 12,
    maxStock: 30,
    unit: 'lbs',
    costPerUnit: 7.25,
    supplier: 'Greek Dairy Co.',
    lastRestocked: '2024-01-11',
    expiryDate: '2024-01-25',
    status: 'In Stock',
    weeklyUsage: 10,
    monthlyUsage: 40,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Stock':
      return 'default';
    case 'Low Stock':
      return 'secondary';
    case 'Critical':
      return 'destructive';
    case 'Out of Stock':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getStockLevel = (current: number, min: number, max: number) => {
  const percentage = (current / max) * 100;
  if (current <= min) return { level: 'critical', percentage };
  if (current <= min * 1.5) return { level: 'low', percentage };
  return { level: 'good', percentage };
};

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status.toLowerCase().replace(' ', '-') === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => item.status === 'Low Stock' || item.status === 'Critical').length;
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);
  const criticalItems = inventoryItems.filter(item => item.status === 'Critical').length;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Track and manage your restaurant's ingredient inventory
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl mx-4">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>
                Add a new ingredient or item to your inventory
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input id="item-name" placeholder="Enter item name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seafood">Seafood</SelectItem>
                      <SelectItem value="poultry">Poultry</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="herbs">Herbs & Spices</SelectItem>
                      <SelectItem value="oils">Oils & Vinegars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-stock">Current Stock</Label>
                  <Input id="current-stock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-stock">Minimum Stock</Label>
                  <Input id="min-stock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-stock">Maximum Stock</Label>
                  <Input id="max-stock" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" placeholder="lbs, bottles, bunches, etc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost per Unit ($)</Label>
                  <Input id="cost" type="number" step="0.01" placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input id="supplier" placeholder="Supplier name" />
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-end">
              <Button variant="outline" className="w-full md:w-auto">Cancel</Button>
              <Button className="w-full md:w-auto">Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Tracked ingredients
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-orange-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Need restocking
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total stock value
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Critical Items</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-red-600">{criticalItems}</div>
            <p className="text-xs text-muted-foreground">
              Immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="seafood">Seafood</SelectItem>
              <SelectItem value="poultry">Poultry</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
              <SelectItem value="herbs & spices">Herbs & Spices</SelectItem>
              <SelectItem value="oils & vinegars">Oils & Vinegars</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs md:text-sm">Alerts</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs md:text-sm">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Inventory Items</CardTitle>
              <CardDescription>
                Complete list of all inventory items with current stock levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Cost/Unit</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => {
                      const stockLevel = getStockLevel(item.currentStock, item.minStock, item.maxStock);
                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm">{item.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {item.currentStock} {item.unit} / {item.maxStock} {item.unit}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress 
                                value={stockLevel.percentage} 
                                className={`h-2 ${
                                  stockLevel.level === 'critical' ? 'bg-red-100' :
                                  stockLevel.level === 'low' ? 'bg-orange-100' : 'bg-green-100'
                                }`}
                              />
                              <div className="text-xs text-muted-foreground">
                                {stockLevel.percentage.toFixed(0)}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(item.status)} className="text-xs">
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">${item.costPerUnit}</TableCell>
                          <TableCell className="text-sm">{item.supplier}</TableCell>
                          <TableCell className="text-sm">{item.expiryDate}</TableCell>
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
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            {inventoryItems
              .filter(item => item.status === 'Critical' || item.status === 'Low Stock')
              .map((item) => (
                <Card key={item.id} className={`${
                  item.status === 'Critical' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950' :
                  'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950'
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className={`text-lg ${
                          item.status === 'Critical' ? 'text-red-800 dark:text-red-200' :
                          'text-orange-800 dark:text-orange-200'
                        }`}>
                          {item.name}
                        </CardTitle>
                        <CardDescription className={`${
                          item.status === 'Critical' ? 'text-red-700 dark:text-red-300' :
                          'text-orange-700 dark:text-orange-300'
                        }`}>
                          {item.status} - Only {item.currentStock} {item.unit} remaining
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium">Current Stock</p>
                        <p className="text-sm text-muted-foreground">{item.currentStock} {item.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Minimum Required</p>
                        <p className="text-sm text-muted-foreground">{item.minStock} {item.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Weekly Usage</p>
                        <p className="text-sm text-muted-foreground">{item.weeklyUsage} {item.unit}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">Reorder Now</Button>
                      <Button variant="outline" size="sm">Contact Supplier</Button>
                      <Button variant="outline" size="sm">Update Stock</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Usage Trends
                </CardTitle>
                <CardDescription>
                  Monthly ingredient consumption patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryItems.slice(0, 5).map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.monthlyUsage} {item.unit}/month
                        </span>
                      </div>
                      <Progress value={(item.monthlyUsage / 200) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Cost Analysis</CardTitle>
                <CardDescription>
                  Inventory costs and value breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Inventory Value</span>
                    <span className="text-sm text-muted-foreground">${totalValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Monthly Consumption Cost</span>
                    <span className="text-sm text-muted-foreground">$2,847.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Cost per Item</span>
                    <span className="text-sm text-muted-foreground">
                      ${(totalValue / totalItems).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Reorder Frequency</span>
                    <span className="text-sm text-muted-foreground">2.3 times/month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Category Breakdown</CardTitle>
                <CardDescription>
                  Inventory distribution by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                  {['Seafood', 'Poultry', 'Dairy', 'Grains', 'Herbs & Spices', 'Oils & Vinegars'].map((category) => {
                    const categoryItems = inventoryItems.filter(item => item.category === category);
                    const categoryValue = categoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);
                    return (
                      <div key={category} className="text-center p-4 border rounded-lg">
                        <div className="text-lg font-bold">{categoryItems.length}</div>
                        <div className="text-sm text-muted-foreground">{category}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          ${categoryValue.toFixed(2)} value
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}