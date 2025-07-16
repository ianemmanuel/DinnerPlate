import { cn } from '@restaurant-webapp/lib/utils'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
}

export function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  return (
    <div className="w-full mb-8">
      <div className="relative">
        {/* Bar */}
        <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
          <div
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500 ease-in-out"
          ></div>
        </div>
        
        {/* Steps */}
        <div className="flex justify-between">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isActive = index + 1 <= currentStep;
            const isCurrentStep = index + 1 === currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={cn(
                    "rounded-full transition-all duration-500 flex items-center justify-center w-8 h-8 mb-1",
                    isCurrentStep
                      ? "bg-primary text-white border-2 border-primary shadow-md scale-110"
                      : isActive
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  )}
                >
                  {isActive ? (
                    <span className="text-xs font-medium">{index + 1}</span>
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                
                {labels && (
                  <span 
                    className={cn(
                      "text-xs mt-1 hidden md:block",
                      isCurrentStep 
                        ? "text-primary font-medium" 
                        : isActive 
                        ? "text-gray-700 dark:text-gray-300" 
                        : "text-gray-500 dark:text-gray-500"
                    )}
                  >
                    {labels[index]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}