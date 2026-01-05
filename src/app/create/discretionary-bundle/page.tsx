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
  CheckboxField,
  AddressFields,
  DirectorFields,
  EntityTypeSelector,
  CompanyFields,
} from '@/components/wizard/FormFields';
import {
  discretionaryBundleSchema,
  defaultDiscretionaryBundleForm,
  defaultDirector,
  defaultPerson,
  defaultAddress,
  type DiscretionaryBundleForm,
} from '@/lib/schemas/trust';
import { TRUST_WIZARD_STEPS, PRODUCTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const steps = TRUST_WIZARD_STEPS.discretionaryBundle;

export default function CreateDiscretionaryBundlePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DiscretionaryBundleForm>({
    resolver: zodResolver(discretionaryBundleSchema) as Resolver<DiscretionaryBundleForm>,
    defaultValues: defaultDiscretionaryBundleForm,
    mode: 'onChange',
  });

  const watchAppointerType = form.watch('appointer.type');

  const handleNext = async () => {
    let isValid = true;

    switch (currentStep) {
      case 0: // Trust Details
        isValid = await form.trigger('trustDetails');
        break;
      case 1: // Settlor
        isValid = await form.trigger('settlor');
        break;
      case 2: // Trustee Company
        isValid = await form.trigger('trusteeCompany');
        break;
      case 3: // Directors
        isValid = await form.trigger('directors');
        break;
      case 4: // Beneficiaries
        isValid = await form.trigger('beneficiaries');
        break;
      case 5: // Appointer
        isValid = await form.trigger('appointer');
        break;
      case 6: // Registrations
        isValid = await form.trigger('registrations');
        break;
      case 7: // Review
        isValid = true;
        break;
      case 8: // Payment
        setIsSubmitting(true);
        const formData = form.getValues();
        sessionStorage.setItem('trustForm_discretionary-bundle', JSON.stringify(formData));
        router.push('/checkout?type=discretionary-bundle');
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

  const addBeneficiary = () => {
    const current = form.getValues('beneficiaries.primaryBeneficiaries');
    form.setValue('beneficiaries.primaryBeneficiaries', [
      ...current,
      { firstName: '', lastName: '', address: defaultAddress },
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
                settlor should be someone other than a trustee or beneficiary.
              </p>
            </div>
            <PersonFields form={form} prefix="settlor" />
          </div>
        );

      case 2: // Trustee Company
        return (
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground mb-4">
              <p>
                We will register a new company to act as the <strong>corporate trustee</strong> for
                your trust. This provides limited liability protection and makes trust
                management easier.
              </p>
            </div>
            <TextField
              form={form}
              name="trusteeCompany.proposedName"
              label="Proposed Company Name"
              placeholder="Smith Family Trustee Pty Ltd"
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
                <strong>Directors</strong> are responsible for managing the trustee
                company. At least one director is required.
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

      case 4: // Beneficiaries
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
              <p>
                <strong>Primary beneficiaries</strong> are the main people who
                can receive distributions from the trust.
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

      case 5: // Appointer
        return (
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground mb-4">
              <p>
                The <strong>appointer</strong> has the power to remove and appoint
                trustees. This provides ultimate control over the trust.
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

      case 6: // Registrations
        return (
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground mb-4">
              <p>
                Select the registrations you need for your trust. ABN and TFN are
                recommended for all trusts.
              </p>
            </div>
            <div className="space-y-4">
              <CheckboxField
                form={form}
                name="registrations.abn"
                label="ABN Registration"
                description="Australian Business Number - required for business activities"
              />
              <CheckboxField
                form={form}
                name="registrations.tfn"
                label="TFN Registration"
                description="Tax File Number - required to avoid withholding tax"
              />
              <CheckboxField
                form={form}
                name="registrations.gst"
                label="GST Registration"
                description="Required if annual turnover exceeds $75,000"
              />
            </div>
          </div>
        );

      case 7: // Review
        const values = form.getValues();
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
              <p>
                Please review your details below. You can go back to make changes.
              </p>
            </div>

            <div className="space-y-4">
              <ReviewSection title="Trust Details">
                <ReviewItem label="Trust Name" value={values.trustDetails.trustName} />
                <ReviewItem label="State" value={values.trustDetails.state} />
              </ReviewSection>

              <ReviewSection title="Settlor">
                <ReviewItem
                  label="Name"
                  value={`${values.settlor.firstName} ${values.settlor.lastName}`}
                />
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

              <ReviewSection title="Primary Beneficiaries">
                {values.beneficiaries.primaryBeneficiaries.map((ben, i) => (
                  <ReviewItem
                    key={i}
                    label={`Beneficiary ${i + 1}`}
                    value={`${ben.firstName} ${ben.lastName}`}
                  />
                ))}
              </ReviewSection>

              <ReviewSection title="Registrations">
                <ReviewItem label="ABN" value={values.registrations.abn ? 'Yes' : 'No'} />
                <ReviewItem label="TFN" value={values.registrations.tfn ? 'Yes' : 'No'} />
                <ReviewItem label="GST" value={values.registrations.gst ? 'Yes' : 'No'} />
              </ReviewSection>
            </div>
          </div>
        );

      case 8: // Payment
        return (
          <div className="space-y-6 text-center">
            <div className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Discretionary Trust Bundle
              </h3>
              <p className="text-4xl font-bold text-primary">
                ${PRODUCTS.discretionaryBundle.price}
                <span className="text-lg font-normal text-muted-foreground ml-1">
                  {PRODUCTS.discretionaryBundle.priceSuffix}
                </span>
              </p>
            </div>

            <div className="text-left space-y-2">
              {PRODUCTS.discretionaryBundle.features.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              By proceeding, you agree to our Terms of Service and acknowledge
              our Disclaimer. ASIC fees are additional and paid directly to ASIC.
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
          title="Create Discretionary Trust Bundle"
          description="Complete trust setup with corporate trustee and registrations"
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
