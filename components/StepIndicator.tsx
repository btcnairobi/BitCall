import React from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <React.Fragment key={stepNum}>
            <div
              className={twMerge(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 font-black",
                isActive 
                  ? "bg-white border-black text-bitcoin scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                  : "bg-white/30 border-black/30 text-black/50",
                isCompleted 
                  ? "bg-black border-black text-white scale-100" 
                  : ""
              )}
            >
              {isCompleted ? <Check size={20} strokeWidth={3} /> : <span className="text-base">{stepNum}</span>}
            </div>
            {stepNum < totalSteps && (
              <div className={twMerge(
                "h-1 w-8 transition-colors duration-300 rounded-full",
                isCompleted ? "bg-black" : "bg-black/20"
              )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};