import { Card } from "@user-webapp/components/ui/card";
import { CreditCard } from "lucide-react";
import { Button } from "@user-webapp/components/ui/button";

export function BillingTab() {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-lg flex items-center gap-2">
          <CreditCard className="h-5 w-5" /> Payment Methods
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">Visa •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 05/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <Button variant="outline" className="w-full">Add Payment Method</Button>
        </div>
        <div className="space-y-4 pt-6 border-t">
          <h3 className="font-medium text-lg">Billing History</h3>
          {[
            { label: "Meal Plan Subscription", date: "May 15, 2023", amount: "$29.99" },
            { label: "Dinner Order", date: "May 10, 2023", amount: "$42.50" },
          ].map(({ label, date, amount }) => (
            <div key={label} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-muted-foreground">{date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{amount}</p>
                <p className="text-sm text-muted-foreground">Visa •••• 4242</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
