export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  iconName: 'handshake' | 'shield' | 'home' | 'scroll' | 'building' | 'gavel';
  iconEmoji: string;
  summary: string;
  fullDescription: string;
  duration: string;
  estimatedFee: string;
  requiredDocs: string[];
  isFeatured: boolean;
  order: number;
  image: string;
}

export interface CaseItem {
  id: string;
  caseNumber: string;
  clientName: string;
  clientPhone: string;
  caseType: 'کیفری' | 'خانواده' | 'تجاری' | 'ملکی' | 'ارث' | 'کار و بیمه';
  registrationDate: string;
  status: 'در حال بررسی' | 'در جریان' | 'بسته شده' | 'به رأی نهایی رسیده';
  nextCourtSession: string;
  documentsCount: number;
  notes: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  rating: number;
  serviceUsed: string;
  text: string;
  date: string;
  isApproved: boolean;
  avatar: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  thumbnail: string;
  views: number;
}

export interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
}

export interface VideoItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  duration: string;
  date: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  tags: string[];
  presenter: string;
  presenterRole: string;
  description: string;
  chapters?: VideoChapter[];
  transcript?: string;
}

export interface CommentItem {
  id: string;
  author: string;
  authorEmail: string;
  avatar?: string;
  content: string;
  date: string;
  postTitle: string;
  postType: 'article' | 'video' | 'service';
  postId: string;
  status: 'approved' | 'pending' | 'spam' | 'trash';
  rating?: number;
  likes: number;
  replies?: CommentItem[];
  parentCommentId?: string | null;
}

export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  caseCount: number;
  badge?: string;
}

export interface StorySlide {
  image: string;
  title: string;
  text: string;
  caption?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface StoryItem {
  id: string;
  author: string;
  title: string;
  category: string;
  image: string;
  isUnseen: boolean;
  slides: StorySlide[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'مشاوره' | 'حق‌الوکاله' | 'روند دادرسی' | 'اسناد و مدارک';
}

export interface ElementorBlockDef {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  category: 'هیرو و معرفی' | 'خدمات و پرونده‌ها' | 'اعتبار و نظرات' | 'فرم و رزرو' | 'فوتر و هدر';
  description: string;
  icon: string;
  options: {
    name: string;
    type: 'text' | 'select' | 'boolean' | 'color';
    defaultValue: string | boolean;
    options?: string[];
  }[];
}

export interface WordPressFile {
  path: string;
  filename: string;
  category: 'قالب اصلی (Templates)' | 'بخش‌های داخلی (Inc)' | 'برگه‌ها و آرشیوها' | 'استایل و دارایی‌ها (Assets)' | 'پیکربندی گیت و CI/CD (.github)' | 'مستندات و زبان' | 'افزونه مکمل (Plugin Addons)' | 'ماژول‌های افزونه (Plugin Includes)';
  description: string;
  code: string;
}

// ==========================================
// Phase 5 Types: ODR, Virtual Court & Petitions
// ==========================================

export interface ArbitrationPleading {
  id: string;
  sender: 'claimant' | 'respondent' | 'arbitrator';
  senderName: string;
  title: string;
  date: string;
  content: string;
  attachments?: string[];
  trackingCode: string;
}

export interface ArbitrationCase {
  id: string;
  caseNumber: string;
  arbitrationCode: string;
  disputeTitle: string;
  claimantName: string;
  claimantNationalId: string;
  claimantLawyer: string;
  respondentName: string;
  respondentNationalId: string;
  respondentLawyer?: string;
  arbitratorName: string;
  arbitratorLicense: string;
  claimAmountToman: number;
  arbitrationClauseType: 'ماده داوری قرارداد' | 'موافقت‌نامه داوری مستقل' | 'ارجاع از دادگاه';
  registrationDate: string;
  hearingDate: string;
  status: 'در حال تبادل لوایح' | 'جلسه استماع آنلاین' | 'در شرف صدور رأی' | 'رأی داوری صادر شد' | 'ابلاغ شده به اجرای احکام';
  pleadings: ArbitrationPleading[];
  awardSummary?: string;
  awardFullText?: string;
  awardDate?: string;
  enforcementBranch?: string;
}

export interface PetitionFieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'date' | 'select';
  placeholder?: string;
  defaultValue?: string;
  options?: string[];
  required?: boolean;
}

export interface PetitionTemplate {
  id: string;
  title: string;
  category: 'دعاوی ملکی' | 'اسناد تجاری و تعهدات' | 'حقوق خانواده' | 'دعاوی کیفری' | 'لوایح دادرسی';
  subjectTitle: string;
  targetCourt: 'دادگاه عمومی حقوقی' | 'شورای حل اختلاف' | 'دادگاه تجدیدنظر استان' | 'دادسرا و دادگاه کیفری دو';
  legalArticles: string[];
  requiredDocuments: string[];
  defaultText: string;
  customFields?: PetitionFieldDefinition[];
}

export interface VirtualHearingSession {
  id: string;
  sessionCode: string;
  title: string;
  caseNumber: string;
  branchName: string;
  scheduledDateTime: string;
  durationMinutes: number;
  judgeOrArbitrator: string;
  claimantName: string;
  claimantLawyer: string;
  respondentName: string;
  respondentLawyer: string;
  status: 'در انتظار تشکیل' | 'در حال برگزاری' | 'خاتمه‌یافته' | 'تجدید وقت';
  isEncrypted: boolean;
  recordingAvailable: boolean;
  agenda: string[];
}

// ==========================================
// Phase 6 Types: AI Legal Intelligence, Contract Audit & Precedents
// ==========================================

export type ContractRiskLevel = 'critical' | 'high' | 'medium' | 'low';

export interface ContractClauseAudit {
  clauseId: string;
  title: string;
  originalText: string;
  riskLevel: ContractRiskLevel;
  issueDescription: string;
  legalDanger: string;
  recommendedRevision: string;
  relevantLegalArticle: string;
}

export interface ContractAuditSample {
  id: string;
  title: string;
  category: 'مشارکت در ساخت' | 'مبایعه‌نامه املاک' | 'قرارداد کار و محرمانگی NDA' | 'واگذاری سهام و استارتاپ' | 'تعهدات پیمانکاری';
  description: string;
  overallSafetyScore: number;
  sampleRawText: string;
  clauses: ContractClauseAudit[];
}

export interface SupremeCourtPrecedent {
  id: string;
  number: string;
  date: string;
  category: 'ملکی و ثبتی' | 'اسناد تجاری و تعهدات' | 'خانواده و ارث' | 'حقوق بانکی و خسارت تاخیر' | 'کیفری و جرایم رایانه‌ای';
  title: string;
  shortSummary: string;
  fullRuling: string;
  keyTakeaway: string;
  legalCitations: string[];
  citationTemplate: string;
  isBinding: boolean;
}

export interface PropertyDueDiligenceCheck {
  id: string;
  title: string;
  category: 'اسناد مالکیت' | 'محدودیت‌های ثبتی و بازداشت' | 'تعهدات شهرداری و اوقاف' | 'طرفین معامله و اهلیت';
  description: string;
  riskWeight: number;
  howToCheck: string;
  warningSigns: string[];
  lawyerAdvice: string;
}

// ==========================================
// Phase 7 Types: Legal Strategy, Statutory Deadlines & Encrypted Vault
// ==========================================

export type DisputeFieldCategory =
  | 'ملکی و ثبتی'
  | 'اسناد تجاری و چک'
  | 'قراردادها و پیمانکاری'
  | 'بانکی و تسهیلات'
  | 'خانواده و ارث'
  | 'کیفری و جرایم اقتصادی';

export interface CaseFactor {
  id: string;
  label: string;
  impactWeight: number; // positive or negative
  category: 'evidence' | 'procedure' | 'precedent' | 'partyStatus';
  description: string;
}

export interface JudicialDeadlineRule {
  id: string;
  title: string;
  category: 'اعتراض به آراء' | 'دستورات و قرارهای دادرسی' | 'مواهد کارشناسی و ابلاغ' | 'دعاوی کیفری و دادسرا';
  durationDays: number;
  durationForeignDays: number;
  statutoryArticle: string;
  description: string;
  ruleExplanation: string;
  appliesTo: 'ابلاغ واقعی' | 'ابلاغ قانونی' | 'هر دو نوع ابلاغ';
}

export interface ClientVaultDocument {
  id: string;
  title: string;
  category: 'اسناد مالکیت' | 'اسناد تجاری و چک' | 'قراردادها' | 'ادله صوتی و دیجیتال' | 'آراء و اوراق قضایی';
  fileType: 'pdf' | 'image' | 'audio' | 'contract';
  fileSize: string;
  uploadDate: string;
  sha256Hash: string;
  confidentialityLevel: 'عادی' | 'محرمانه موکل' | 'فوق‌سری دادگاه' | 'امتیاز محرمانگی دفاع';
  caseTrackingCode: string;
  lawyerCertified: boolean;
  notes: string;
}

// ==========================================
// Phase 8 Types: Corporate Governance, Incoterms & International Arbitration
// ==========================================

export type CompanyType = 'سهامی خاص' | 'با مسئولیت محدود' | 'سهامی عام' | 'تضامنی' | 'دانش‌بنیان / استارتاپ';

export interface CorporateDecisionQuorum {
  id: string;
  title: string;
  assemblyType: 'مجمع عمومی عادی' | 'مجمع عمومی عادی به‌طور فوق‌العاده' | 'مجمع عمومی فوق‌العاده' | 'هیئت مدیره';
  firstCallQuorum: string; // نصاب دعوت اول
  secondCallQuorum: string; // نصاب دعوت دوم
  decisionMajority: string; // اکثریت لازم برای تصویب
  statutoryArticle: string;
  requiredDocuments: string[];
  registrationDeadlineDays: number;
  lawyerTips: string;
}

export type IncotermsTransportType = 'any' | 'sea_only';

export interface IncotermsRule {
  code: string; // EXW, FCA, CPT, CIP, DAP, DPU, DDP, FAS, FOB, CFR, CIF
  nameEn: string;
  nameFa: string;
  transportType: IncotermsTransportType;
  category: 'E-Term' | 'F-Term' | 'C-Term' | 'D-Term';
  sellerRiskUntil: string;
  buyerRiskFrom: string;
  freightPayer: 'فروشنده' | 'خریدار';
  insuranceResponsible: 'فروشنده (پوشش حداکثری A)' | 'فروشنده (پوشش حداقلی C)' | 'فروشنده' | 'خریدار' | 'اختیاری طرفین';
  exportCustoms: 'فروشنده' | 'خریدار';
  importCustoms: 'فروشنده' | 'خریدار';
  riskScore: number; // 1 (کمترین ریسک خریدار) تا 10 (بیشترین ریسک خریدار)
  practicalAdvice: string;
  cisgCompatibilityNote: string;
}

export interface ArbitrationInstitution {
  id: string;
  nameFa: string;
  nameEn: string;
  headquarters: string;
  governingRules: string;
  applicableLawRecommendation: string;
  languageRecommendation: string;
  standardClauseEn: string;
  standardClauseFa: string;
  avgDurationMonths: number;
  newYorkConventionEnforceable: boolean;
  adminFeeFormulaDescription: string;
  expertTips: string;
}

// ==========================================
// Phase 9 Types: Intellectual Property (IP), Trademark Registry, Tech Licensing & Startup Vesting
// ==========================================

export type IPAssetType = 'علامت تجاری (برند)' | 'اختراع و پتنت (Patent)' | 'طرح صنعتی (Industrial Design)' | 'حق مؤلف و نرم‌افزار (Copyright)';

export interface NiceClassificationClass {
  classNumber: number;
  titleFa: string;
  titleEn: string;
  category: 'goods' | 'services'; // کالاها (طبقات ۱ تا ۳۴) یا خدمات (طبقات ۳۵ تا ۴۵)
  description: string;
  popularKeywords: string[];
  riskFactor: 'عادی' | 'پرتقاضا و پرتعارض' | 'نیازمند مجوز خاص';
}

export interface IPAssetEvaluation {
  id: string;
  title: string;
  assetType: IPAssetType;
  registrationTerritory: 'ایران (اداره مالکیت صنعتی)' | 'بین‌المللی (سیستم مادرید WIPO)' | 'منطقه‌ای (EUIPO / GCC)';
  niceClasses: number[];
  status: 'در حال استعلام' | 'آگهی نوبت اول' | 'دوران اعتراض ۳۰ روزه' | 'ثبت قطعی و صدور تصدیق ۱۰ ساله';
  expirationDate: string;
  infringementRiskScore: number; // 0-100
  defenseStrategy: string;
}

export interface StartupVestingSchedule {
  founderName: string;
  role: string;
  equityPercentage: number;
  totalShares: number;
  vestingPeriodYears: number; // e.g. 4 years
  cliffPeriodMonths: number; // e.g. 12 months cliff
  accelerationClause: 'تک‌مرحله‌ای (Single Trigger)' | 'دو‌مرحله‌ای (Double Trigger)' | 'بدون تسریع';
  ipAssignmentSigned: boolean;
  nonCompetePeriodMonths: number;
}

export interface SoftwareLicenseModel {
  id: string;
  nameFa: string;
  nameEn: string;
  category: 'SaaS Cloud' | 'On-Premise Enterprise' | 'White-Label OEM' | 'Open Source Hybrid';
  slaUptimeGuarantee: string;
  dataSovereignty: string;
  ipWarrantyAndIndemnification: string;
  auditRights: string;
  terminationExitStrategy: string;
}

// ==========================================
// Phase 10 Types: Cybercrime, Digital Forensics & Electronic Evidence (E-Evidence)
// ==========================================

export type CybercrimeCategory =
  | 'کلاهبرداری و فیشینگ رایانه‌ای (ماده ۱۳ قانون جرایم رایانه‌ای)'
  | 'دسترسی غیرمجاز و هک سامانه‌ها (ماده ۱ قانون جرایم رایانه‌ای)'
  | 'سرقت داده‌ها و افشای اسرار تجاری (ماده ۱۷ قانون تجارت الکترونیک)'
  | 'هتک حیثیت، افترا و جعل اسناد دیجیتال (ماده ۱۶ قانون جرایم رایانه‌ای)'
  | 'تخریب، اخلال در داده‌ها و حملات DDoS (ماده ۸ تا ۱۰)'
  | 'تراکنش‌های رمزارزی مشکوک و پولشویی دیجیتال';

export interface DigitalEvidenceItem {
  id: string;
  title: string;
  evidenceType: 'چت و اسکرین‌شات پیام‌رسان‌ها' | 'لاگ سرور و آدرس IP' | 'تراکنش بلاک‌چین (TXID)' | 'ایمیل و هدر پروتکل SMTP' | 'صوت ضبط‌شده و فراداده EXIF';
  custodyStatus: 'تأیید اصالت اولیه' | 'پلمب دیجیتال و هش‌گذاری' | 'گواهی تأمین دلیل کارشناس رسمی' | 'مورد استناد در دادسرا و فتا';
  sha256Checksum: string;
  extractionTimestamp: string;
  collectorName: string;
  cyberPoliceFataRegistered: boolean;
  legalAdmissibilityScore: number; // 0-100 درصد اعتبار در دادگاه
  statutoryBasis: string;
  chainOfCustodyNotes: string;
}

export interface CybercrimePenaltyRule {
  id: string;
  crimeTitle: string;
  articleReference: string; // ماده قانونی
  prisonSentence: string; // حبس قانونی
  monetaryFine: string; // جزای نقدی تعدیل‌شده
  civilCompensation: string; // رد مال و جبران خسارت
  investigativeSteps: string[];
  lawyerDefenseAdvice: string;
}

export interface SmartContractAuditRule {
  id: string;
  protocolName: string;
  network: 'Ethereum' | 'Tron' | 'BNB Chain' | 'Polygon';
  vulnerabilityType: 'Reentrancy' | 'Front-running / MEV' | 'Access Control Bypass' | 'Integer Overflow / Oracle Manipulation';
  financialRiskLevel: 'بحرانی (Critical)' | 'بالا (High)' | 'متوسط (Medium)';
  legalLiabilityHolder: 'توسعه‌دهنده قرارداد هوشمند' | 'صاحبان کلید خصوصی چندامضایی' | 'پلتفرم صرافی / بریج';
  mitigationAction: string;
}

// ==========================================
// Phase 11 Types: Anti-Money Laundering (AML), KYC/KYT Compliance,
// Sanctions Due Diligence & Financial Crime Defense
// ==========================================

export type AMLRiskScoreLevel = 'کم‌ریسک (Low Risk)' | 'ریسک متوسط (Medium Risk)' | 'پرخطر (High Risk)' | 'غیرمجاز / لیست سیاه (Blacklisted)';

export interface AMLSanctionListEntity {
  id: string;
  nameFa: string;
  nameEn: string;
  entityType: 'اشخاص حقیقی (Individual)' | 'نهادها و شرکت‌ها (Corporate)' | 'موسسات مالی / صرافی' | 'آدرس‌های والت رمزارزی';
  sanctionSource: 'FATF High-Risk Jurisdictions' | 'شورای امنیت سازمان ملل (UNSC)' | 'OFAC SDN' | 'مرکز اطلاعات مالی ایران (FIU)';
  riskLevel: AMLRiskScoreLevel;
  statutoryBasis: string;
  complianceDirective: string;
}

export interface SuspiciousActivityRule {
  id: string;
  indicatorTitleFa: string;
  category: 'تراکنش‌های بانکی شتابی / پایا' | 'تراکنش‌های کریپتو و میکسرها' | 'معاملات املاک و مستغلات' | 'صادرات، واردات و صرافی‌ها';
  thresholdCriteria: string;
  legalArticle: string;
  reportingRequirement: string;
  lawyerAdvisory: string;
}

export interface PEPDueDiligenceCheck {
  id: string;
  roleCategory: 'مقامات ارشد دولتی' | 'مدیران شرکت‌های دولتی و خصولتی' | 'اعضای هیأت‌مدیره بانک‌ها' | 'بستگان درجه یک و وابستگان نزدیک (RCA)';
  dueDiligenceLevel: 'شناسایی معمول (CDD)' | 'شناسایی مضاعف تشدیدیافته (EDD)' | 'ممنوعیت کامل معامله';
  sourceOfFundsVerification: string;
  monitoringFrequency: string;
  complianceChecklist: string[];
}


