// src/hooks/usePhoneVerification.ts
import { useMutation } from '@tanstack/react-query';
import { useSignupStore } from '@restaurant-webapp/lib/store/signup-store';
import { toast } from 'sonner';

export const usePhoneVerification = () => {
    const { businessPhone, updateField } = useSignupStore();

    const sendOtpMutation = useMutation({
        mutationFn: async (phone: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/send-vendor-phone-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to send OTP');
            }
            return response.json();
        },
        onSuccess: () => {
            toast.success('Verification code sent to your phone');
        },
        onError: (error: Error) => {
            toast.error('Failed to send code', {
                description: error.message,
            });
        }
    });

    const verifyOtpMutation = useMutation({
        mutationFn: async (otp: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/send-vendor-phone-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    phone: businessPhone, 
                    otp 
                }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Verification failed');
            }
            return response.json();
        },
        onSuccess: () => {
            updateField('phoneVerified', true);
            toast.success('Phone verified successfully');
        },
        onError: (error: Error) => {
            toast.error('Verification failed', {
                description: error.message,
            });
        }
    });

    return {
        sendOtp: sendOtpMutation.mutateAsync,
        verifyOtp: verifyOtpMutation.mutateAsync,
        isSending: sendOtpMutation.isPending,
        isVerifying: verifyOtpMutation.isPending,
    };
};