import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar';

const orders = [
  {
    id: '1',
    customer: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    amount: '+$1,999.00',
    avatar: '/avatars/01.png',
    initials: 'SJ',
    meal: 'Mediterranean Bowl',
  },
  {
    id: '2',
    customer: 'Michael Chen',
    email: 'michael.c@email.com',
    amount: '+$39.00',
    avatar: '/avatars/02.png',
    initials: 'MC',
    meal: 'Grilled Salmon',
  },
  {
    id: '3',
    customer: 'Emma Wilson',
    email: 'emma.w@email.com',
    amount: '+$299.00',
    avatar: '/avatars/03.png',
    initials: 'EW',
    meal: 'Vegan Buddha Bowl',
  },
  {
    id: '4',
    customer: 'James Rodriguez',
    email: 'james.r@email.com',
    amount: '+$99.00',
    avatar: '/avatars/04.png',
    initials: 'JR',
    meal: 'Chicken Teriyaki',
  },
  {
    id: '5',
    customer: 'Lisa Thompson',
    email: 'lisa.t@email.com',
    amount: '+$39.00',
    avatar: '/avatars/05.png',
    initials: 'LT',
    meal: 'Pasta Primavera',
  },
];

export function RecentOrders() {
  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={order.avatar} alt="Avatar" />
            <AvatarFallback>{order.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order.customer}</p>
            <p className="text-sm text-muted-foreground">{order.meal}</p>
          </div>
          <div className="ml-auto font-medium">{order.amount}</div>
        </div>
      ))}
    </div>
  );
}