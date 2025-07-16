'use client'

import { useState } from 'react'
import { useSignupStore } from '@restaurant-webapp/lib/store/signup-store'
import { ProgressBar } from './ProgressBar'
import { BusinessTypeStep } from './BusinessTypeStep'
import { CreateAccountStep } from './CreateAccountStep'
import { EmailVerificationStep } from './EmailVerificationStep'
import { BusinessProfileStep } from './BusinessProfileStep'
import { PhoneVerificationStep } from './PhoneVerificationStep'
import { ReviewSubmissionStep } from './ReviewSubmissionStep'
import { PendingReviewStep } from './PendingReviewStep'
import { Card } from '@restaurant-webapp/components/ui/card'

const STEPS = [
  'Business Type',
  'Create Account',
  'Verify Email',
  'Business Profile',
  'Verify Phone',
  'Review',
  'Submission',
];

export function SignupForm() {
  const { currentStep, setCurrentStep } = useSignupStore();
  const [animate, setAnimate] = useState(false);

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
      setAnimate(false);
    }, 300);
  };

  const handleBack = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentStep(currentStep - 1);
      setAnimate(false);
    }, 300);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Join Our Platform
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete the steps below to create your business account and start serving customers.
        </p>
      </div>
      
      <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} labels={STEPS} />
      
      <Card className={`p-6 mb-8 transition-all duration-300 ${animate ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
        {currentStep === 1 && <BusinessTypeStep onNext={handleNext} />}
        {currentStep === 2 && <CreateAccountStep onNext={handleNext} onBack={handleBack} />}
        {currentStep === 3 && <EmailVerificationStep onNext={handleNext} onBack={handleBack} />}
        {currentStep === 4 && <BusinessProfileStep onNext={handleNext} onBack={handleBack} />}
        {currentStep === 5 && <PhoneVerificationStep onNext={handleNext} onBack={handleBack} />}
        {currentStep === 6 && <ReviewSubmissionStep onNext={handleNext} onBack={handleBack} />}
        {currentStep === 7 && <PendingReviewStep />}
      </Card>
    </div>
  );
}