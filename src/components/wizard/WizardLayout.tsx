'use client';

import { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WizardProgress } from './WizardProgress';

interface Step {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

interface WizardLayoutProps {
  steps: readonly Step[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
  isValid?: boolean;
  children: ReactNode;
  title: string;
  description?: string;
}

export function WizardLayout({
  steps,
  currentStep,
  onNext,
  onBack,
  isSubmitting = false,
  isValid = true,
  children,
  title,
  description,
}: WizardLayoutProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="py-8 lg:py-12">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>

        {/* Progress */}
        <div className="mx-auto max-w-4xl">
          <WizardProgress steps={steps} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="mx-auto max-w-2xl">
          <Card className="border-2">
            <CardContent className="p-6 sm:p-8">
              {/* Step Header */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  {steps[currentStep].title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {steps[currentStep].description}
                </p>
              </div>

              {/* Step Form Content */}
              <div className="space-y-6">{children}</div>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  disabled={isFirstStep || isSubmitting}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                <Button
                  type="button"
                  onClick={onNext}
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : isLastStep ? (
                    'Review & Pay'
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Text */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Your information is secure and encrypted. We do not share your data.
          </p>
        </div>
      </div>
    </div>
  );
}
