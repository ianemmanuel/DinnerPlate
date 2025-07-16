"use client";

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@user-webapp/components/ui/button"
import { Input } from "@user-webapp/components/ui/input"
import { useToast } from "@user-webapp/hooks/use-toast"
import { Card } from "@user-webapp/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@user-webapp/components/ui/form"
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios"

const emailSchema = z.object({
  email: z.string().email({ message: "Your email address is invalid" }),
})

const passwordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

type EmailData = z.infer<typeof emailSchema>
type PasswordData = z.infer<typeof passwordSchema>

export default function ForgotPassword() {

  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [passwordVisible, setpasswordVisible] = useState(false)
  const [step, setStep] = useState<"email" | "otp" | "reset">("email")
  const [otp, setOtp] = useState(["","","",""])
  const [userEmail, setUserEmail] = useState<string |null>(null)
  const [canResend, setCanResend] = useState(true)
  const [timer, setTimer] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { toast } = useToast()

  
  const emailForm = useForm<EmailData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })
  const passwordForm = useForm<PasswordData>({
      resolver: zodResolver(passwordSchema),
      defaultValues: {
        password: "",
      },
  })

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if(prev <= 1){
          clearInterval(interval)
          setCanResend(true)
          return 0
        }
        return prev -1
      })
    }, 1000)
  }

  const requestOtpMutation = useMutation({
    mutationFn: async ({email}:{email:string}) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/forgot-password-user`,
        { email }
      )
      return response.data
    },
    onSuccess: (_, { email }) => {
      setUserEmail(email)
      setStep("otp")
      setServerError(null)
      setCanResend(false)
      startResendTimer()
    },
    onError: (error:AxiosError) => {
      const errorMessage = (error.response?.data as {message?:string})?.message || "Invalid OTP. Try again!"
      
      setServerError(errorMessage)
      toast({
        title: "Password reset failed",
        description: errorMessage,
        variant: "destructive",
      })
    }
  })

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      if(!userEmail) return
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/verify-forgot-password-user`,
        { email: userEmail, otp: otp.join("")}
      )
      return response.data
    },
    onSuccess: () => {
      setStep("reset")
      setServerError(null)
      console.log("Hurray!!")
    },
    onError: (error:AxiosError) => {
      const errorMessage = (error.response?.data as {message?:string})?.message || "Invalid OTP. Try again!"

      setServerError(errorMessage)
      toast({
        title: "Password reset failed",
        description: errorMessage,
        variant: "destructive",
      })
      console.log(errorMessage)
    }
  })

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ password }: { password:string }) =>{
      if(!password) return
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/reset-password-user`,
        { email: userEmail, newPassword: password }
      )
      return response.data
    },
    onSuccess: () => {
      setServerError(null)
      toast({
        title: "Success!",
        description: "Password reset successfully! Please login with your new password",
        variant:"default",
      })
      router.push("/login")
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "Something went wrong. Please try again."

      setServerError(errorMessage)

      toast({
        title: "Password reset failed",
        description: errorMessage,
        variant: "destructive",
      })
    }


  })

  const handleOtpChange = (index: number, value:string) => {
    if(!/^[0-9]?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if(value && index < inputRefs.current.length -1){
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Backspace" && !otp[index] && index > 0){
      inputRefs.current[index -1]?.focus()
    }
  }

  const onSubmitEmail = ({ email }: {email:string}) => {
    requestOtpMutation.mutate({ email })
  }

  const onSubmitPassword = ({ password }: { password:string }) => {
    resetPasswordMutation.mutate({ password })
  }


  return (
      <Card className="p-8 shadow-lg">
        { step == "email" && (
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <p className="text-muted-foreground">
                  Enter your email to receive an OTP
                </p>
              </div>

              <FormField
                control={emailForm.control}
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
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={requestOtpMutation.isPending}
              >
                {requestOtpMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>            
              
              <p className="text-center text-sm text-muted-foreground">
                Go back to{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Login
                </Link>
              </p>
              {/* server error display */}
              {/* {serverError && (
                <p className="text-red-500 text-sm mt-2">{serverError}</p>
              )} */}
            </form>
          </Form>        
        )}
        { step ==="otp" && (
          <>
            <form onSubmit={(e) => {
              e.preventDefault();
              verifyOtpMutation.mutate();
              }} 
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">Enter OTP</h1>
                <p className="text-muted-foreground">
                  Enter OTP to activate your account
                </p>
              </div>
              <div className="flex justify-center gap-6">
                {otp?.map((digit, index) => (
                  <Input
                    key={index}
                    type="text"
                    ref={(el)=>{
                      if(el) inputRefs.current[index] = el
                    }}
                    maxLength={1}
                    className="w-12 h-12 text-center border border-gray-300 outline-none !rounded"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)} 
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}

                  />
                ))}
              </div>

              <Button 
                className="w-full cursor-pointer" 
                disabled={verifyOtpMutation.isPending}
                onClick={() => verifyOtpMutation.mutate()} 
              >
                {verifyOtpMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying ...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
              <p className="text-center text-sm mt-4">
                {canResend ? (
                  <Button
                    onClick={
                      ()=>requestOtpMutation.mutate({email: userEmail!})
                    }
                    variant="link"
                    className="text-primary p-0 h-auto"
                  >
                    Resend OTP
                  </Button>
                ):(
                  `Resend OTP in ${timer}s`
                )}
              </p>
              {serverError && (
                  <p className="text-red-500 text-sm mt-2">
                    {serverError}
                  </p>
                )
              }
            </form>
          </>
        )}
        {step === "reset" && (
          <Form {... passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold">New Password</h1>
                  <p className="text-muted-foreground">
                    Enter your new password
                  </p>
                </div>

                <FormField
                  control={ passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Enter new password" 
                            type={passwordVisible ? "text" : "password"}
                            autoComplete="new-password"
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
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>            

                {serverError && (
                  <p className="text-red-500 text-sm mt-2">{serverError}</p>
                )}
              </form>
          </Form>
        )}

      </Card>
  )
}
