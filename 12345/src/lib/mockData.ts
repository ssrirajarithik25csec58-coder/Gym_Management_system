// ============================================================
// Vidvan — Unified Scholarship Platform — Mock Data
// ============================================================

export type SchemeType = 'PRE_MATRIC' | 'POST_MATRIC' | 'TOP_CLASS' | 'NFST' | 'NOS';

export type ApplicationStatus =
  | 'DRAFT' | 'SUBMITTED' | 'UNDER_VERIFICATION'
  | 'DEFICIENT' | 'VERIFIED' | 'SANCTIONED'
  | 'DISBURSEMENT_INITIATED' | 'DISBURSED' | 'REJECTED';

export type VerificationStage =
  | 'INSTITUTE' | 'DISTRICT' | 'STATE' | 'MINISTRY' | 'COMPLETED';

export type DocumentVerificationStatus =
  | 'PENDING' | 'AUTO_VERIFIED' | 'MANUAL_REVIEW' | 'VERIFIED' | 'REJECTED';

export type DocumentSource = 'UPLOAD' | 'DIGILOCKER' | 'E_DISTRICT' | 'OCR';

export type DocumentType =
  | 'AADHAAR' | 'ST_CERTIFICATE' | 'INCOME_CERTIFICATE'
  | 'DOMICILE_CERTIFICATE' | 'MARKSHEET' | 'ADMISSION_LETTER'
  | 'FEE_RECEIPT' | 'BANK_PASSBOOK' | 'DISABILITY_CERTIFICATE'
  | 'NET_JRF_CERTIFICATE' | 'IELTS_SCORE' | 'PASSPORT'
  | 'RECOMMENDATION_LETTER' | 'PHOTOGRAPH' | 'OTHER';

export interface Student {
  id: string;
  aadhaarLast4: string;
  aparId: string;
  name: string;
  dob: string;
  gender: 'M' | 'F' | 'O';
  tribe: string;
  isPVTG: boolean;
  state: string;
  district: string;
  block: string;
  annualIncome: number;
  phone: string;
  email: string;
  bankAccountNo: string;
  bankName: string;
  ifscCode: string;
  currentEducationLevel: string;
  institutionName: string;
}

export interface SchemeInfo {
  id: SchemeType;
  name: string;
  shortName: string;
  description: string;
  eligibility: string[];
  maxIncome: number;
  educationLevel: string;
  portalSource: string;
  benefits: string;
  documentsRequired: DocumentType[];
  applicationDeadline: string;
  tagClass: string;
}

export interface Application {
  id: string;
  schemeId: SchemeType;
  schemeName: string;
  academicYear: string;
  status: ApplicationStatus;
  currentStage: VerificationStage;
  institutionName: string;
  courseName: string;
  appliedDate: string;
  lastUpdated: string;
  sanctionedAmount?: number;
  disbursedAmount?: number;
  pendingActions: string[];
  deficiencies: string[];
  stageProgress: number; // 0-100
}

export interface Document {
  id: string;
  type: DocumentType;
  name: string;
  source: DocumentSource;
  verificationStatus: DocumentVerificationStatus;
  verifiedBy?: string;
  isReusable: boolean;
  uploadedAt: string;
  fileSize: string;
  verificationSource?: string;
}

export interface Verification {
  id: string;
  applicationId: string;
  field: string;
  sourceSystem: string;
  status: 'PENDING' | 'MATCHED' | 'PARTIAL_MATCH' | 'MISMATCH' | 'UNAVAILABLE';
  submittedValue: string;
  verifiedValue?: string;
  confidence: number;
  manualReviewRequired: boolean;
  timestamp: string;
}

export interface Disbursement {
  id: string;
  applicationId: string;
  schemeName: string;
  amount: number;
  component: string;
  status: 'INITIATED' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'RETURNED';
  pfmsTransactionId?: string;
  disbursedAt?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'active' | 'pending' | 'error';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

// ============================================================
// Mock Data
// ============================================================

export const currentStudent: Student = {
  id: 'STU-2025-0847',
  aadhaarLast4: '5678',
  aparId: 'APAAR-MH-2024-00847',
  name: 'Anita Murmu',
  dob: '2003-06-15',
  gender: 'F',
  tribe: 'Santhal',
  isPVTG: false,
  state: 'Jharkhand',
  district: 'Dumka',
  block: 'Dumka Sadar',
  annualIncome: 180000,
  phone: '+91 94310 XXXXX',
  email: 'anita.murmu@email.com',
  bankAccountNo: 'XXXX XXXX 3456',
  bankName: 'State Bank of India',
  ifscCode: 'SBIN0001234',
  currentEducationLevel: 'B.Sc. (Hons) Chemistry — Year 2',
  institutionName: 'Sido Kanhu Murmu University, Dumka',
};

export const schemes: SchemeInfo[] = [
  {
    id: 'PRE_MATRIC',
    name: 'Pre-Matric Scholarship for ST Students',
    shortName: 'Pre-Matric',
    description: 'Financial assistance for ST students studying in Classes I to X to reduce dropout rates and support educational continuity.',
    eligibility: [
      'Student belongs to Scheduled Tribe',
      'Studying in Class I to X',
      'Family annual income ≤ ₹2,50,000',
      'Enrolled in recognized school',
      'Not availing any other centrally-funded scholarship',
    ],
    maxIncome: 250000,
    educationLevel: 'Class I – X',
    portalSource: 'NSP',
    benefits: '₹3,500 – ₹7,000/year (maintenance + ad hoc grant)',
    documentsRequired: ['AADHAAR', 'ST_CERTIFICATE', 'INCOME_CERTIFICATE', 'MARKSHEET', 'BANK_PASSBOOK', 'PHOTOGRAPH'],
    applicationDeadline: '2025-11-30',
    tagClass: 'pre-matric',
  },
  {
    id: 'POST_MATRIC',
    name: 'Post-Matric Scholarship for ST Students',
    shortName: 'Post-Matric',
    description: 'Scholarship for ST students pursuing post-matriculation studies including graduation, post-graduation, and professional courses.',
    eligibility: [
      'Student belongs to Scheduled Tribe',
      'Studying in Class XI or above / UG / PG',
      'Family annual income ≤ ₹2,50,000',
      'Enrolled in recognized institution (AISHE listed)',
      'Not availing any other centrally-funded scholarship',
    ],
    maxIncome: 250000,
    educationLevel: 'Class XI+ / UG / PG',
    portalSource: 'NSP',
    benefits: 'Maintenance allowance + compulsory non-refundable fees',
    documentsRequired: ['AADHAAR', 'ST_CERTIFICATE', 'INCOME_CERTIFICATE', 'MARKSHEET', 'ADMISSION_LETTER', 'FEE_RECEIPT', 'BANK_PASSBOOK', 'PHOTOGRAPH'],
    applicationDeadline: '2025-12-31',
    tagClass: 'post-matric',
  },
  {
    id: 'TOP_CLASS',
    name: 'National Fellowship – Top Class Education for ST Students',
    shortName: 'Top Class',
    description: 'Full financial support for ST students admitted to top-class (notified) institutions including IITs, IIMs, NITs, AIIMS, and other premier institutions.',
    eligibility: [
      'Student belongs to Scheduled Tribe',
      'Admitted to a notified top-class institution',
      'Family annual income ≤ ₹6,00,000',
      'Not availing any other centrally-funded scholarship',
    ],
    maxIncome: 600000,
    educationLevel: 'UG / PG at notified institutions',
    portalSource: 'SFMP (Canara Bank)',
    benefits: 'Full tuition + maintenance (₹2,200–₹3,000/month) + books + computer allowance',
    documentsRequired: ['AADHAAR', 'ST_CERTIFICATE', 'INCOME_CERTIFICATE', 'MARKSHEET', 'ADMISSION_LETTER', 'FEE_RECEIPT', 'BANK_PASSBOOK', 'PHOTOGRAPH'],
    applicationDeadline: '2025-10-31',
    tagClass: 'top-class',
  },
  {
    id: 'NFST',
    name: 'National Fellowship for Scheduled Tribe Students (NFST)',
    shortName: 'NFST',
    description: 'Research fellowship for ST students pursuing M.Phil and PhD in Indian universities/institutions, modeled on UGC-NET JRF.',
    eligibility: [
      'Student belongs to Scheduled Tribe',
      'Qualified NET/JRF conducted by UGC-NTA',
      'Registered for M.Phil/PhD in UGC-recognized university',
      'Not availing any other fellowship',
    ],
    maxIncome: 0, // No income limit
    educationLevel: 'M.Phil / PhD',
    portalSource: 'SFMP (Canara Bank)',
    benefits: 'JRF: ₹31,000/month → SRF: ₹35,000/month + HRA + contingency',
    documentsRequired: ['AADHAAR', 'ST_CERTIFICATE', 'NET_JRF_CERTIFICATE', 'ADMISSION_LETTER', 'BANK_PASSBOOK', 'PHOTOGRAPH'],
    applicationDeadline: '2025-09-30',
    tagClass: 'nfst',
  },
  {
    id: 'NOS',
    name: 'National Overseas Scholarship for ST Students (NOS)',
    shortName: 'NOS',
    description: 'Financial assistance for ST students to pursue Masters and PhD programs at accredited overseas universities.',
    eligibility: [
      'Student belongs to Scheduled Tribe',
      'Secured admission in accredited foreign university (top 500 QS/THE ranking)',
      'Family annual income ≤ ₹6,00,000',
      'Below 35 years of age',
      'Not availing any other scholarship for studying abroad',
    ],
    maxIncome: 600000,
    educationLevel: 'Masters / PhD (Overseas)',
    portalSource: 'NOS Portal',
    benefits: 'Full tuition + living stipend + airfare + visa + insurance + contingency',
    documentsRequired: ['AADHAAR', 'ST_CERTIFICATE', 'INCOME_CERTIFICATE', 'MARKSHEET', 'ADMISSION_LETTER', 'PASSPORT', 'IELTS_SCORE', 'RECOMMENDATION_LETTER', 'BANK_PASSBOOK', 'PHOTOGRAPH'],
    applicationDeadline: '2025-08-31',
    tagClass: 'nos',
  },
];

export const applications: Application[] = [
  {
    id: 'APP-2025-PM-0382',
    schemeId: 'POST_MATRIC',
    schemeName: 'Post-Matric Scholarship',
    academicYear: '2025-26',
    status: 'SANCTIONED',
    currentStage: 'COMPLETED',
    institutionName: 'Sido Kanhu Murmu University, Dumka',
    courseName: 'B.Sc. (Hons) Chemistry',
    appliedDate: '2025-08-15',
    lastUpdated: '2025-10-22',
    sanctionedAmount: 42000,
    disbursedAmount: 28000,
    pendingActions: [],
    deficiencies: [],
    stageProgress: 85,
  },
  {
    id: 'APP-2024-PM-1247',
    schemeId: 'POST_MATRIC',
    schemeName: 'Post-Matric Scholarship',
    academicYear: '2024-25',
    status: 'DISBURSED',
    currentStage: 'COMPLETED',
    institutionName: 'Sido Kanhu Murmu University, Dumka',
    courseName: 'B.Sc. (Hons) Chemistry',
    appliedDate: '2024-08-10',
    lastUpdated: '2025-03-15',
    sanctionedAmount: 38000,
    disbursedAmount: 38000,
    pendingActions: [],
    deficiencies: [],
    stageProgress: 100,
  },
  {
    id: 'APP-2025-TC-0089',
    schemeId: 'TOP_CLASS',
    schemeName: 'Top Class Education',
    academicYear: '2025-26',
    status: 'DEFICIENT',
    currentStage: 'DISTRICT',
    institutionName: 'Sido Kanhu Murmu University, Dumka',
    courseName: 'B.Sc. (Hons) Chemistry',
    appliedDate: '2025-09-01',
    lastUpdated: '2025-09-20',
    sanctionedAmount: undefined,
    disbursedAmount: undefined,
    pendingActions: ['Upload updated income certificate', 'Verify institution accreditation'],
    deficiencies: ['Income certificate expired (older than 6 months)', 'Institution not in notified list for Top Class scheme'],
    stageProgress: 28,
  },
];

export const documents: Document[] = [
  {
    id: 'DOC-001',
    type: 'AADHAAR',
    name: 'Aadhaar Card',
    source: 'DIGILOCKER',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'UIDAI',
    isReusable: true,
    uploadedAt: '2025-07-10',
    fileSize: '245 KB',
    verificationSource: 'DigiLocker API',
  },
  {
    id: 'DOC-002',
    type: 'ST_CERTIFICATE',
    name: 'Scheduled Tribe Certificate',
    source: 'E_DISTRICT',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'District Magistrate, Dumka',
    isReusable: true,
    uploadedAt: '2025-07-10',
    fileSize: '312 KB',
    verificationSource: 'Jharkhand e-District',
  },
  {
    id: 'DOC-003',
    type: 'INCOME_CERTIFICATE',
    name: 'Income Certificate (2024-25)',
    source: 'E_DISTRICT',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'Block Development Officer',
    isReusable: true,
    uploadedAt: '2025-07-12',
    fileSize: '198 KB',
    verificationSource: 'Jharkhand e-District',
  },
  {
    id: 'DOC-004',
    type: 'INCOME_CERTIFICATE',
    name: 'Income Certificate (2025-26)',
    source: 'UPLOAD',
    verificationStatus: 'PENDING',
    isReusable: true,
    uploadedAt: '2025-09-18',
    fileSize: '156 KB',
  },
  {
    id: 'DOC-005',
    type: 'MARKSHEET',
    name: 'B.Sc. Year 1 Marksheet',
    source: 'DIGILOCKER',
    verificationStatus: 'AUTO_VERIFIED',
    verifiedBy: 'Academic Bank of Credits',
    isReusable: true,
    uploadedAt: '2025-07-15',
    fileSize: '420 KB',
    verificationSource: 'DigiLocker / ABC',
  },
  {
    id: 'DOC-006',
    type: 'ADMISSION_LETTER',
    name: 'University Admission Letter 2025-26',
    source: 'UPLOAD',
    verificationStatus: 'AUTO_VERIFIED',
    verifiedBy: 'AISHE Verification',
    isReusable: false,
    uploadedAt: '2025-08-01',
    fileSize: '380 KB',
    verificationSource: 'AISHE Database',
  },
  {
    id: 'DOC-007',
    type: 'FEE_RECEIPT',
    name: 'Tuition Fee Receipt (Sem 3)',
    source: 'UPLOAD',
    verificationStatus: 'MANUAL_REVIEW',
    isReusable: false,
    uploadedAt: '2025-08-10',
    fileSize: '215 KB',
  },
  {
    id: 'DOC-008',
    type: 'BANK_PASSBOOK',
    name: 'SBI Passbook — Front Page',
    source: 'UPLOAD',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'NPCI Validation',
    isReusable: true,
    uploadedAt: '2025-07-10',
    fileSize: '180 KB',
    verificationSource: 'NPCI / PFMS',
  },
  {
    id: 'DOC-009',
    type: 'PHOTOGRAPH',
    name: 'Passport Photo',
    source: 'UPLOAD',
    verificationStatus: 'VERIFIED',
    isReusable: true,
    uploadedAt: '2025-07-10',
    fileSize: '85 KB',
  },
];

export const verifications: Verification[] = [
  {
    id: 'VER-001',
    applicationId: 'APP-2025-PM-0382',
    field: 'Aadhaar Identity',
    sourceSystem: 'UIDAI eKYC',
    status: 'MATCHED',
    submittedValue: 'Anita Murmu, DOB: 15-06-2003',
    verifiedValue: 'Anita Murmu, DOB: 15-06-2003',
    confidence: 100,
    manualReviewRequired: false,
    timestamp: '2025-08-16T10:30:00Z',
  },
  {
    id: 'VER-002',
    applicationId: 'APP-2025-PM-0382',
    field: 'ST Certificate',
    sourceSystem: 'Jharkhand e-District',
    status: 'MATCHED',
    submittedValue: 'Santhal Tribe, Cert No: JH/DUM/ST/2023/4567',
    verifiedValue: 'Santhal Tribe, Cert No: JH/DUM/ST/2023/4567',
    confidence: 100,
    manualReviewRequired: false,
    timestamp: '2025-08-16T10:32:00Z',
  },
  {
    id: 'VER-003',
    applicationId: 'APP-2025-PM-0382',
    field: 'Annual Income',
    sourceSystem: 'Jharkhand e-District',
    status: 'MATCHED',
    submittedValue: '₹1,80,000',
    verifiedValue: '₹1,80,000',
    confidence: 100,
    manualReviewRequired: false,
    timestamp: '2025-08-16T10:35:00Z',
  },
  {
    id: 'VER-004',
    applicationId: 'APP-2025-PM-0382',
    field: 'Institution Verification',
    sourceSystem: 'AISHE Database',
    status: 'MATCHED',
    submittedValue: 'Sido Kanhu Murmu University (AISHE: U-0469)',
    verifiedValue: 'Sido Kanhu Murmu University (AISHE: U-0469)',
    confidence: 100,
    manualReviewRequired: false,
    timestamp: '2025-08-17T09:15:00Z',
  },
  {
    id: 'VER-005',
    applicationId: 'APP-2025-PM-0382',
    field: 'Bank Account (NPCI)',
    sourceSystem: 'NPCI / PFMS',
    status: 'MATCHED',
    submittedValue: 'SBI A/c XXXX3456, IFSC: SBIN0001234',
    verifiedValue: 'Account Active, Name Matched',
    confidence: 100,
    manualReviewRequired: false,
    timestamp: '2025-08-17T09:20:00Z',
  },
  {
    id: 'VER-006',
    applicationId: 'APP-2025-TC-0089',
    field: 'Income Certificate',
    sourceSystem: 'Jharkhand e-District',
    status: 'PARTIAL_MATCH',
    submittedValue: 'Certificate dated March 2024',
    verifiedValue: 'Certificate older than 6 months — renewal required',
    confidence: 45,
    manualReviewRequired: true,
    timestamp: '2025-09-15T11:00:00Z',
  },
  {
    id: 'VER-007',
    applicationId: 'APP-2025-TC-0089',
    field: 'Institution (Top Class List)',
    sourceSystem: 'Vidvan Notified Institution List',
    status: 'MISMATCH',
    submittedValue: 'Sido Kanhu Murmu University',
    verifiedValue: 'Institution NOT in Top Class notified list',
    confidence: 0,
    manualReviewRequired: true,
    timestamp: '2025-09-15T11:05:00Z',
  },
];

export const disbursements: Disbursement[] = [
  {
    id: 'DIS-001',
    applicationId: 'APP-2025-PM-0382',
    schemeName: 'Post-Matric Scholarship',
    amount: 18000,
    component: 'Maintenance Allowance (Sem 3)',
    status: 'SUCCESS',
    pfmsTransactionId: 'PFMS-2025-JH-00847-01',
    disbursedAt: '2025-09-05',
  },
  {
    id: 'DIS-002',
    applicationId: 'APP-2025-PM-0382',
    schemeName: 'Post-Matric Scholarship',
    amount: 10000,
    component: 'Tuition Fee Reimbursement (Sem 3)',
    status: 'SUCCESS',
    pfmsTransactionId: 'PFMS-2025-JH-00847-02',
    disbursedAt: '2025-09-10',
  },
  {
    id: 'DIS-003',
    applicationId: 'APP-2025-PM-0382',
    schemeName: 'Post-Matric Scholarship',
    amount: 14000,
    component: 'Maintenance Allowance (Sem 4)',
    status: 'PROCESSING',
  },
  {
    id: 'DIS-004',
    applicationId: 'APP-2024-PM-1247',
    schemeName: 'Post-Matric Scholarship (2024-25)',
    amount: 20000,
    component: 'Maintenance Allowance (Sem 1 & 2)',
    status: 'SUCCESS',
    pfmsTransactionId: 'PFMS-2024-JH-01247-01',
    disbursedAt: '2024-12-20',
  },
  {
    id: 'DIS-005',
    applicationId: 'APP-2024-PM-1247',
    schemeName: 'Post-Matric Scholarship (2024-25)',
    amount: 18000,
    component: 'Tuition Fee + Book Grant',
    status: 'SUCCESS',
    pfmsTransactionId: 'PFMS-2024-JH-01247-02',
    disbursedAt: '2025-02-10',
  },
];

export const applicationTimelines: Record<string, TimelineEvent[]> = {
  'APP-2025-PM-0382': [
    { id: 'T1', title: 'Application Submitted', description: 'Submitted via NSP', date: '15 Aug 2025', status: 'completed' },
    { id: 'T2', title: 'Auto-Verification Initiated', description: 'Aadhaar, ST cert, income, institution verified via integration layer', date: '16 Aug 2025', status: 'completed' },
    { id: 'T3', title: 'Institute Verification', description: 'Verified by Sido Kanhu Murmu University registrar', date: '22 Aug 2025', status: 'completed' },
    { id: 'T4', title: 'District Verification', description: 'Verified by District Welfare Officer, Dumka', date: '05 Sep 2025', status: 'completed' },
    { id: 'T5', title: 'State Verification', description: 'Verified by Jharkhand Tribal Welfare Dept.', date: '15 Sep 2025', status: 'completed' },
    { id: 'T6', title: 'Scholarship Sanctioned', description: '₹42,000 sanctioned for Academic Year 2025-26', date: '22 Oct 2025', status: 'completed' },
    { id: 'T7', title: 'First Disbursement', description: '₹18,000 (Maintenance) + ₹10,000 (Tuition) credited to SBI A/c', date: '10 Sep 2025', status: 'completed' },
    { id: 'T8', title: 'Second Disbursement', description: '₹14,000 (Sem 4 Maintenance) — Processing via PFMS', date: 'Expected Nov 2025', status: 'active' },
  ],
  'APP-2025-TC-0089': [
    { id: 'T1', title: 'Application Submitted', description: 'Submitted via SFMP portal', date: '01 Sep 2025', status: 'completed' },
    { id: 'T2', title: 'Auto-Verification Initiated', description: 'Identity & ST certificate matched; Income certificate flagged', date: '02 Sep 2025', status: 'completed' },
    { id: 'T3', title: 'Deficiency Notice Issued', description: 'Income certificate expired; Institution not in Top Class notified list', date: '20 Sep 2025', status: 'error' },
    { id: 'T4', title: 'Awaiting Student Action', description: 'Upload renewed income certificate & verify institution eligibility', date: 'Pending', status: 'active' },
  ],
};

export const notifications: Notification[] = [
  {
    id: 'NOT-001',
    title: 'Scholarship Disbursement Processed',
    message: '₹28,000 credited to your SBI account for Post-Matric Scholarship (Sem 3). Transaction ID: PFMS-2025-JH-00847.',
    type: 'success',
    timestamp: '2025-09-10T14:30:00Z',
    isRead: true,
    actionUrl: '/payments',
  },
  {
    id: 'NOT-002',
    title: 'Deficiency in Top Class Application',
    message: 'Your Top Class Education application (APP-2025-TC-0089) has 2 deficiencies. Please upload the required documents before 15 Oct 2025.',
    type: 'warning',
    timestamp: '2025-09-20T10:00:00Z',
    isRead: false,
    actionUrl: '/applications/APP-2025-TC-0089',
  },
  {
    id: 'NOT-003',
    title: 'Second Disbursement Initiated',
    message: '₹14,000 (Sem 4 Maintenance Allowance) has been initiated via PFMS. Expected credit within 7-10 working days.',
    type: 'info',
    timestamp: '2025-09-25T09:00:00Z',
    isRead: false,
    actionUrl: '/payments',
  },
  {
    id: 'NOT-004',
    title: 'Document Auto-Verified',
    message: 'Your B.Sc. Year 1 Marksheet has been automatically verified through Academic Bank of Credits (DigiLocker).',
    type: 'success',
    timestamp: '2025-07-15T16:00:00Z',
    isRead: true,
  },
  {
    id: 'NOT-005',
    title: 'New Scheme Available — NFST',
    message: 'As a graduating ST student, you may be eligible for the National Fellowship (NFST) for M.Phil/PhD. Check eligibility now.',
    type: 'info',
    timestamp: '2025-09-01T08:00:00Z',
    isRead: true,
    actionUrl: '/schemes',
  },
];

// Admin / Coverage Data
export interface CoverageData {
  state: string;
  totalSTStudents: number;
  scholarshipBeneficiaries: number;
  coveragePercent: number;
  preMatric: number;
  postMatric: number;
  topClass: number;
  nfst: number;
  nos: number;
}

export const coverageData: CoverageData[] = [
  { state: 'Madhya Pradesh', totalSTStudents: 1250000, scholarshipBeneficiaries: 487500, coveragePercent: 39, preMatric: 280000, postMatric: 165000, topClass: 32000, nfst: 8500, nos: 2000 },
  { state: 'Odisha', totalSTStudents: 980000, scholarshipBeneficiaries: 441000, coveragePercent: 45, preMatric: 245000, postMatric: 156000, topClass: 28000, nfst: 9800, nos: 2200 },
  { state: 'Jharkhand', totalSTStudents: 850000, scholarshipBeneficiaries: 382500, coveragePercent: 45, preMatric: 212000, postMatric: 135000, topClass: 25000, nfst: 8000, nos: 2500 },
  { state: 'Chhattisgarh', totalSTStudents: 720000, scholarshipBeneficiaries: 252000, coveragePercent: 35, preMatric: 155000, postMatric: 78000, topClass: 14000, nfst: 4200, nos: 800 },
  { state: 'Maharashtra', totalSTStudents: 680000, scholarshipBeneficiaries: 340000, coveragePercent: 50, preMatric: 190000, postMatric: 118000, topClass: 22000, nfst: 7500, nos: 2500 },
  { state: 'Rajasthan', totalSTStudents: 620000, scholarshipBeneficiaries: 229400, coveragePercent: 37, preMatric: 140000, postMatric: 72000, topClass: 12400, nfst: 3800, nos: 1200 },
  { state: 'Gujarat', totalSTStudents: 550000, scholarshipBeneficiaries: 247500, coveragePercent: 45, preMatric: 148000, postMatric: 82000, topClass: 12000, nfst: 4200, nos: 1300 },
  { state: 'Assam', totalSTStudents: 480000, scholarshipBeneficiaries: 168000, coveragePercent: 35, preMatric: 98000, postMatric: 55000, topClass: 10000, nfst: 3800, nos: 1200 },
  { state: 'Meghalaya', totalSTStudents: 350000, scholarshipBeneficiaries: 175000, coveragePercent: 50, preMatric: 105000, postMatric: 55000, topClass: 10000, nfst: 3800, nos: 1200 },
  { state: 'Nagaland', totalSTStudents: 180000, scholarshipBeneficiaries: 79200, coveragePercent: 44, preMatric: 42000, postMatric: 28000, topClass: 6200, nfst: 2200, nos: 800 },
];

export const adminStats = {
  totalApplications: 1847523,
  sanctioned: 1245672,
  disbursed: 1089345,
  pending: 412506,
  deficient: 189345,
  rejected: 67823,
  totalDisbursement: 485600000000, // ₹4,856 Cr
  averageProcessingDays: 42,
  autoVerifiedPercent: 68,
};

// Chatbot Responses
export const chatbotResponses: Record<string, string> = {
  'eligibility': 'Based on your profile, Anita, you are currently eligible for:\n\n✅ **Post-Matric Scholarship** — You already have an active application.\n❌ **Top Class Education** — Your institution is not in the notified list.\n⚠️ **NFST** — Will be eligible after completing graduation + clearing NET/JRF.\n❌ **NOS** — Will be eligible after securing foreign university admission.',
  'status': 'Here\'s your application status:\n\n📋 **Post-Matric (2025-26)** — Sanctioned ✅ (₹42,000)\n  └ Disbursed: ₹28,000 | Pending: ₹14,000\n\n📋 **Top Class (2025-26)** — Deficient ⚠️\n  └ 2 pending actions required',
  'documents': 'You need to upload:\n\n1. 📄 **Updated Income Certificate** — Your current one expired\n2. 📄 **Institution Accreditation Proof** — For Top Class application\n\nAll other documents are verified ✅',
  'payment': 'Your payment status:\n\n💰 **₹28,000** received on 10 Sep 2025\n  └ ₹18,000 (Maintenance) + ₹10,000 (Tuition)\n\n⏳ **₹14,000** processing via PFMS\n  └ Expected: Nov 2025\n\nTotal received this year: **₹28,000 / ₹42,000**',
  'default': 'I can help you with:\n\n🎓 **Eligibility** — Check which schemes you qualify for\n📋 **Status** — Track your applications\n📄 **Documents** — Know what\'s pending\n💰 **Payments** — Check disbursement status\n\nJust type your question or click a quick action below!',
};
