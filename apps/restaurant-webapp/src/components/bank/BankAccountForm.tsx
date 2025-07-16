'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { bankAccountSchema, BankAccountFormData } from '@restaurant-webapp/lib/validators/bank-validators'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Checkbox } from '../ui/checkbox'
import { toast } from 'sonner'
import { CheckCircle, AlertCircle, CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Controller } from 'react-hook-form'
import { useAuthStore } from '@restaurant-webapp/lib/store/auth-store'


interface Bank {
  id: number
  code: string
  name: string
}

const initialFormData: BankAccountFormData = {
  bankName: '',
  branchName: '',
  bankCode: '',
  accountNumber: '',
  accountName: '',
  swiftCode: '',
  confirmDetails: false,
}

//* API handler functions
async function fetchBanks(): Promise<Bank[]> {
  const res = await fetch('/api/banks')
  if (!res.ok) throw new Error('Failed to fetch banks')
  return res.json()
}
 
async function submitBankDetails(data: BankAccountFormData) {
  const { authFetch } = useAuthStore.getState();

  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/vendor/bank-account`, // ⬅ call Express directly
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )

  if (!res.ok) {
    // Pass through backend error message if available
    const { message } = await res.json().catch(() => ({}))
    throw new Error(message ?? 'Failed to submit bank details')
  }

  return res.json()
}


export default function BankAccountForm() {
  // Fetch banks with TanStack Query
  const { data: banks, isLoading: loadingBanks } = useQuery<Bank[]>({
    queryKey: ['banks'],
    queryFn: fetchBanks,
  })

  // Form setup with React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: initialFormData,
  })
  const router = useRouter()
  // Memoize banks for faster lookup
  const banksMap = useMemo(() => {
    const map: Record<string, string> = {}
    banks?.forEach((bank) => {
      map[bank.name] = bank.code
    })
    return map
  }, [banks])

  // Handle bank selection
  const handleBankSelect = (bankName: string) => {
    const selectedBankCode = banksMap[bankName] || ''
    setValue('bankName', bankName)
    setValue('bankCode', selectedBankCode, { shouldValidate: true })
  }

  // Mutation for form submission
  const mutation = useMutation({
    mutationFn: (data: BankAccountFormData) => submitBankDetails(data),
    onSuccess: () => {
      toast.success('Bank account linked successfully!', {
        description: 'Your payout details have been saved and verified.',
      })
      reset()
      router.push('/dashboard/onboarding')
    },
    onError: () => {
      toast.error('Failed to link bank account', {
        description: 'Please try again or contact support if the issue persists.',
      })
    },
  })

  // Form values
  const formValues = watch()

  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Bank Account Information
          </CardTitle>
          <CardDescription>
            Enter your bank account details to receive payments. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
            {/* Bank Name */}
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name *</Label>
              <Select
                value={formValues.bankName}
                onValueChange={handleBankSelect}
              >
                <SelectTrigger className={errors.bankName ? 'border-destructive' : ''}>
                  <SelectValue placeholder={loadingBanks ? 'Loading banks...' : 'Select your bank'} />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {banks?.map((bank) => (
                    <SelectItem key={bank.code} value={bank.name}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.bankName && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.bankName?.message}
                </p>
              )}
            </div>

            {/* Branch Name */}
            <div className="space-y-2">
              <Label htmlFor="branchName">Branch Name or Code *</Label>
              <Input
                id="branchName"
                placeholder="e.g. Westlands Branch or 12345"
                {...register('branchName')}
                className={errors.branchName ? 'border-destructive' : ''}
              />
              {errors.branchName && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.branchName?.message}
                </p>
              )}
            </div>

            {/* Bank Code (Auto-filled) */}
            <div className="space-y-2">
              <Label htmlFor="bankCode">Bank Code (Auto-filled)</Label>
              <Input
                id="bankCode"
                value={formValues.bankCode}
                disabled
                className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                Bank code automatically set based on your bank selection.
              </p>
            </div>

            {/* Account Number */}
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                placeholder="e.g. 0123456789"
                {...register('accountNumber', {
                  onChange: (e) => {
                    setValue('accountNumber', e.target.value.replace(/\D/g, ''), { shouldValidate: true })
                  }
                })}
                className={errors.accountNumber ? 'border-destructive' : ''}
                maxLength={16}
              />
              {errors.accountNumber && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.accountNumber?.message}
                </p>
              )}
            </div>

            {/* Account Name */}
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name (Beneficiary Name) *</Label>
              <Input
                id="accountName"
                placeholder="e.g. Mama Jane Ltd."
                {...register('accountName')}
                className={errors.accountName ? 'border-destructive' : ''}
              />
              {errors.accountName && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.accountName?.message}
                </p>
              )}
            </div>

            <Separator />

            {/* Confirmation Checkbox */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Controller
                  name="confirmDetails"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="confirmDetails"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={errors.confirmDetails ? 'border-destructive' : ''}
                    />
                  )}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="confirmDetails"
                    className="text-sm font-medium leading-none"
                  >
                    I confirm these details are correct and I am authorized to receive payouts to this account.
                  </Label>
                </div>
              </div>
              {errors.confirmDetails && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.confirmDetails?.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={isSubmitting || mutation.isPending}
                className="flex-1 sm:flex-none"
              >
                {mutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Linking Account...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Link Bank Account
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => reset()}
              >
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}