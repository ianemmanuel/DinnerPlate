
import { Alert, AlertDescription } from '@restaurant-webapp/components/ui/alert'
import { Shield, AlertTriangle, Banknote } from 'lucide-react'
import BankAccountForm from '@restaurant-webapp/components/bank/BankAccountForm'
import Sidebar from '@restaurant-webapp/components/bank/payout-settings-sidebar'

export default function BankAccountsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
            <Banknote className="h-8 w-8 text-primary" />
            Bank Account Setup
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-2">
            Link your bank account to receive payouts from orders and subscriptions
          </p>
        </div>
      </div>

      {/* Security notice */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Secure & Encrypted:</strong> Your banking information is protected with bank-level security and encryption. We never store your full account details on our servers.
        </AlertDescription>
      </Alert>

      {/* Warning notice */}
      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>Please double-check your details.</strong> Incorrect info may delay your payouts.
        </AlertDescription>
      </Alert>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BankAccountForm />
        </div>
        <Sidebar />
      </div>
    </div>
  )
}
