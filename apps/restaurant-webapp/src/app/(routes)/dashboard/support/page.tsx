'use client'

import { useState } from 'react'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Input } from '@restaurant-webapp/components/ui/input'
import { Label } from '@restaurant-webapp/components/ui/label'
import { Textarea } from '@restaurant-webapp/components/ui/textarea'
import { Badge } from '@restaurant-webapp/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@restaurant-webapp/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@restaurant-webapp/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs'
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail,
  Book,
  Video,
  FileText,
  Search,
  Send,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const faqs = [
  {
    question: 'How do I add a new meal to my menu?',
    answer: 'To add a new meal, go to the Meals page and click the "Add New Meal" button. Fill in the meal details including name, description, price, category, and upload an image. Make sure to set the correct preparation time and any dietary restrictions.',
  },
  {
    question: 'How can I track my delivery drivers?',
    answer: 'You can track all active deliveries in real-time on the Delivery Tracking page. This shows driver locations, estimated delivery times, and customer information. You can also contact drivers directly from this interface.',
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We support all major credit cards (Visa, Mastercard, American Express), digital wallets (Apple Pay, Google Pay, Samsung Pay), and bank transfers. You can configure which payment methods to accept in your Settings.',
  },
  {
    question: 'How do I create a meal plan?',
    answer: 'Navigate to the Meal Plans page and click "Create Meal Plan". Choose the meals to include, set the duration, pricing, and delivery schedule. You can also set subscriber limits and special offers for your meal plans.',
  },
  {
    question: 'How do I manage inventory alerts?',
    answer: 'In the Inventory page, you can set minimum stock levels for each ingredient. When stock falls below these levels, you\'ll receive automatic alerts via email, push notifications, or SMS based on your notification preferences.',
  },
  {
    question: 'Can I customize my delivery areas?',
    answer: 'Yes, you can set your delivery radius, minimum order amounts, and delivery fees in the Settings under the Delivery tab. You can also set different delivery windows and enable scheduled deliveries.',
  },
];

const supportTickets = [
  {
    id: 'TICK-001',
    subject: 'Payment processing issue',
    status: 'Open',
    priority: 'High',
    created: '2024-01-15 14:30',
    lastUpdate: '2024-01-15 16:45',
    category: 'Payments',
  },
  {
    id: 'TICK-002',
    subject: 'Menu item not displaying correctly',
    status: 'In Progress',
    priority: 'Medium',
    created: '2024-01-14 10:20',
    lastUpdate: '2024-01-15 09:15',
    category: 'Technical',
  },
  {
    id: 'TICK-003',
    subject: 'Question about meal plan features',
    status: 'Resolved',
    priority: 'Low',
    created: '2024-01-13 16:30',
    lastUpdate: '2024-01-14 11:00',
    category: 'General',
  },
];

const resources = [
  {
    title: 'Getting Started Guide',
    description: 'Complete guide to setting up your restaurant on MealPlan Pro',
    type: 'Guide',
    icon: Book,
    link: '#',
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video tutorials for all platform features',
    type: 'Video',
    icon: Video,
    link: '#',
  },
  {
    title: 'API Documentation',
    description: 'Technical documentation for developers and integrations',
    type: 'Documentation',
    icon: FileText,
    link: '#',
  },
  {
    title: 'Best Practices',
    description: 'Tips and strategies for maximizing your restaurant success',
    type: 'Guide',
    icon: Book,
    link: '#',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open':
      return 'destructive';
    case 'In Progress':
      return 'secondary';
    case 'Resolved':
      return 'default';
    default:
      return 'outline';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'destructive';
    case 'Medium':
      return 'secondary';
    case 'Low':
      return 'outline';
    default:
      return 'outline';
  }
};

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
  });

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Support Center</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Get help, find answers, and contact our support team
        </p>
      </div>

      {/* Quick Contact */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="h-8 w-8 mx-auto text-primary" />
            <CardTitle className="text-lg">Live Chat</CardTitle>
            <CardDescription>
              Chat with our support team in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <Phone className="h-8 w-8 mx-auto text-primary" />
            <CardTitle className="text-lg">Phone Support</CardTitle>
            <CardDescription>
              Call us for immediate assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              +1 (555) 123-HELP
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <Mail className="h-8 w-8 mx-auto text-primary" />
            <CardTitle className="text-lg">Email Support</CardTitle>
            <CardDescription>
              Send us an email for detailed help
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              support@restaurant-webappmealplanpro.com
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="faq" className="text-xs md:text-sm">FAQ</TabsTrigger>
          <TabsTrigger value="tickets" className="text-xs md:text-sm">Support Tickets</TabsTrigger>
          <TabsTrigger value="contact" className="text-xs md:text-sm">Contact Us</TabsTrigger>
          <TabsTrigger value="resources" className="text-xs md:text-sm">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Your Support Tickets</CardTitle>
              <CardDescription>
                Track and manage your support requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{ticket.subject}</h4>
                        <Badge variant={getStatusColor(ticket.status)} className="text-xs">
                          {ticket.status}
                        </Badge>
                        <Badge variant={getPriorityColor(ticket.priority)} className="text-xs">
                          {ticket.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>#{ticket.id}</span>
                        <span>{ticket.category}</span>
                        <span>Created: {ticket.created}</span>
                        <span>Updated: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Create Support Ticket</CardTitle>
              <CardDescription>
                Submit a new support request for personalized assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={ticketForm.category} onValueChange={(value) => setTicketForm(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="payments">Payments</SelectItem>
                        <SelectItem value="orders">Orders</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                        <SelectItem value="account">Account</SelectItem>
                        <SelectItem value="general">General Question</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue..."
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex gap-2">
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Ticket
                  </Button>
                  <Button variant="outline">
                    Save Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Support Hours</CardTitle>
              <CardDescription>
                When you can reach our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Live Chat</span>
                  <span className="text-sm text-muted-foreground">24/7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Phone Support</span>
                  <span className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Email Support</span>
                  <span className="text-sm text-muted-foreground">24/7 (Response within 24h)</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-green-600">Support team is currently online</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <resource.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">System Status</CardTitle>
              <CardDescription>
                Current status of MealPlan Pro services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Platform Status</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Payment Processing</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Delivery Tracking</span>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-orange-600">Partial Outage</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Notifications</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}