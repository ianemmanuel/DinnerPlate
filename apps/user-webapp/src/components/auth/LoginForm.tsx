"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@user-webapp/components/ui/button"
import { Input } from "@user-webapp/components/ui/input"
import { Checkbox } from "@user-webapp/components/ui/checkbox"
import { useToast } from "@user-webapp/hooks/use-toast"
import { Label } from "@user-webapp/components/ui/label"
import { Separator } from "@user-webapp/components/ui/separator"
import { Card } from "@user-webapp/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@user-webapp/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

const loginSchema = z.object({
  email: z.string().email({ message: "Your email address is invalid" }),
  password: z.string().min(6, { message: "Password must be at least 8 characters" }),
})

type LoginData = z.infer<typeof loginSchema>

export default function LoginForm() {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [passwordVisible, setpasswordVisible] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { toast } = useToast()

  useEffect(() => {
    if (serverError) {
      toast({
        title: "Login failed",
        description: serverError,
        variant: "destructive",
      })
    }
  }, [serverError, toast])


  const loginMutation = useMutation({
    mutationFn: async (data: LoginData ) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/login-user`,
        data,
        { withCredentials: true}
      )
      return response.data

    },
    onSuccess: (data) => {
      setServerError(null),
      router.push("/")
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as {message?:string})?.message || "Invalid credentials"
      setServerError(errorMessage)
    }
     
  })

  const onSubmit = async(data: LoginData) =>{
    loginMutation.mutate(data)
  }

  return (
      <Card className="p-8 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground">
                Sign in to your account
              </p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      type="email" 
                      autoComplete="email"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Min. 6 characters"
                        type={passwordVisible ? "text" : "password"}
                        autoComplete="current-password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setpasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                />
                <Label htmlFor="remember-me">Remember me</Label>
              </div>
              <Link href={"/forgot-password"} className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button" disabled={isLoading}>
                <GoogleIcon className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button variant="outline" type="button" disabled={isLoading}>
                <AppleIcon className="w-4 h-4 mr-2" />
                Apple
              </Button>
            </div>
            
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
            {serverError && (
              <p className="text-red-500 text-sm mt-2">{serverError}</p>
            )}
          </form>
        </Form>
      </Card>
  )
}

// SVG Icons for social buttons
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}