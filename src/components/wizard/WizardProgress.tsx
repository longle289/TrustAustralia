'use client';

import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

interface WizardProgressProps {
  steps: readonly Step[];
  currentStep: number;
}

export function WizardProgress({ steps, currentStep }: WizardProgressProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      {/* Mobile Progress */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {steps[currentStep]?.title}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Progress */}
      <ol className="hidden lg:flex items-start">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={cn(
              'flex-1 relative',
              index !== steps.length - 1 && 'pr-8'
            )}
          >
            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  'absolute top-4 left-[calc(50%+1rem)] w-[calc(100%-2rem)] h-0.5',
                  index < currentStep ? 'bg-primary' : 'bg-muted'
                )}
                aria-hidden="true"
              />
            )}

            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={cn(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
                  index < currentStep
                    ? 'bg-primary border-primary text-primary-foreground'
                    : index === currentStep
                    ? 'border-primary bg-background text-primary'
                    : 'border-muted bg-background text-muted-foreground'
                )}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {/* Step Info */}
              <div className="mt-2 text-center">
                <span
                  className={cn(
                    'text-sm font-medium block',
                    index <= currentStep
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </span>
                <span className="text-xs text-muted-foreground hidden xl:block">
                  {step.description}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
