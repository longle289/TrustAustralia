'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { WizardLayout } from '@/components/wizard/WizardLayout';
import {
  TextField,
  StateSelect,
  PersonFields,
  CompanyFields,
  CheckboxField,
  AddressFields,
  DirectorFields,
  EntityTypeSelector,
  NumberField,
} from '@/components/wizard/FormFields';
import {
  companyRegistrationSchema,
  defaultCompanyRegistrationForm,
  defaultDirector,
  defaultShareholder,
  defaultPerson,
  defaultAddress,
  type CompanyRegistrationForm,
} from '@/lib/schemas/trust';
import { TRUST_WIZARD_STEPS, PRODUCTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const steps = TRUST_WIZARD_STEPS.companyRegistration;

export default function CompanyRegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CompanyRegistrationForm>({
    resolver: zodResolver(companyRegistrationSchema) as Resolver<CompanyRegistrationForm>,
    defaultValues: defaultCompanyRegistrationForm,
    mode: 'onChange',
  });

  const handleNext = async () => {
    let isValid = true;

    switch (currentStep) {
      case 0: // Company Details
        isValid = await form.trigger('companyDetails');
        break;
      case 1: // Registered Office
        isValid = await form.trigger('registeredOffice');
        break;
      case 2: // Directors
        isValid = await form.trigger('directors');
        break;
      case 3: // Shareholders
        isValid = await form.trigger('shareholders');
        break;
      case 4: // Review
        isValid = true;
        break;
      case 5: // Payment
        setIsSubmitting(true);
        const formData = form.getValues();
        sessionStorage.setItem('companyForm', JSON.stringify(formData));
        router.push('/checkout?type=company-registration');
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

  const addShareholder = () => {
    const current = form.getValues('shareholders.holders');
    form.setValue('shareholders.holders', [
      ...current,
      { holder: { type: 'individual', individual: { firstName: '', lastName: '', address: defaultAddress } }, shares: 0 },
    ]);
  };

  const removeShareholder = (index: number) => {
    const current = form.getValues('shareholders.holders');
    if (current.length > 1) {
      form.setValue('shareholders.holders', current.filter((_, i) => i !== index));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Company Details
        return (
          <div className="space-y-4">
            <TextField
              form={form}
              name="companyDetails.proposedName"
              label="Proposed Company Name"
              placeholder="ABC Pty Ltd"
              description="The company name must end with 'Pty Ltd'"
            />
            <FormField
              control={form.control}
              name="companyDetails.companyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pty-ltd">Proprietary Limited (Pty Ltd)</SelectItem>
                      <SelectItem value="pty-ltd-smsf">Proprietary Limited (SMSF Trustee)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <StateSelect
              form={form}
              name="companyDetails.state"
              label="State of Registration"
            />
          </div>
        );

      case 1: // Registered Office
        return (
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground mb-4">
              <p>
                The <strong>registered office</strong> is the official address for
                your company. All ASIC correspondence will be sent here.
              </p>
            </div>
            <AddressFields form={form} prefix="registeredOffice" />
          </div>
        );

      case 2: // Directors
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
              <p>
                <strong>Directors</strong> are responsible for managing the company.
                At least one director is required for a Pty Ltd company.
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

      case 3: // Shareholders
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
              <p>
                <strong>Shareholders</strong> own the company. Allocate shares
                among the shareholders below.
              </p>
            </div>

            <NumberField
              form={form}
              name="shareholders.totalShares"
              label="Total Shares to Issue"
              placeholder="100"
              description="The total number of shares the company will issue"
              min={1}
            />

            <Separator />

            {form.watch('shareholders.holders').map((holder, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Shareholder {index + 1}</span>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeShareholder(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <EntityTypeSelector
                      form={form}
                      name={`shareholders.holders.${index}.holder.type`}
                    />
                    <Separator />
                    {holder.holder.type === 'individual' ? (
                      <PersonFields
                        form={form}
                        prefix={`shareholders.holders.${index}.holder.individual`}
                      />
                    ) : (
                      <CompanyFields
                        form={form}
                        prefix={`shareholders.holders.${index}.holder.company`}
                      />
                    )}
                    <NumberField
                      form={form}
                      name={`shareholders.holders.${index}.shares`}
                      label="Number of Shares"
                      placeholder="100"
                      min={1}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addShareholder}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Shareholder
            </Button>
          </div>
        );

      case 4: // Review
        const values = form.getValues();
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
              <p>
                Please review your company details below. You can go back to make changes.
              </p>
            </div>

            <div className="space-y-4">
              <ReviewSection title="Company Details">
                <ReviewItem label="Company Name" value={values.companyDetails.proposedName} />
                <ReviewItem
                  label="Type"
                  value={values.companyDetails.companyType === 'pty-ltd' ? 'Pty Ltd' : 'Pty Ltd (SMSF)'}
                />
                <ReviewItem label="State" value={values.companyDetails.state} />
              </ReviewSection>

              <ReviewSection title="Registered Office">
                <ReviewItem
                  label="Address"
                  value={`${values.registeredOffice.street}, ${values.registeredOffice.suburb} ${values.registeredOffice.state} ${values.registeredOffice.postcode}`}
                />
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

              <ReviewSection title="Shareholders">
                <ReviewItem label="Total Shares" value={values.shareholders.totalShares.toString()} />
                {values.shareholders.holders.map((sh, i) => (
                  <ReviewItem
                    key={i}
                    label={`Shareholder ${i + 1}`}
                    value={`${sh.holder.type === 'individual' ? `${sh.holder.individual.firstName} ${sh.holder.individual.lastName}` : sh.holder.company.name} (${sh.shares} shares)`}
                  />
                ))}
              </ReviewSection>

              <ReviewSection title="Additional Services">
                <ReviewItem label="ABN Application" value={values.abnApplication ? 'Yes' : 'No'} />
              </ReviewSection>
            </div>
          </div>
        );

      case 5: // Payment
        return (
          <div className="space-y-6 text-center">
            <div className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Company Registration
              </h3>
              <p className="text-4xl font-bold text-primary">
                ${PRODUCTS.companyRegistration.price}
                <span className="text-lg font-normal text-muted-foreground ml-1">
                  {PRODUCTS.companyRegistration.priceSuffix}
                </span>
              </p>
            </div>

            <div className="text-left space-y-2">
              {PRODUCTS.companyRegistration.features.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-left">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Note:</strong> ASIC registration fee of $576 is payable separately
                and will be lodged directly with ASIC.
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              By proceeding, you agree to our Terms of Service and acknowledge
              our Disclaimer.
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
          title="Register a Company"
          description="Set up your Australian Pty Ltd company"
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
