
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { CheckCircle, Building2 } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

export default function Sidebar() {
  return (
    <div className="space-y-6">
      {/* Why link your account */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Why Link Your Account?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Automatic Payouts</p>
              <p className="text-xs text-muted-foreground">Receive payments directly to your account</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Fast Processing</p>
              <p className="text-xs text-muted-foreground">Payments processed within 1-2 business days</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Secure Transactions</p>
              <p className="text-xs text-muted-foreground">Bank-level security for all transfers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payout schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payout Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Frequency</span>
            <span className="text-sm text-muted-foreground">Weekly</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Payout Day</span>
            <span className="text-sm text-muted-foreground">Every Friday</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Processing Time</span>
            <span className="text-sm text-muted-foreground">1–2 business days</span>
          </div>
          <Separator />
          <p className="text-xs text-muted-foreground">
            Minimum payout amount is KES 1,000. Amounts below this threshold will roll over to the next cycle.
          </p>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <CardHeader>
          <CardTitle className="text-lg text-amber-800 dark:text-amber-200">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
            Having trouble linking your account? Our support team is here to help.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
