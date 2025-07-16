'use client'

import { useState } from 'react'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Input } from '@restaurant-webapp/components/ui/input'
import { Badge } from '@restaurant-webapp/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@restaurant-webapp/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs'
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp,
  Search,
  Eye,
  Download,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Smartphone,
  Wallet,
  Building
} from 'lucide-react';

const payments = [
  {
    id: 'PAY-001',
    orderId: 'ORD-001',
    customer: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    customerPhone: '+1 (555) 123-4567',
    avatar: '/avatars/01.png',
    initials: 'SJ',
    amount: 34.98,
    method: 'Credit Card',
    cardLast4: '4242',
    cardBrand: 'Visa',
    status: 'Completed',
    transactionId: 'txn_1234567890',
    timestamp: '2024-01-15 14:30',
    processingFee: 1.05,
    netAmount: 33.93,
    refundable: true,
  },
  {
    id: 'PAY-002',
    orderId: 'ORD-002',
    customer: 'Michael Chen',
    customerEmail: 'michael.c@email.com',
    customerPhone: '+1 (555) 234-5678',
    avatar: '/avatars/02.png',
    initials: 'MC',
    amount: 42.98,
    method: 'Digital Wallet',
    walletType: 'Apple Pay',
    status: 'Completed',
    transactionId: 'txn_0987654321',
    timestamp: '2024-01-15 12:15',
    processingFee: 1.29,
    netAmount: 41.69,
    refundable: true,
  },
  {
    id: 'PAY-003',
    orderId: 'ORD-003',
    customer: 'Emma Wilson',
    customerEmail: 'emma.w@email.com',
    customerPhone: '+1 (555) 345-6789',
    avatar: '/avatars/03.png',
    initials: 'EW',
    amount: 28.98,
    method: 'Credit Card',
    cardLast4: '8888',
    cardBrand: 'Mastercard',
    status: 'Pending',
    transactionId: 'txn_1122334455',
    timestamp: '2024-01-15 10:45',
    processingFee: 0.87,
    netAmount: 28.11,
    refundable: false,
  },
  {
    id: 'PAY-004',
    orderId: 'ORD-004',
    customer: 'James Rodriguez',
    customerEmail: 'james.r@email.com',
    customerPhone: '+1 (555) 456-7890',
    avatar: '/avatars/04.png',
    initials: 'JR',
    amount: 24.98,
    method: 'Bank Transfer',
    bankName: 'Chase Bank',
    status: 'Failed',
    transactionId: 'txn_5566778899',
    timestamp: '2024-01-15 09:20',
    processingFee: 0.00,
    netAmount: 0.00,
    refundable: false,
    failureReason: 'Insufficient funds',
  },
  {
    id: 'PAY-005',
    orderId: 'ORD-005',
    customer: 'Lisa Thompson',
    customerEmail: 'lisa.t@email.com',
    customerPhone: '+1 (555) 567-8901',
    avatar: '/avatars/05.png',
    initials: 'LT',
    amount: 89.99,
    method: 'Credit Card',
    cardLast4: '1234',
    cardBrand: 'American Express',
    status: 'Refunded',
    transactionId: 'txn_9988776655',
    timestamp: '2024-01-14 16:30',
    processingFee: 2.70,
    netAmount: 87.29,
    refundAmount: 89.99,
    refundDate: '2024-01-15 10:00',
    refundable: false,
  },
];

const paymentMethods = [
  { name: 'Credit Card', count: 1247, percentage: 62.3, icon: CreditCard },
  { name: 'Digital Wallet', count: 456, percentage: 22.8, icon: Smartphone },
  { name: 'Bank Transfer', count: 234, percentage: 11.7, icon: Building },
  { name: 'Other', count: 63, percentage: 3.2, icon: Wallet },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'default';
    case 'Pending':
      return 'secondary';
    case 'Failed':
      return 'destructive';
    case 'Refunded':
      return 'outline';
    default:
      return 'outline';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'Pending':
      return <Clock className="h-4 w-4 text-orange-500" />;
    case 'Failed':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'Refunded':
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getMethodIcon = (method: string) => {
  switch (method) {
    case 'Credit Card':
      return <CreditCard className="h-4 w-4" />;
    case 'Digital Wallet':
      return <Smartphone className="h-4 w-4" />;
    case 'Bank Transfer':
      return <Building className="h-4 w-4" />;
    default:
      return <Wallet className="h-4 w-4" />;
  }
};

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<typeof payments[0] | null>(null);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || payment.status.toLowerCase() === selectedStatus;
    const matchesMethod = selectedMethod === 'all' || payment.method.toLowerCase().replace(' ', '-') === selectedMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalRevenue = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
  const totalTransactions = payments.length;
  const successRate = (payments.filter(p => p.status === 'Completed').length / totalTransactions) * 100;
  const totalFees = payments.reduce((sum, p) => sum + p.processingFee, 0);

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Payment Management</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Monitor transactions, process refunds, and analyze payment data
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{successRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Payment success rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Processing Fees</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">${totalFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total fees paid
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by payment ID, customer, or order..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMethod} onValueChange={setSelectedMethod}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="credit-card">Credit Card</SelectItem>
              <SelectItem value="digital-wallet">Digital Wallet</SelectItem>
              <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions" className="text-xs md:text-sm">Transactions</TabsTrigger>
          <TabsTrigger value="methods" className="text-xs md:text-sm">Payment Methods</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs md:text-sm">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Payment Transactions</CardTitle>
              <CardDescription>
                Complete list of all payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Payment ID</TableHead>
                      <TableHead className="min-w-[200px]">Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{payment.id}</div>
                            <div className="text-xs text-muted-foreground">
                              Order: {payment.orderId}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage src={payment.avatar} alt={payment.customer} />
                              <AvatarFallback>{payment.initials}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="font-medium text-sm truncate">{payment.customer}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {payment.customerEmail}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${payment.amount}</div>
                          {payment.status === 'Completed' && (
                            <div className="text-xs text-muted-foreground">
                              Net: ${payment.netAmount}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getMethodIcon(payment.method)}
                            <div>
                              <div className="text-sm">{payment.method}</div>
                              {payment.cardLast4 && (
                                <div className="text-xs text-muted-foreground">
                                  •••• {payment.cardLast4}
                                </div>
                              )}
                              {payment.walletType && (
                                <div className="text-xs text-muted-foreground">
                                  {payment.walletType}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(payment.status)}
                            <Badge variant={getStatusColor(payment.status)} className="text-xs">
                              {payment.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{payment.timestamp}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => setSelectedPayment(payment)}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl mx-4">
                              <DialogHeader>
                                <DialogTitle>Payment Details</DialogTitle>
                                <DialogDescription>
                                  Complete information for payment {payment.id}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedPayment && (
                                <div className="space-y-6">
                                  <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                      <h4 className="font-medium mb-2">Transaction Information</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span>Payment ID:</span>
                                          <span className="font-medium">{selectedPayment.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Order ID:</span>
                                          <span className="font-medium">{selectedPayment.orderId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Transaction ID:</span>
                                          <span className="font-medium">{selectedPayment.transactionId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Status:</span>
                                          <Badge variant={getStatusColor(selectedPayment.status)}>
                                            {selectedPayment.status}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Customer Information</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span>Name:</span>
                                          <span className="font-medium">{selectedPayment.customer}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Email:</span>
                                          <span className="font-medium">{selectedPayment.customerEmail}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Phone:</span>
                                          <span className="font-medium">{selectedPayment.customerPhone}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Payment Breakdown</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span>Amount:</span>
                                        <span className="font-medium">${selectedPayment.amount}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Processing Fee:</span>
                                        <span className="font-medium">${selectedPayment.processingFee}</span>
                                      </div>
                                      <div className="flex justify-between border-t pt-2">
                                        <span className="font-medium">Net Amount:</span>
                                        <span className="font-medium">${selectedPayment.netAmount}</span>
                                      </div>
                                      {selectedPayment.refundAmount && (
                                        <div className="flex justify-between text-red-600">
                                          <span>Refunded:</span>
                                          <span className="font-medium">${selectedPayment.refundAmount}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {selectedPayment.failureReason && (
                                    <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">
                                        Failure Reason
                                      </h4>
                                      <p className="text-sm text-red-700 dark:text-red-300">
                                        {selectedPayment.failureReason}
                                      </p>
                                    </div>
                                  )}

                                  <div className="flex gap-2">
                                    {selectedPayment.refundable && selectedPayment.status === 'Completed' && (
                                      <Button variant="outline" size="sm">
                                        Process Refund
                                      </Button>
                                    )}
                                    <Button variant="outline" size="sm">
                                      <Download className="mr-2 h-4 w-4" />
                                      Download Receipt
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      Contact Customer
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {paymentMethods.map((method, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <method.icon className="h-5 w-5" />
                    {method.name}
                  </CardTitle>
                  <CardDescription>
                    {method.percentage}% of all transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Transactions</span>
                      <span className="text-lg font-bold">{method.count}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-sm text-muted-foreground">
                        {method.name === 'Credit Card' ? '96.2%' :
                         method.name === 'Digital Wallet' ? '98.1%' :
                         method.name === 'Bank Transfer' ? '89.3%' : '94.5%'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Avg Processing Fee</span>
                      <span className="text-sm text-muted-foreground">
                        {method.name === 'Credit Card' ? '2.9%' :
                         method.name === 'Digital Wallet' ? '3.1%' :
                         method.name === 'Bank Transfer' ? '1.2%' : '2.5%'}
                      </span>
                    </div>
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
                <CardTitle className="text-lg md:text-xl">Revenue Trends</CardTitle>
                <CardDescription>
                  Monthly payment processing performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">This Month</span>
                    <span className="text-sm text-muted-foreground">${totalRevenue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Month</span>
                    <span className="text-sm text-muted-foreground">$18,456.78</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Growth</span>
                    <span className="text-sm text-green-600">+12.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg Transaction</span>
                    <span className="text-sm text-muted-foreground">
                      ${(totalRevenue / totalTransactions).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Processing Metrics</CardTitle>
                <CardDescription>
                  Payment processing efficiency and costs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Fees</span>
                    <span className="text-sm text-muted-foreground">${totalFees.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Effective Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {((totalFees / totalRevenue) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Failed Transactions</span>
                    <span className="text-sm text-muted-foreground">
                      {payments.filter(p => p.status === 'Failed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Refund Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {((payments.filter(p => p.status === 'Refunded').length / totalTransactions) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}