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
  PersonFields,
  CompanyFields,
  CheckboxField,
  EntityTypeSelector,
  AddressFields,
} from '@/components/wizard/FormFields';
import {
  discretionaryTrustSchema,
  defaultDiscretionaryTrustForm,
  type DiscretionaryTrustForm,
} from '@/lib/schemas/trust';
import { TRUST_WIZARD_STEPS, PRODUCTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const steps = TRUST_WIZARD_STEPS.discretionary;

export default function CreateDiscretionaryTrustPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DiscretionaryTrustForm>({
    resolver: zodResolver(discretionaryTrustSchema) as Resolver<DiscretionaryTrustForm>,
    defaultValues: defaultDiscretionaryTrustForm,
    mode: 'onChange',
  });

  const watchTrusteeType = form.watch('trustee.type');
  const watchAppointerType = form.watch('appointer.type');

  const handleNext = async () => {
    // Validate current step fields before proceeding
    let isValid = true;

    switch (currentStep) {
      case 0: // Trust Details
        isValid = await form.trigger('trustDetails');
        break;
      case 1: // Settlor
        isValid = await form.trigger('settlor');
        break;
      case 2: // Trustee
        isValid = await form.trigger('trustee');
        break;
      case 3: // Beneficiaries
        isValid = await form.trigger('beneficiaries');
        break;
      case 4: // Appointer
        isValid = await form.trigger('appointer');
        break;
      case 5: // Review
        isValid = true;
        break;
      case 6: // Payment
        // Save form data to session storage before checkout
        setIsSubmitting(true);
        const formData = form.getValues();
        sessionStorage.setItem('trustForm_discretionary', JSON.stringify(formData));
        // Redirect to checkout
        router.push('/checkout?type=discretionary');
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

  const addBeneficiary = () => {
    const current = form.getValues('beneficiaries.primaryBeneficiaries');
    form.setValue('beneficiaries.primaryBeneficiaries', [
      ...current,
      { firstName: '', lastName: '', address: { street: '', suburb: '', state: 'NSW', postcode: '' } },
    ]);
  };

  const removeBeneficiary = (index: number) => {
    const current = form.getValues('beneficiaries.primaryBeneficiaries');
    if (current.length > 1) {
      form.setValue(
        'beneficiaries.primaryBeneficiaries',
        current.filter((_, i) => i !== index)
      );
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Trust Details
        return (
          <div className="space-y-4">
            <TextField
              form={form}
              name="trustDetails.trustName"
              label="Trust Name"
              placeholder="The Smith Family Trust"
              description="This will be the legal name of your trust"
            />
            <TextField
              form={form}
              name="trustDetails.establishmentDate"
              label="Establishment Date"
              type="date"
            />
            <StateSelect
              form={form}
              name="trustDetails.state"
              label="State of Establishment"
            />
          </div>
        );

      case 1: // Settlor
        return (
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground mb-4">
              <p>
                The <strong>settlor</strong> is the person who establishes the
                trust by providing the initial settlement sum (usually $10). The
                settlor should be someone other than a trustee or beneficiary,
                typically a friend or relative.
              </p>
            </div>
            <PersonFields form={form} prefix="settlor" />
          </div>
        );

      case 2: // Trustee
        return (
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground mb-4">
              <p>
                The <strong>trustee</strong> manages the trust and makes
                decisions about distributions. This can be an individual or a
                company (corporate trustee).
              </p>
              <p className="mt-2">
                If you already have a company, enter the details below. If you need a new
                corporate trustee company set up, consider our{' '}
                <a href="/create/discretionary-bundle" className="text-primary hover:underline font-medium">
                  Discretionary Trust Bundle
                </a>{' '}
                which includes company registration.
              </p>
            </div>
            <EntityTypeSelector form={form} name="trustee.type" />
            <Separator />
            {watchTrusteeType === 'individual' ? (
              <PersonFields form={form} prefix="trustee.individual" />
            ) : (
              <CompanyFields form={form} prefix="trustee.company" />
            )}
          </div>
        );

      case 3: // Beneficiaries
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
              <p>
                <strong>Primary beneficiaries</strong> are the main people who
                can receive distributions from the trust. Their family members
                (spouses, children, etc.) are automatically included as
                potential beneficiaries.
              </p>
            </div>

            {form.watch('beneficiaries.primaryBeneficiaries').map((_, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">
                      Primary Beneficiary {index + 1}
                    </span>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBeneficiary(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <PersonFields
                    form={form}
                    prefix={`beneficiaries.primaryBeneficiaries.${index}`}
                  />
                </CardContent>
              </Card>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addBeneficiary}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Beneficiary
            </Button>

            <Separator />

            <div className="space-y-3">
              <p className="text-sm font-medium">
                Include these related parties as potential beneficiaries:
              </p>
              <CheckboxField
                form={form}
                name="beneficiaries.includeSpouses"
                label="Spouses and de facto partners"
              />
              <CheckboxField
                form={form}
                name="beneficiaries.includeChildren"
                label="Children (including stepchildren)"
              />
              <CheckboxField
                form={form}
                name="beneficiaries.includeGrandchildren"
                label="Grandchildren and remote issue"
              />
              <CheckboxField
                form={form}
                name="beneficiaries.includeRelatedCompanies"
                label="Related companies"
              />
              <CheckboxField
                form={form}
                name="beneficiaries.includeRelatedTrusts"
                label="Related trusts"
              />
            </div>
          </div>
        );

      case 4: // Appointer
        return (
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground mb-4">
              <p>
                The <strong>appointer</strong> (or principal/guardian) has the
                power to remove and appoint trustees. This provides ultimate
                control over the trust.
              </p>
            </div>
            <EntityTypeSelector form={form} name="appointer.type" />
            <Separator />
            {watchAppointerType === 'individual' ? (
              <PersonFields form={form} prefix="appointer.individual" />
            ) : (
              <CompanyFields form={form} prefix="appointer.company" />
            )}
          </div>
        );

      case 5: // Review
        const values = form.getValues();
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
              <p>
                Please review your trust deed details below. You can go back to
                make changes if needed.
              </p>
            </div>

            <div className="space-y-4">
              <ReviewSection title="Trust Details">
                <ReviewItem label="Trust Name" value={values.trustDetails.trustName} />
                <ReviewItem
                  label="Establishment Date"
                  value={values.trustDetails.establishmentDate}
                />
                <ReviewItem label="State" value={values.trustDetails.state} />
              </ReviewSection>

              <ReviewSection title="Settlor">
                <ReviewItem
                  label="Name"
                  value={`${values.settlor.firstName} ${values.settlor.lastName}`}
                />
                <ReviewItem
                  label="Address"
                  value={`${values.settlor.address.street}, ${values.settlor.address.suburb} ${values.settlor.address.state} ${values.settlor.address.postcode}`}
                />
              </ReviewSection>

              <ReviewSection title="Trustee">
                {values.trustee.type === 'individual' ? (
                  <>
                    <ReviewItem label="Type" value="Individual" />
                    <ReviewItem
                      label="Name"
                      value={`${values.trustee.individual.firstName} ${values.trustee.individual.lastName}`}
                    />
                  </>
                ) : (
                  <>
                    <ReviewItem label="Type" value="Company" />
                    <ReviewItem
                      label="Company Name"
                      value={values.trustee.company.name}
                    />
                  </>
                )}
              </ReviewSection>

              <ReviewSection title="Primary Beneficiaries">
                {values.beneficiaries.primaryBeneficiaries.map((ben, i) => (
                  <ReviewItem
                    key={i}
                    label={`Beneficiary ${i + 1}`}
                    value={`${ben.firstName} ${ben.lastName}`}
                  />
                ))}
              </ReviewSection>

              <ReviewSection title="Appointer">
                {values.appointer.type === 'individual' ? (
                  <ReviewItem
                    label="Name"
                    value={`${values.appointer.individual.firstName} ${values.appointer.individual.lastName}`}
                  />
                ) : (
                  <ReviewItem
                    label="Company"
                    value={values.appointer.company.name}
                  />
                )}
              </ReviewSection>
            </div>
          </div>
        );

      case 6: // Payment
        return (
          <div className="space-y-6 text-center">
            <div className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Discretionary Trust Deed
              </h3>
              <p className="text-4xl font-bold text-primary">
                ${PRODUCTS.discretionary.price}
                <span className="text-lg font-normal text-muted-foreground ml-1">
                  AUD
                </span>
              </p>
            </div>

            <div className="text-left space-y-2">
              {[
                'Complete Discretionary Trust Deed (PDF)',
                'Instant download after payment',
                'Secure payment via Stripe',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
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
          title="Create Discretionary Trust"
          description="Complete the steps below to generate your trust deed"
        >
          {renderStepContent()}
        </WizardLayout>
      </form>
    </Form>
  );
}

// Helper components for review step
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
