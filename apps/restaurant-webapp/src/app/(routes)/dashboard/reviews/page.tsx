'use client';

import { useState } from 'react';
import { Button } from '@restaurant-webapp/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card';
import { Input } from '@restaurant-webapp/components/ui/input';
import { Badge } from '@restaurant-webapp/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar';
import { Textarea } from '@restaurant-webapp/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@restaurant-webapp/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@restaurant-webapp/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Reply,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const reviews = [
  {
    id: 1,
    customer: 'Sarah Johnson',
    avatar: '/avatars/01.png',
    initials: 'SJ',
    rating: 5,
    date: '2024-01-15',
    meal: 'Mediterranean Bowl',
    orderId: 'ORD-001',
    title: 'Absolutely delicious!',
    comment: 'The Mediterranean Bowl was fresh, flavorful, and perfectly portioned. The delivery was on time and the packaging kept everything fresh. Will definitely order again!',
    helpful: 12,
    replied: true,
    response: 'Thank you so much for your wonderful review, Sarah! We\'re thrilled you enjoyed the Mediterranean Bowl. Looking forward to serving you again soon!',
    responseDate: '2024-01-15',
    status: 'Published',
  },
  {
    id: 2,
    customer: 'Michael Chen',
    avatar: '/avatars/02.png',
    initials: 'MC',
    rating: 4,
    date: '2024-01-14',
    meal: 'Grilled Salmon',
    orderId: 'ORD-002',
    title: 'Great quality, minor issue',
    comment: 'The salmon was cooked perfectly and tasted amazing. However, the delivery was about 15 minutes late. Overall, very satisfied with the food quality.',
    helpful: 8,
    replied: false,
    response: null,
    responseDate: null,
    status: 'Pending Response',
  },
  {
    id: 3,
    customer: 'Emma Wilson',
    avatar: '/avatars/03.png',
    initials: 'EW',
    rating: 5,
    date: '2024-01-13',
    meal: 'Vegan Buddha Bowl',
    orderId: 'ORD-003',
    title: 'Perfect for vegans!',
    comment: 'As someone who follows a strict vegan diet, I was impressed by the variety and taste of this bowl. Every ingredient was fresh and the flavors worked beautifully together.',
    helpful: 15,
    replied: true,
    response: 'Emma, we\'re so happy to hear you loved the Vegan Buddha Bowl! We put a lot of care into our plant-based options. Thank you for choosing us!',
    responseDate: '2024-01-13',
    status: 'Published',
  },
  {
    id: 4,
    customer: 'James Rodriguez',
    avatar: '/avatars/04.png',
    initials: 'JR',
    rating: 2,
    date: '2024-01-12',
    meal: 'Chicken Teriyaki',
    orderId: 'ORD-004',
    title: 'Disappointing experience',
    comment: 'The chicken was overcooked and dry. The teriyaki sauce was too salty. For the price point, I expected much better quality. The delivery was fine though.',
    helpful: 3,
    replied: false,
    response: null,
    responseDate: null,
    status: 'Needs Attention',
  },
  {
    id: 5,
    customer: 'Lisa Thompson',
    avatar: '/avatars/05.png',
    initials: 'LT',
    rating: 5,
    date: '2024-01-11',
    meal: 'Mediterranean Week Plan',
    orderId: 'ORD-005',
    title: 'Amazing meal plan!',
    comment: 'Just finished my first week of the Mediterranean meal plan and I\'m blown away! Every meal was delicious, healthy, and perfectly portioned. The variety kept things interesting throughout the week.',
    helpful: 20,
    replied: true,
    response: 'Lisa, thank you for trying our Mediterranean Week Plan! We\'re delighted it exceeded your expectations. We can\'t wait for you to try our other meal plans!',
    responseDate: '2024-01-11',
    status: 'Published',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Published':
      return 'default';
    case 'Pending Response':
      return 'secondary';
    case 'Needs Attention':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Published':
      return <CheckCircle className="h-4 w-4" />;
    case 'Pending Response':
      return <MessageSquare className="h-4 w-4" />;
    case 'Needs Attention':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? 'fill-current text-yellow-500' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.meal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === 'all' || review.rating.toString() === selectedRating;
    const matchesStatus = selectedStatus === 'all' || review.status.toLowerCase().replace(' ', '-') === selectedStatus;
    return matchesSearch && matchesRating && matchesStatus;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const pendingResponses = reviews.filter(review => !review.replied).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviews & Feedback</h1>
        <p className="text-muted-foreground">
          Monitor customer feedback and manage your restaurant's reputation
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex items-center gap-1 mt-1">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-xs text-muted-foreground">({totalReviews} reviews)</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
            <p className="text-xs text-muted-foreground">
              +12 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Responses</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingResponses}</div>
            <p className="text-xs text-muted-foreground">
              Need your attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Search reviews by customer, meal, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={selectedRating} onValueChange={setSelectedRating}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="pending-response">Pending Response</SelectItem>
            <SelectItem value="needs-attention">Needs Attention</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="pending">Pending Response</TabsTrigger>
          <TabsTrigger value="negative">Needs Attention</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.customer} />
                        <AvatarFallback>{review.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.customer}</div>
                        <div className="text-sm text-muted-foreground">
                          {review.meal} • Order {review.orderId}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusColor(review.status)} className="flex items-center gap-1 mb-2">
                        {getStatusIcon(review.status)}
                        {review.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={review.rating} />
                        <span className="font-medium">{review.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>

                    {review.replied && review.response && (
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Reply className="h-4 w-4" />
                          <span className="font-medium text-sm">Your Response</span>
                          <span className="text-xs text-muted-foreground">{review.responseDate}</span>
                        </div>
                        <p className="text-sm">{review.response}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {review.helpful} helpful
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!review.replied && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm">
                                <Reply className="mr-2 h-4 w-4" />
                                Reply
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Reply to Review</DialogTitle>
                                <DialogDescription>
                                  Respond to {review.customer}'s review of {review.meal}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="p-3 bg-muted rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <StarRating rating={review.rating} />
                                    <span className="font-medium">{review.title}</span>
                                  </div>
                                  <p className="text-sm">{review.comment}</p>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Your Response</label>
                                  <Textarea 
                                    placeholder="Write your response to this review..."
                                    className="min-h-[100px]"
                                  />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button>Send Response</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        <Button variant="outline" size="sm">
                          View Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="space-y-4">
            {filteredReviews
              .filter(review => !review.replied)
              .map((review) => (
                <Card key={review.id} className="border-orange-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.avatar} alt={review.customer} />
                          <AvatarFallback>{review.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.customer}</div>
                          <div className="text-sm text-muted-foreground">
                            {review.meal} • Order {review.orderId}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="flex items-center gap-1 mb-2">
                          <MessageSquare className="h-4 w-4" />
                          Pending Response
                        </Badge>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={review.rating} />
                          <span className="font-medium">{review.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                      <div className="flex justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Reply className="mr-2 h-4 w-4" />
                              Reply Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reply to Review</DialogTitle>
                              <DialogDescription>
                                Respond to {review.customer}'s review of {review.meal}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <StarRating rating={review.rating} />
                                  <span className="font-medium">{review.title}</span>
                                </div>
                                <p className="text-sm">{review.comment}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Your Response</label>
                                <Textarea 
                                  placeholder="Write your response to this review..."
                                  className="min-h-[100px]"
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Send Response</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="negative" className="space-y-4">
          <div className="space-y-4">
            {filteredReviews
              .filter(review => review.rating <= 3)
              .map((review) => (
                <Card key={review.id} className="border-destructive/50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.avatar} alt={review.customer} />
                          <AvatarFallback>{review.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.customer}</div>
                          <div className="text-sm text-muted-foreground">
                            {review.meal} • Order {review.orderId}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive" className="flex items-center gap-1 mb-2">
                          <AlertCircle className="h-4 w-4" />
                          Needs Attention
                        </Badge>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={review.rating} />
                          <span className="font-medium">{review.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Contact Customer
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Reply className="mr-2 h-4 w-4" />
                              Respond
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Address Customer Concern</DialogTitle>
                              <DialogDescription>
                                Respond to {review.customer}'s feedback about {review.meal}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                                <div className="flex items-center gap-2 mb-2">
                                  <StarRating rating={review.rating} />
                                  <span className="font-medium">{review.title}</span>
                                </div>
                                <p className="text-sm">{review.comment}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Your Response</label>
                                <Textarea 
                                  placeholder="Address the customer's concerns and explain how you'll improve..."
                                  className="min-h-[100px]"
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Send Response</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>
                  Breakdown of customer ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = reviews.filter(r => r.rating === rating).length;
                    const percentage = (count / reviews.length) * 100;
                    return (
                      <div key={rating} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-16">
                          <span className="text-sm">{rating}</span>
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                        </div>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Trends</CardTitle>
                <CardDescription>
                  Recent review activity and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">This Week</span>
                    <span className="text-sm text-muted-foreground">12 reviews</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Week</span>
                    <span className="text-sm text-muted-foreground">8 reviews</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Growth</span>
                    <span className="text-sm text-green-600">+50%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg Response Time</span>
                    <span className="text-sm text-muted-foreground">2.3 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Most Reviewed Items</CardTitle>
                <CardDescription>
                  Your most popular meals based on review volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Mediterranean Bowl', 'Grilled Salmon', 'Vegan Buddha Bowl', 'Chicken Teriyaki'].map((meal, index) => {
                    const mealReviews = reviews.filter(r => r.meal === meal);
                    const avgRating = mealReviews.reduce((sum, r) => sum + r.rating, 0) / mealReviews.length;
                    return (
                      <div key={meal} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{meal}</span>
                          <div className="flex items-center gap-1">
                            <StarRating rating={Math.round(avgRating)} />
                            <span className="text-xs text-muted-foreground">
                              ({avgRating.toFixed(1)})
                            </span>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {mealReviews.length} reviews
                        </span>
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