'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { WizardLayout } from '@/components/wizard/WizardLayout';
import {
  TextField,
  StateSelect,
  DirectorFields,
  SmsfMemberFields,
} from '@/components/wizard/FormFields';
import {
  smsfBundleSchema,
  defaultSmsfBundleForm,
  defaultDirector,
  defaultSmsfMember,
  type SmsfBundleForm,
} from '@/lib/schemas/trust';
import { TRUST_WIZARD_STEPS, PRODUCTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = TRUST_WIZARD_STEPS.smsfBundle;

export default function CreateSmsfBundlePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SmsfBundleForm>({
    resolver: zodResolver(smsfBundleSchema) as Resolver<SmsfBundleForm>,
    defaultValues: defaultSmsfBundleForm,
    mode: 'onChange',
  });

  const handleNext = async () => {
    let isValid = true;

    switch (currentStep) {
      case 0: // SMSF Details
        isValid = await form.trigger('smsfDetails');
        break;
      case 1: // Members
        isValid = await form.trigger('members');
        break;
      case 2: // Trustee Company
        isValid = await form.trigger('trusteeCompany');
        break;
      case 3: // Directors
        isValid = await form.trigger('directors');
        break;
      case 4: // Review
        isValid = true;
        break;
      case 5: // Payment
        setIsSubmitting(true);
        const formData = form.getValues();
        sessionStorage.setItem('smsfForm', JSON.stringify(formData));
        router.push('/checkout?type=smsf-bundle');
        return;
    }

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addMember = () => {
    const current = form.getValues('members');
    if (current.length < 6) {
      form.setValue('members', [...current, defaultSmsfMember]);
    }
  };

  const removeMember = (index: number) => {
    const current = form.getValues('members');
    if (current.length > 1) {
      form.setValue('members', current.filter((_, i) => i !== index));
    }
  };

  const addDirector = () => {
    const current = form.getValues('directors');
    form.setValue('directors', [...current, defaultDirector]);
  };

  const removeDirector = (index: number) => {
    const current = form.getValues('directors');
    if (current.length > 1) {
      form.setValue('directors', current.filter((_, i) => i !== index));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // SMSF Details
        return (
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground mb-4">
              <p>
                A <strong>Self-Managed Super Fund (SMSF)</strong> is a private
                superannuation fund that you manage yourself. SMSFs can have
                up to 6 members.
              </p>
            </div>
            <TextField
              form={form}
              name="smsfDetails.fundName"
              label="Fund Name"
              placeholder="Smith Family Superannuation Fund"
              description="This will be the legal name of your SMSF"
            />
            <TextField
              form={form}
              name="smsfDetails.establishmentDate"
              label="Establishment Date"
              type="date"
            />
            <StateSelect
              form={form}
              name="smsfDetails.state"
              label="State of Establishment"
            />
          </div>
        );

      case 1: // Members
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
              <p>
                <strong>Members</strong> are the individuals whose superannuation
                benefits are held in the fund. An SMSF can have up to 6 members.
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  All SMSF members must be trustees (or directors of the corporate
                  trustee). Make sure to add the same people as directors in the
                  next step.
                </p>
              </div>
            </div>

            {form.watch('members').map((_, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Member {index + 1}</span>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMember(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <SmsfMemberFields form={form} prefix={`members.${index}`} />
                </CardContent>
              </Card>
            ))}

            {form.watch('members').length < 6 && (
              <Button
                type="button"
                variant="outline"
                onClick={addMember}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Member ({form.watch('members').length}/6)
              </Button>
            )}
          </div>
        );

      case 2: // Trustee Company
        return (
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground mb-4">
              <p>
                We will register a new company to act as the <strong>corporate
                trustee</strong> for your SMSF. A corporate trustee provides
                limited liability protection and clearer asset separation.
              </p>
            </div>
            <TextField
              form={form}
              name="trusteeCompany.proposedName"
              label="Proposed Company Name"
              placeholder="Smith SMSF Pty Ltd"
              description="The company name must end with 'Pty Ltd'"
            />
            <StateSelect
              form={form}
              name="trusteeCompany.state"
              label="State of Registration"
            />
          </div>
        );

      case 3: // Directors
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
              <p>
                <strong>Directors</strong> of the corporate trustee are responsible
                for managing the SMSF. All SMSF members should be directors.
              </p>
            </div>

            {form.watch('directors').map((_, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Director {index + 1}</span>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDirector(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <DirectorFields form={form} prefix={`directors.${index}`} />
                </CardContent>
              </Card>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addDirector}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Director
            </Button>
          </div>
        );

      case 4: // Review
        const values = form.getValues();
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
              <p>
                Please review your SMSF details below. You can go back to make changes.
              </p>
            </div>

            <div className="space-y-4">
              <ReviewSection title="SMSF Details">
                <ReviewItem label="Fund Name" value={values.smsfDetails.fundName} />
                <ReviewItem label="Establishment Date" value={values.smsfDetails.establishmentDate} />
                <ReviewItem label="State" value={values.smsfDetails.state} />
              </ReviewSection>

              <ReviewSection title="Members">
                {values.members.map((member, i) => (
                  <ReviewItem
                    key={i}
                    label={`Member ${i + 1}`}
                    value={`${member.firstName} ${member.lastName}`}
                  />
                ))}
              </ReviewSection>

              <ReviewSection title="Trustee Company">
                <ReviewItem label="Company Name" value={values.trusteeCompany.proposedName} />
                <ReviewItem label="State" value={values.trusteeCompany.state} />
              </ReviewSection>

              <ReviewSection title="Directors">
                {values.directors.map((dir, i) => (
                  <ReviewItem
                    key={i}
                    label={`Director ${i + 1}`}
                    value={`${dir.firstName} ${dir.lastName}`}
                  />
                ))}
              </ReviewSection>

              <ReviewSection title="Included Registrations">
                <ReviewItem label="SMSF Trust Deed" value="Included" />
                <ReviewItem label="Corporate Trustee Company" value="Included" />
                <ReviewItem label="ASIC Company Registration" value="Included" />
                <ReviewItem label="ABN for SMSF" value="Included" />
                <ReviewItem label="TFN for SMSF" value="Included" />
                <ReviewItem label="ATO SMSF Registration" value="Included" />
              </ReviewSection>
            </div>
          </div>
        );

      case 5: // Payment
        return (
          <div className="space-y-6 text-center">
            <div className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                SMSF Trustee Bundle
              </h3>
              <p className="text-4xl font-bold text-primary">
                ${PRODUCTS.smsfBundle.price}
                <span className="text-lg font-normal text-muted-foreground ml-1">
                  {PRODUCTS.smsfBundle.priceSuffix}
                </span>
              </p>
            </div>

            <div className="text-left space-y-2">
              {PRODUCTS.smsfBundle.features.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-muted/30 rounded-lg p-4 text-left">
              <p className="text-sm text-muted-foreground">
                <strong>All-inclusive pricing:</strong> This bundle includes all
                ASIC fees, ATO registration fees, and GST. There are no hidden costs.
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              By proceeding, you agree to our Terms of Service and acknowledge
              our Disclaimer. We recommend seeking independent financial advice
              before establishing an SMSF.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <WizardLayout
          steps={steps}
          currentStep={currentStep}
          onNext={handleNext}
          onBack={handleBack}
          isSubmitting={isSubmitting}
          title="Create SMSF Trustee Bundle"
          description="Set up your Self-Managed Super Fund with corporate trustee"
        >
          {renderStepContent()}
        </WizardLayout>
      </form>
    </Form>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg p-4">
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
