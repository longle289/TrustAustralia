import { z } from 'zod';

// Australian state/territory options
export const australianStates = [
  'NSW',
  'VIC',
  'QLD',
  'SA',
  'WA',
  'TAS',
  'NT',
  'ACT',
] as const;

// Common address schema
export const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  suburb: z.string().min(1, 'Suburb is required'),
  state: z.enum(australianStates, { message: 'State is required' }),
  postcode: z
    .string()
    .regex(/^\d{4}$/, 'Postcode must be 4 digits'),
});

// Individual person schema
export const personSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: addressSchema,
});

// Company schema
export const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  acn: z
    .string()
    .min(1, 'ACN is required')
    .regex(/^\d{9}$/, 'ACN must be 9 digits'),
  address: addressSchema,
});

// Trustee can be individual or company
export const trusteeSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('individual'),
    individual: personSchema,
  }),
  z.object({
    type: z.literal('company'),
    company: companySchema,
  }),
]);

// Base trust details schema
export const trustDetailsSchema = z.object({
  trustName: z
    .string()
    .min(1, 'Trust name is required')
    .max(100, 'Trust name must be 100 characters or less'),
  establishmentDate: z.string().min(1, 'Establishment date is required'),
  state: z.enum(australianStates, {
    message: 'State of establishment is required',
  }),
});

// Settlor schema
export const settlorSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: addressSchema,
  settlementSum: z.string().min(1, 'Settlement sum is required'),
});

// Appointer schema
export const appointerSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('individual'),
    individual: personSchema,
  }),
  z.object({
    type: z.literal('company'),
    company: companySchema,
  }),
]);

// Discretionary Trust beneficiary classes
export const beneficiaryClassesSchema = z.object({
  primaryBeneficiaries: z
    .array(personSchema)
    .min(1, 'At least one primary beneficiary is required'),
  includeSpouses: z.boolean().default(true),
  includeChildren: z.boolean().default(true),
  includeGrandchildren: z.boolean().default(true),
  includeRelatedCompanies: z.boolean().default(true),
  includeRelatedTrusts: z.boolean().default(true),
});

// Unit Trust unit holder schema
export const unitHolderSchema = z.object({
  holder: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('individual'),
      individual: personSchema,
    }),
    z.object({
      type: z.literal('company'),
      company: companySchema,
    }),
  ]),
  units: z.number().min(1, 'Must hold at least 1 unit'),
});

export const unitHoldersSchema = z.object({
  totalUnits: z.number().min(1, 'Total units must be at least 1').default(100),
  holders: z.array(unitHolderSchema).min(1, 'At least one unit holder is required'),
});

// Complete Discretionary Trust form schema
export const discretionaryTrustSchema = z.object({
  trustDetails: trustDetailsSchema,
  settlor: settlorSchema,
  trustee: trusteeSchema,
  beneficiaries: beneficiaryClassesSchema,
  appointer: appointerSchema,
});

// Complete Unit Trust form schema
export const unitTrustSchema = z.object({
  trustDetails: trustDetailsSchema,
  settlor: settlorSchema,
  trustee: trusteeSchema,
  unitHolders: unitHoldersSchema,
  appointer: appointerSchema,
});

// Director schema for company registration
export const directorSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: addressSchema,
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

// Shareholder schema
export const shareholderSchema = z.object({
  holder: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('individual'),
      individual: personSchema,
    }),
    z.object({
      type: z.literal('company'),
      company: companySchema,
    }),
  ]),
  shares: z.number().min(1, 'Must hold at least 1 share'),
});

// Company registration schema
export const companyRegistrationSchema = z.object({
  companyDetails: z.object({
    proposedName: z.string().min(1, 'Company name is required'),
    companyType: z.enum(['pty-ltd', 'pty-ltd-smsf'], {
      message: 'Company type is required'
    }),
    state: z.enum(australianStates, { message: 'State is required' }),
  }),
  registeredOffice: addressSchema,
  directors: z.array(directorSchema).min(1, 'At least one director is required'),
  shareholders: z.object({
    totalShares: z.number().min(1, 'Total shares must be at least 1').default(100),
    holders: z.array(shareholderSchema).min(1, 'At least one shareholder is required'),
  }),
  abnApplication: z.boolean().default(true),
});

// Discretionary Trust Bundle schema (trust + corporate trustee)
export const discretionaryBundleSchema = z.object({
  trustDetails: trustDetailsSchema,
  settlor: settlorSchema,
  trusteeCompany: z.object({
    proposedName: z.string().min(1, 'Trustee company name is required'),
    state: z.enum(australianStates, { message: 'State is required' }),
  }),
  directors: z.array(directorSchema).min(1, 'At least one director is required'),
  beneficiaries: beneficiaryClassesSchema,
  appointer: appointerSchema,
  registrations: z.object({
    abn: z.boolean().default(true),
    tfn: z.boolean().default(true),
    gst: z.boolean().default(false),
  }),
});

// SMSF Member schema
export const smsfMemberSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: addressSchema,
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  tfn: z.string().optional().or(z.literal('')),
});

// SMSF Bundle schema
export const smsfBundleSchema = z.object({
  smsfDetails: z.object({
    fundName: z.string().min(1, 'Fund name is required'),
    establishmentDate: z.string().min(1, 'Establishment date is required'),
    state: z.enum(australianStates, { message: 'State is required' }),
  }),
  members: z.array(smsfMemberSchema).min(1, 'At least one member is required').max(6, 'Maximum 6 members allowed'),
  trusteeCompany: z.object({
    proposedName: z.string().min(1, 'Trustee company name is required'),
    state: z.enum(australianStates, { message: 'State is required' }),
  }),
  directors: z.array(directorSchema).min(1, 'At least one director is required'),
});

// Type exports
export type AustralianState = (typeof australianStates)[number];
export type Address = z.infer<typeof addressSchema>;
export type Person = z.infer<typeof personSchema>;
export type Company = z.infer<typeof companySchema>;
export type Trustee = z.infer<typeof trusteeSchema>;
export type TrustDetails = z.infer<typeof trustDetailsSchema>;
export type Settlor = z.infer<typeof settlorSchema>;
export type Appointer = z.infer<typeof appointerSchema>;
export type BeneficiaryClasses = z.infer<typeof beneficiaryClassesSchema>;
export type UnitHolder = z.infer<typeof unitHolderSchema>;
export type UnitHolders = z.infer<typeof unitHoldersSchema>;
export type DiscretionaryTrustForm = z.infer<typeof discretionaryTrustSchema>;
export type UnitTrustForm = z.infer<typeof unitTrustSchema>;
export type Director = z.infer<typeof directorSchema>;
export type Shareholder = z.infer<typeof shareholderSchema>;
export type CompanyRegistrationForm = z.infer<typeof companyRegistrationSchema>;
export type DiscretionaryBundleForm = z.infer<typeof discretionaryBundleSchema>;
export type SmsfMember = z.infer<typeof smsfMemberSchema>;
export type SmsfBundleForm = z.infer<typeof smsfBundleSchema>;

// Default values for forms
export const defaultAddress: Address = {
  street: '',
  suburb: '',
  state: 'NSW',
  postcode: '',
};

export const defaultPerson: Person = {
  firstName: '',
  lastName: '',
  address: defaultAddress,
};

export const defaultSettlor: Settlor = {
  firstName: '',
  lastName: '',
  address: defaultAddress,
  settlementSum: '10',
};

export const defaultTrustee: Trustee = {
  type: 'individual',
  individual: defaultPerson,
};

export const defaultAppointer: Appointer = {
  type: 'individual',
  individual: defaultPerson,
};

export const defaultTrustDetails: TrustDetails = {
  trustName: '',
  establishmentDate: new Date().toISOString().split('T')[0],
  state: 'NSW',
};

export const defaultBeneficiaries: BeneficiaryClasses = {
  primaryBeneficiaries: [defaultPerson],
  includeSpouses: true,
  includeChildren: true,
  includeGrandchildren: true,
  includeRelatedCompanies: true,
  includeRelatedTrusts: true,
};

export const defaultUnitHolders: UnitHolders = {
  totalUnits: 100,
  holders: [
    {
      holder: { type: 'individual', individual: defaultPerson },
      units: 100,
    },
  ],
};

export const defaultDiscretionaryTrustForm: DiscretionaryTrustForm = {
  trustDetails: defaultTrustDetails,
  settlor: defaultSettlor,
  trustee: defaultTrustee,
  beneficiaries: defaultBeneficiaries,
  appointer: defaultAppointer,
};

export const defaultUnitTrustForm: UnitTrustForm = {
  trustDetails: defaultTrustDetails,
  settlor: defaultSettlor,
  trustee: defaultTrustee,
  unitHolders: defaultUnitHolders,
  appointer: defaultAppointer,
};

// Default director
export const defaultDirector: Director = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  address: defaultAddress,
  email: '',
  phone: '',
};

// Default shareholder
export const defaultShareholder: Shareholder = {
  holder: { type: 'individual', individual: defaultPerson },
  shares: 100,
};

// Default company registration form
export const defaultCompanyRegistrationForm: CompanyRegistrationForm = {
  companyDetails: {
    proposedName: '',
    companyType: 'pty-ltd',
    state: 'NSW',
  },
  registeredOffice: defaultAddress,
  directors: [defaultDirector],
  shareholders: {
    totalShares: 100,
    holders: [defaultShareholder],
  },
  abnApplication: true,
};

// Default discretionary bundle form
export const defaultDiscretionaryBundleForm: DiscretionaryBundleForm = {
  trustDetails: defaultTrustDetails,
  settlor: defaultSettlor,
  trusteeCompany: {
    proposedName: '',
    state: 'NSW',
  },
  directors: [defaultDirector],
  beneficiaries: defaultBeneficiaries,
  appointer: defaultAppointer,
  registrations: {
    abn: true,
    tfn: true,
    gst: false,
  },
};

// Default SMSF member
export const defaultSmsfMember: SmsfMember = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  address: defaultAddress,
  email: '',
  phone: '',
  tfn: '',
};

// Default SMSF bundle form
export const defaultSmsfBundleForm: SmsfBundleForm = {
  smsfDetails: {
    fundName: '',
    establishmentDate: new Date().toISOString().split('T')[0],
    state: 'NSW',
  },
  members: [defaultSmsfMember],
  trusteeCompany: {
    proposedName: '',
    state: 'NSW',
  },
  directors: [defaultDirector],
};
