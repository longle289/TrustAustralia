export const SITE_CONFIG = {
  name: 'Trust Australia',
  domain: 'trustaustralia.com.au',
  tagline: 'Create Your Australian Trust Deed Online',
  description:
    'Generate professional Australian trust deeds online. Simple, affordable, and legally compliant. Create your Discretionary or Unit Trust in minutes.',
  email: 'support@trustaustralia.com.au',
  phone: '1300 TRUST AU',
} as const;

export const NAVIGATION = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Trust Types', href: '/trusts' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
    { name: 'About', href: '/about' },
  ],
  footer: {
    trusts: [
      { name: 'Discretionary Trust', href: '/trusts/discretionary' },
      { name: 'Unit Trust', href: '/trusts/unit' },
      { name: 'Compare Trusts', href: '/trusts' },
    ],
    resources: [
      { name: 'FAQ', href: '/faq' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Disclaimer', href: '/disclaimer' },
    ],
  },
} as const;

export const PRODUCTS = {
  discretionary: {
    id: 'discretionary-trust',
    name: 'Discretionary Trust Deed',
    shortName: 'Discretionary Trust',
    price: 165,
    currency: 'AUD',
    description:
      'Also known as a Family Trust. Ideal for asset protection, tax planning, and distributing income to beneficiaries at the trustee\'s discretion.',
    features: [
      'Flexible income distribution',
      'Asset protection benefits',
      'Tax planning advantages',
      'Ideal for family wealth',
      'Professional PDF document',
      'Instant download',
    ],
    popular: false,
  },
  discretionaryBundle: {
    id: 'discretionary-bundle',
    name: 'Discretionary Trust Bundle',
    shortName: 'Trust Bundle',
    price: 776,
    priceSuffix: '+ ASIC FEE',
    currency: 'AUD',
    description:
      'Complete trust setup solution with corporate trustee. Includes company registration, trust deed, and all ATO registrations to get your trust operational.',
    features: [
      'Discretionary Trust Deed',
      'Corporate trustee company setup',
      'ASIC company registration',
      'ABN registration for the trust',
      'TFN registration for the trust',
      'GST registration for the trust',
      'Trust distribution minute template',
    ],
    popular: true,
  },
  companyRegistration: {
    id: 'company-registration',
    name: 'Company Registration',
    shortName: 'Company Registration',
    price: 124,
    priceSuffix: '+ ASIC FEE',
    currency: 'AUD',
    description:
      'Register your Australian proprietary limited company (Pty Ltd). Perfect for starting a business with limited liability protection.',
    features: [
      'Pty Ltd company registration',
      'ASIC lodgement included',
      'ABN application assistance',
      'Company constitution included',
      'Director & shareholder setup',
      'Same-day processing',
    ],
    popular: false,
  },
  smsfBundle: {
    id: 'smsf-bundle',
    name: 'SMSF Trustee Bundle',
    shortName: 'SMSF Bundle',
    price: 985,
    priceSuffix: 'incl GST & ASIC',
    currency: 'AUD',
    description:
      'Save time with simultaneous SMSF setup and Corporate Trustee registration. Everything you need to get your self-managed super fund operational.',
    features: [
      'SMSF Trust Deed',
      'Corporate trustee company setup',
      'ASIC company registration',
      'ABN registration for the SMSF',
      'TFN registration for the SMSF',
      'ATO SMSF registration',
      'Member & trustee documentation',
    ],
    popular: false,
  },
  unit: {
    id: 'unit-trust',
    name: 'Unit Trust Deed',
    shortName: 'Unit Trust',
    price: 185,
    currency: 'AUD',
    description:
      'Fixed entitlement trust where beneficiaries hold units. Perfect for joint ventures, investment groups, and property syndications.',
    features: [
      'Fixed unit entitlements',
      'Clear ownership structure',
      'Ideal for joint ventures',
      'Property investment ready',
      'Professional PDF document',
      'Instant download',
    ],
    popular: false,
  },
} as const;

export const TRUST_WIZARD_STEPS = {
  discretionary: [
    { id: 'trust-details', title: 'Trust Details', description: 'Name your trust' },
    { id: 'settlor', title: 'Settlor', description: 'Who establishes the trust' },
    { id: 'trustee', title: 'Trustee', description: 'Who manages the trust' },
    { id: 'beneficiaries', title: 'Beneficiaries', description: 'Who benefits from the trust' },
    { id: 'appointer', title: 'Appointer', description: 'Who controls the trustee' },
    { id: 'review', title: 'Review', description: 'Check your details' },
    { id: 'payment', title: 'Payment', description: 'Complete your order' },
  ],
  unit: [
    { id: 'trust-details', title: 'Trust Details', description: 'Name your trust' },
    { id: 'settlor', title: 'Settlor', description: 'Who establishes the trust' },
    { id: 'trustee', title: 'Trustee', description: 'Who manages the trust' },
    { id: 'unit-holders', title: 'Unit Holders', description: 'Initial unit allocation' },
    { id: 'appointer', title: 'Appointer', description: 'Who controls the trustee' },
    { id: 'review', title: 'Review', description: 'Check your details' },
    { id: 'payment', title: 'Payment', description: 'Complete your order' },
  ],
  discretionaryBundle: [
    { id: 'trust-details', title: 'Trust Details', description: 'Name your trust' },
    { id: 'settlor', title: 'Settlor', description: 'Who establishes the trust' },
    { id: 'trustee-company', title: 'Trustee Company', description: 'Corporate trustee details' },
    { id: 'directors', title: 'Directors', description: 'Company directors' },
    { id: 'beneficiaries', title: 'Beneficiaries', description: 'Who benefits from the trust' },
    { id: 'appointer', title: 'Appointer', description: 'Who controls the trustee' },
    { id: 'registrations', title: 'Registrations', description: 'ABN, TFN & GST options' },
    { id: 'review', title: 'Review', description: 'Check your details' },
    { id: 'payment', title: 'Payment', description: 'Complete your order' },
  ],
  companyRegistration: [
    { id: 'company-details', title: 'Company Details', description: 'Name your company' },
    { id: 'registered-office', title: 'Registered Office', description: 'Official address' },
    { id: 'directors', title: 'Directors', description: 'Company directors' },
    { id: 'shareholders', title: 'Shareholders', description: 'Share allocation' },
    { id: 'review', title: 'Review', description: 'Check your details' },
    { id: 'payment', title: 'Payment', description: 'Complete your order' },
  ],
  smsfBundle: [
    { id: 'smsf-details', title: 'SMSF Details', description: 'Name your fund' },
    { id: 'members', title: 'Members', description: 'Fund members' },
    { id: 'trustee-company', title: 'Trustee Company', description: 'Corporate trustee details' },
    { id: 'directors', title: 'Directors', description: 'Trustee directors' },
    { id: 'review', title: 'Review', description: 'Check your details' },
    { id: 'payment', title: 'Payment', description: 'Complete your order' },
  ],
} as const;

export const TRUST_SIGNALS = [
  {
    title: 'Australian Made',
    description: 'Designed specifically for Australian tax and legal requirements',
    icon: 'shield',
  },
  {
    title: 'Instant Delivery',
    description: 'Download your trust deed immediately after payment',
    icon: 'zap',
  },
  {
    title: 'Secure Payment',
    description: 'Bank-level encryption with Stripe',
    icon: 'lock',
  },
  {
    title: 'Plain English',
    description: 'Clear explanations at every step',
    icon: 'book',
  },
] as const;

export const DISCLAIMERS = {
  general:
    'Trust Australia provides document preparation services only. We do not provide legal, tax, or financial advice. The information on this website is general in nature and should not be relied upon as professional advice. We recommend consulting with qualified professionals for advice specific to your circumstances.',
  trustDeed:
    'This trust deed is a template document. You should have it reviewed by a qualified legal professional before execution to ensure it meets your specific requirements.',
} as const;
