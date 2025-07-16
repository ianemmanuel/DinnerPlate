'use client';

import { useState } from 'react';
import { Button } from '@restaurant-webapp/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card';
import { Input } from '@restaurant-webapp/components/ui/input';
import { Label } from '@restaurant-webapp/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar';
import { Badge } from '@restaurant-webapp/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@restaurant-webapp/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@restaurant-webapp/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@restaurant-webapp/components/ui/table';
import { Textarea } from '@restaurant-webapp/components/ui/textarea';
import { 
  ChefHat,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Star,
  Award,
  Clock,
  Users,
  MoreHorizontal,
  UserPlus,
  Settings,
  Ban,
  CheckCircle,
  AlertCircle,
  MapPin,
  Briefcase
} from 'lucide-react';

interface Chef {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialization: string;
  experience: number;
  rating: number;
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
  avatar?: string;
  branch: string;
  salary: number;
  lastActive: string;
  completedOrders: number;
  certifications: string[];
}

export default function ChefsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const [isAddingChef, setIsAddingChef] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const [chefs] = useState<Chef[]>([
    {
      id: '1',
      name: 'Maria Rodriguez',
      email: 'maria@rusticplates.com',
      phone: '+1 (555) 234-5678',
      role: 'Head Chef',
      specialization: 'Mediterranean Cuisine',
      experience: 12,
      rating: 4.9,
      status: 'active',
      joinDate: '2023-01-15',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      branch: 'Main Branch - Downtown',
      salary: 75000,
      lastActive: '2024-01-15 14:30',
      completedOrders: 1247,
      certifications: ['ServSafe', 'Culinary Arts Degree', 'Wine Sommelier']
    },
    {
      id: '2',
      name: 'James Chen',
      email: 'james@rusticplates.com',
      phone: '+1 (555) 345-6789',
      role: 'Sous Chef',
      specialization: 'Asian Fusion',
      experience: 8,
      rating: 4.7,
      status: 'active',
      joinDate: '2023-03-20',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      branch: 'Main Branch - Downtown',
      salary: 55000,
      lastActive: '2024-01-15 13:45',
      completedOrders: 892,
      certifications: ['ServSafe', 'Asian Culinary Certificate']
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah@rusticplates.com',
      phone: '+1 (555) 456-7890',
      role: 'Pastry Chef',
      specialization: 'Desserts & Baking',
      experience: 6,
      rating: 4.8,
      status: 'on_leave',
      joinDate: '2023-06-10',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
      branch: 'Branch 2 - Uptown',
      salary: 48000,
      lastActive: '2024-01-10 16:20',
      completedOrders: 634,
      certifications: ['Pastry Arts Diploma', 'Food Safety']
    },
    {
      id: '4',
      name: 'Michael Brown',
      email: 'michael@rusticplates.com',
      phone: '+1 (555) 567-8901',
      role: 'Line Cook',
      specialization: 'Grill & Sauces',
      experience: 4,
      rating: 4.5,
      status: 'active',
      joinDate: '2023-09-05',
      branch: 'Main Branch - Downtown',
      salary: 38000,
      lastActive: '2024-01-15 15:10',
      completedOrders: 456,
      certifications: ['Food Handler License']
    },
    {
      id: '5',
      name: 'Emily Davis',
      email: 'emily@rusticplates.com',
      phone: '+1 (555) 678-9012',
      role: 'Prep Cook',
      specialization: 'Vegetarian Dishes',
      experience: 2,
      rating: 4.3,
      status: 'inactive',
      joinDate: '2023-11-15',
      branch: 'Branch 2 - Uptown',
      salary: 32000,
      lastActive: '2024-01-12 11:30',
      completedOrders: 234,
      certifications: ['Food Safety Basic']
    }
  ]);

  const filteredChefs = chefs.filter(chef => {
    const matchesSearch = chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chef.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chef.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || chef.role.toLowerCase().includes(filterRole.toLowerCase());
    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, label: 'Active', icon: CheckCircle },
      inactive: { variant: 'secondary' as const, label: 'Inactive', icon: AlertCircle },
      on_leave: { variant: 'outline' as const, label: 'On Leave', icon: Clock }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const ChefDetailsDialog = ({ chef, onClose }: { chef: Chef; onClose: () => void }) => (
    <Dialog open={!!chef} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={chef.avatar} alt={chef.name} />
              <AvatarFallback>{chef.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{chef.name}</h3>
              <p className="text-muted-foreground">{chef.role}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{chef.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{chef.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{chef.branch}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {chef.joinDate}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{chef.specialization}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{chef.experience} years experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{chef.rating} rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{chef.completedOrders} orders completed</span>
              </div>
            </div>
          </div>

          {/* Status & Performance */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">${chef.salary?.toLocaleString() || 'N/A'}</div>
                <div className="text-sm text-muted-foreground">Annual Salary</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{chef.completedOrders}</div>
                <div className="text-sm text-muted-foreground">Orders Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{chef.rating}</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-medium mb-3">Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {chef.certifications?.map((cert, index) => (
                <Badge key={index} variant="outline">
                  <Award className="h-3 w-3 mr-1" />
                  {cert}
                </Badge>
              )) || <span className="text-sm text-muted-foreground">No certifications listed</span>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              Manage Access
            </Button>
            <Button variant="outline" className="flex-1">
              <Ban className="h-4 w-4 mr-2" />
              Suspend
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AddChefDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Chef</DialogTitle>
          <DialogDescription>
            Add a new chef to your restaurant team
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="chef-name">Full Name</Label>
              <Input id="chef-name" placeholder="Enter chef's full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chef-email">Email</Label>
              <Input id="chef-email" type="email" placeholder="chef@restaurant.com" />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="chef-phone">Phone</Label>
              <Input id="chef-phone" placeholder="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chef-role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="head_chef">Head Chef</SelectItem>
                  <SelectItem value="sous_chef">Sous Chef</SelectItem>
                  <SelectItem value="pastry_chef">Pastry Chef</SelectItem>
                  <SelectItem value="line_cook">Line Cook</SelectItem>
                  <SelectItem value="prep_cook">Prep Cook</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="chef-specialization">Specialization</Label>
              <Input id="chef-specialization" placeholder="e.g., Italian Cuisine" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chef-experience">Years of Experience</Label>
              <Input id="chef-experience" type="number" placeholder="5" />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="chef-branch">Branch</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Branch - Downtown</SelectItem>
                  <SelectItem value="uptown">Branch 2 - Uptown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="chef-salary">Annual Salary</Label>
              <Input id="chef-salary" type="number" placeholder="50000" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="chef-notes">Additional Notes</Label>
            <Textarea id="chef-notes" placeholder="Any additional information about the chef..." />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Chef
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Chef Management</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage your restaurant's culinary team
          </p>
        </div>
        <Button onClick={() => setIsAddingChef(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Chef
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{chefs.length}</div>
                <div className="text-sm text-muted-foreground">Total Chefs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{chefs.filter(c => c.status === 'active').length}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">4.6</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{chefs.reduce((sum, chef) => sum + chef.completedOrders, 0)}</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search chefs by name, email, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="head">Head Chef</SelectItem>
                  <SelectItem value="sous">Sous Chef</SelectItem>
                  <SelectItem value="pastry">Pastry Chef</SelectItem>
                  <SelectItem value="line">Line Cook</SelectItem>
                  <SelectItem value="prep">Prep Cook</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chefs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({filteredChefs.length})</CardTitle>
          <CardDescription>
            Manage your culinary team members and their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chef</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChefs.map((chef) => (
                <TableRow key={chef.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={chef.avatar} alt={chef.name} />
                        <AvatarFallback>{chef.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{chef.name}</div>
                        <div className="text-sm text-muted-foreground">{chef.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{chef.role}</Badge>
                  </TableCell>
                  <TableCell>{chef.specialization}</TableCell>
                  <TableCell className="text-sm">{chef.branch}</TableCell>
                  <TableCell>{chef.experience} years</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {chef.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(chef.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedChef(chef)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {selectedChef && (
        <ChefDetailsDialog
          chef={selectedChef}
          onClose={() => setSelectedChef(null)}
        />
      )}
      
      <AddChefDialog
        open={isAddingChef}
        onClose={() => setIsAddingChef(false)}
      />
    </div>
  );
}