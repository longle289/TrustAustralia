'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { australianStates } from '@/lib/schemas/trust';

interface TextFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
}

export function TextField({
  form,
  name,
  label,
  placeholder,
  description,
  type = 'text',
}: TextFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface StateSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label?: string;
}

export function StateSelect({ form, name, label = 'State' }: StateSelectProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {australianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface AddressFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  prefix: string;
}

export function AddressFields({ form, prefix }: AddressFieldsProps) {
  return (
    <div className="space-y-4">
      <TextField
        form={form}
        name={`${prefix}.street`}
        label="Street Address"
        placeholder="123 Main Street"
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          form={form}
          name={`${prefix}.suburb`}
          label="Suburb"
          placeholder="Sydney"
        />
        <StateSelect form={form} name={`${prefix}.state`} />
      </div>
      <TextField
        form={form}
        name={`${prefix}.postcode`}
        label="Postcode"
        placeholder="2000"
      />
    </div>
  );
}

interface PersonFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  prefix: string;
  showAddress?: boolean;
}

export function PersonFields({
  form,
  prefix,
  showAddress = true,
}: PersonFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TextField
          form={form}
          name={`${prefix}.firstName`}
          label="First Name"
          placeholder="John"
        />
        <TextField
          form={form}
          name={`${prefix}.lastName`}
          label="Last Name"
          placeholder="Smith"
        />
      </div>
      {showAddress && <AddressFields form={form} prefix={`${prefix}.address`} />}
    </div>
  );
}

interface CompanyFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  prefix: string;
  showAddress?: boolean;
}

export function CompanyFields({
  form,
  prefix,
  showAddress = true,
}: CompanyFieldsProps) {
  return (
    <div className="space-y-4">
      <TextField
        form={form}
        name={`${prefix}.name`}
        label="Company Name"
        placeholder="ABC Pty Ltd"
      />
      <TextField
        form={form}
        name={`${prefix}.acn`}
        label="ACN"
        placeholder="123456789"
        description="9 digit Australian Company Number"
      />
      {showAddress && <AddressFields form={form} prefix={`${prefix}.address`} />}
    </div>
  );
}

interface CheckboxFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  description?: string;
}

export function CheckboxField({
  form,
  name,
  label,
  description,
}: CheckboxFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="font-normal">{label}</FormLabel>
            {description && (
              <FormDescription>{description}</FormDescription>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}

interface EntityTypeSelectorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
}

export function EntityTypeSelector({ form, name }: EntityTypeSelectorProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Entity Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id={`${name}-individual`} />
                <Label htmlFor={`${name}-individual`} className="font-normal">
                  Individual
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id={`${name}-company`} />
                <Label htmlFor={`${name}-company`} className="font-normal">
                  Company
                </Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface DirectorFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  prefix: string;
}

export function DirectorFields({ form, prefix }: DirectorFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TextField
          form={form}
          name={`${prefix}.firstName`}
          label="First Name"
          placeholder="John"
        />
        <TextField
          form={form}
          name={`${prefix}.lastName`}
          label="Last Name"
          placeholder="Smith"
        />
      </div>
      <TextField
        form={form}
        name={`${prefix}.dateOfBirth`}
        label="Date of Birth"
        type="date"
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          form={form}
          name={`${prefix}.email`}
          label="Email"
          type="email"
          placeholder="john@example.com"
        />
        <TextField
          form={form}
          name={`${prefix}.phone`}
          label="Phone"
          placeholder="0400 000 000"
        />
      </div>
      <AddressFields form={form} prefix={`${prefix}.address`} />
    </div>
  );
}

interface SmsfMemberFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  prefix: string;
}

export function SmsfMemberFields({ form, prefix }: SmsfMemberFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TextField
          form={form}
          name={`${prefix}.firstName`}
          label="First Name"
          placeholder="John"
        />
        <TextField
          form={form}
          name={`${prefix}.lastName`}
          label="Last Name"
          placeholder="Smith"
        />
      </div>
      <TextField
        form={form}
        name={`${prefix}.dateOfBirth`}
        label="Date of Birth"
        type="date"
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          form={form}
          name={`${prefix}.email`}
          label="Email"
          type="email"
          placeholder="john@example.com"
        />
        <TextField
          form={form}
          name={`${prefix}.phone`}
          label="Phone"
          placeholder="0400 000 000"
        />
      </div>
      <TextField
        form={form}
        name={`${prefix}.tfn`}
        label="Tax File Number (Optional)"
        placeholder="123 456 789"
        description="Your TFN will be used for ATO registration"
      />
      <AddressFields form={form} prefix={`${prefix}.address`} />
    </div>
  );
}

interface NumberFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  min?: number;
}

export function NumberField({
  form,
  name,
  label,
  placeholder,
  description,
  min = 1,
}: NumberFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={min}
              placeholder={placeholder}
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
