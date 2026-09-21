import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Share2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  Percent,
  Search,
  Filter,
  Eye,
  Send,
  Plus,
  ArrowRight,
  Sparkles,
  Download,
  Building2,
  MapPin,
  Award,
  BookOpen,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Scale,
  Check,
  X,
  Play,
  Pause,
  RotateCcw,
  Stamp,
  MessageSquare
} from 'lucide-react';
import { ATTORNEY_INFO } from '../../data/mockData';

// Associate Lawyer Interface
export interface AssociateLawyer {
  id: string;
  name: string;
  avatar: string;
  licenseNumber: string;
  barAssociation: string;
  city: string;
  rank: 'پایه یک دادگستری' | 'کارآموز وکالت' | 'مشاور عالی قضایی' | 'داور رسمی کانون';
  specialties: string[];
  activeCases: number;
  maxCapacity: number;
  completedCases: number;
  winRate: number;
  clientRating: number;
  hourlyRateToman: number;
  status: 'available' | 'busy' | 'on_leave';
  referralFeeShare: number; // percentage e.g. 40%
  email: string;
  phone: string;
}

// Case Referral Record
export interface CaseReferralRecord {
  id: string;
  caseCode: string;
  title: string;
  clientName: string;
  clientPhone: string;
  category: string;
  courtBranch: string;
  city: string;
  assignedLawyerId: string;
  assignedLawyerName: string;
  status: 'draft' | 'offered' | 'accepted' | 'contract_signed' | 'active_trial' | 'closed';
  totalFeeToman: number;
  seniorSupervisorShare: number; // percentage (e.g. 25%)
  leadLawyerShare: number; // percentage (e.g. 50%)
  referralAgentShare: number; // percentage (e.g. 15%)
  officeFundShare: number; // percentage (e.g. 10%)
  taxDeductionMoadian: number; // 5% Art. 103
  supportFundDeduction: number; // 4%
  cooperationFundDeduction: number; // 1%
  referralDate: string;
  acceptanceDeadlineHours: number;
  notes: string;
}

// Billable Time Entry
export interface BillableTimeEntry {
  id: string;
  lawyerId: string;
  lawyerName: string;
  caseCode: string;
  activityType: 'مطالعه پرونده' | 'تنظیم لایحه دفاعیه' | 'حضور در جلسه دادرسی' | 'مشاوره حضوری موکل' | 'مذاکره و سازش خارج از دادگاه';
  durationMinutes: number;
  hourlyRate: number;
  totalCostToman: number;
  date: string;
  supervisorApproved: boolean;
  billedToClient: boolean;
  description: string;
}

// Pleading Intern Draft
export interface InternDraftRecord {
  id: string;
  caseCode: string;
  caseTitle: string;
  internName: string;
  internLicense: string;
  pleadingType: 'لایحه تجدیدنظرخواهی' | 'دادخواست بدوی' | 'لایحه پاسخ به دعوی' | 'اعتراض به قرار کارشناسی' | 'شکواییه کیفری';
  submissionDate: string;
  status: 'pending_review' | 'needs_revision' | 'approved_signed';
  supervisorNotes: string;
  legalArticlesApplied: string[];
  contentSummary: string;
}

export const LegalAssociateReferralSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<
    'associates_roster' | 'smart_dispatch' | 'fee_splitting' | 'billable_timesheet' | 'supervision_vault'
  >('associates_roster');

  // Search & Filters for associates
  const [searchAssociate, setSearchAssociate] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [filterRank, setFilterRank] = useState('all');

  // Associates List
  const [associates, setAssociates] = useState<AssociateLawyer[]>([
    {
      id: 'law-1',
      name: 'دکتر علیرضا رستمی',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      licenseNumber: '۱۲۸۴۹ / کانون مرکز',
      barAssociation: 'کانون وکلای دادگستری مرکز (تهران)',
      city: 'تهران',
      rank: 'پایه یک دادگستری',
      specialties: ['دعاوی تجاری و شرکت‌ها', 'داوری اتاق بازرگانی', 'قراردادهای پیمانکاری'],
      activeCases: 6,
      maxCapacity: 10,
      completedCases: 48,
      winRate: 92,
      clientRating: 4.9,
      hourlyRateToman: 4500000,
      status: 'available',
      referralFeeShare: 45,
      email: 'a.rostami@sedrazavi.com',
      phone: '۰۹۱۲۱۱۱۴۴۵۵'
    },
    {
      id: 'law-2',
      name: 'سرکار خانم وکیل نسترن صابری',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      licenseNumber: '۱۵۹۲۰ / کانون خراسان',
      barAssociation: 'کانون وکلای دادگستری خراسان',
      city: 'مشهد',
      rank: 'پایه یک دادگستری',
      specialties: ['دعاوی ملکی و ثبتی', 'کمیسیون ماده ۱۰۰', 'امور ارث و ترکه'],
      activeCases: 8,
      maxCapacity: 10,
      completedCases: 62,
      winRate: 89,
      clientRating: 4.8,
      hourlyRateToman: 3800000,
      status: 'available',
      referralFeeShare: 50,
      email: 'n.saberi@sedrazavi.com',
      phone: '۰۹۱۵۳۳۳۷۷۸۸'
    },
    {
      id: 'law-3',
      name: 'جناب وکیل محمدرضا هدایتی',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      licenseNumber: '۱۸۴۴۰ / کانون اصفهان',
      barAssociation: 'کانون وکلای دادگستری اصفهان',
      city: 'اصفهان',
      rank: 'پایه یک دادگستری',
      specialties: ['جرایم اقتصادی و تعزیرات', 'دعاوی مالیاتی و مودیان', 'بورس و ارز'],
      activeCases: 7,
      maxCapacity: 8,
      completedCases: 39,
      winRate: 94,
      clientRating: 4.95,
      hourlyRateToman: 5000000,
      status: 'busy',
      referralFeeShare: 50,
      email: 'm.hedayati@sedrazavi.com',
      phone: '۰۹۱۳۲۲۲۹۹۰۰'
    },
    {
      id: 'law-4',
      name: 'پرهام شمسایی (کارآموز وکالت)',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
      licenseNumber: '۲۹۱۰۵ / کارآموز کانون مرکز',
      barAssociation: 'کانون وکلای دادگستری مرکز',
      city: 'تهران',
      rank: 'کارآموز وکالت',
      specialties: ['پژوهش فقهی و حقوقی', 'تنظیم لوایح مقدماتی', 'روابط کار و تامین اجتماعی'],
      activeCases: 3,
      maxCapacity: 5,
      completedCases: 14,
      winRate: 85,
      clientRating: 4.7,
      hourlyRateToman: 2000000,
      status: 'available',
      referralFeeShare: 30,
      email: 'p.shams@sedrazavi.com',
      phone: '۰۹۳۵۴۴۴۱۱۲۲'
    },
    {
      id: 'law-5',
      name: 'دکتر حمیدرضا فرهمند',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      licenseNumber: 'DIAC-908 / کانون بین‌المللی دبی',
      barAssociation: 'مرکز داوری بین‌المللی دبی (DIAC) و کانون مرکز',
      city: 'دبی',
      rank: 'داور رسمی کانون',
      specialties: ['حقوق گمرکی و ترانزیت', 'داوری سرمایه‌گذاری خارجی', 'حقوق دریایی و فورواردری'],
      activeCases: 4,
      maxCapacity: 6,
      completedCases: 55,
      winRate: 96,
      clientRating: 5.0,
      hourlyRateToman: 9500000,
      status: 'available',
      referralFeeShare: 60,
      email: 'h.farahmand@sedrazavi.com',
      phone: '+971501234567'
    }
  ]);

  // Referrals List
  const [referrals, setReferrals] = useState<CaseReferralRecord[]>([
    {
      id: 'ref-101',
      caseCode: 'SR-1403-882',
      title: 'دعوای الزام به تحویل مبیع و اخذ پایان‌کار مجتمع تجاری اطلس',
      clientName: 'شرکت سرمایه‌گذاری پارس مهر',
      clientPhone: '۰۹۱۲۲۲۲۳۳۴۴',
      category: 'املاک و سرقفلی',
      courtBranch: 'شعبه ۱۸ دادگاه عمومی حقوقی تهران',
      city: 'تهران',
      assignedLawyerId: 'law-1',
      assignedLawyerName: 'دکتر علیرضا رستمی',
      status: 'active_trial',
      totalFeeToman: 350000000,
      seniorSupervisorShare: 25,
      leadLawyerShare: 50,
      referralAgentShare: 15,
      officeFundShare: 10,
      taxDeductionMoadian: 17500000,
      supportFundDeduction: 14000000,
      cooperationFundDeduction: 3500000,
      referralDate: '۱۴۰۳/۰۶/۱۵',
      acceptanceDeadlineHours: 48,
      notes: 'پرونده دارای گزارش کارشناسی ۳ نفره با فوریت توقیف عملیات ساختمانی است.'
    },
    {
      id: 'ref-102',
      caseCode: 'SR-1403-914',
      title: 'دفاع در پرونده اتهام اخلال در نظام اقتصادی و قاچاق ارز صادراتی',
      clientName: 'بازرگانی کیمیا گستر مشهد',
      clientPhone: '۰۹۱۵۱۱۱۹۹۸۸',
      category: 'جرایم اقتصادی',
      courtBranch: 'شعبه ۲ دادگاه انقلاب اسلامی مشهد',
      city: 'مشهد',
      assignedLawyerId: 'law-3',
      assignedLawyerName: 'جناب وکیل محمدرضا هدایتی',
      status: 'contract_signed',
      totalFeeToman: 600000000,
      seniorSupervisorShare: 30,
      leadLawyerShare: 45,
      referralAgentShare: 15,
      officeFundShare: 10,
      taxDeductionMoadian: 30000000,
      supportFundDeduction: 24000000,
      cooperationFundDeduction: 6000000,
      referralDate: '۱۴۰۳/۰۶/۲۲',
      acceptanceDeadlineHours: 24,
      notes: 'نیازمند استعلام از سامانه نیما و تسویه ارزی بانک مرکزی.'
    },
    {
      id: 'ref-103',
      caseCode: 'SR-1403-930',
      title: 'حل اختلاف قراردادی خرید تجهیزات پالایشگاهی بر اساس قواعد ICC',
      clientName: 'کنسرسیوم پترو آریا کیش',
      clientPhone: '۰۹۱۲۸۸۸۴۴۱۱',
      category: 'داوری بین‌المللی',
      courtBranch: 'اتاق بازرگانی بین‌المللی (شعبه دبی)',
      city: 'دبی',
      assignedLawyerId: 'law-5',
      assignedLawyerName: 'دکتر حمیدرضا فرهمند',
      status: 'offered',
      totalFeeToman: 1200000000,
      seniorSupervisorShare: 35,
      leadLawyerShare: 45,
      referralAgentShare: 10,
      officeFundShare: 10,
      taxDeductionMoadian: 60000000,
      supportFundDeduction: 48000000,
      cooperationFundDeduction: 12000000,
      referralDate: '۱۴۰۳/۰۷/۰۱',
      acceptanceDeadlineHours: 48,
      notes: 'زبان رسیدگی انگلیسی بوده و مشمول قواعد اینکوترمز ۲۰۲۰ می‌باشد.'
    }
  ]);

  // Live Dispatch Modal State
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [dispatchTitle, setDispatchTitle] = useState('');
  const [dispatchClient, setDispatchClient] = useState('');
  const [dispatchPhone, setDispatchPhone] = useState('');
  const [dispatchCategory, setDispatchCategory] = useState('املاک و سرقفلی');
  const [dispatchCity, setDispatchCity] = useState('تهران');
  const [dispatchFee, setDispatchFee] = useState(250000000);
  const [selectedLawyerIdForDispatch, setSelectedLawyerIdForDispatch] = useState('law-1');

  // Timesheet Entries
  const [timesheetEntries, setTimesheetEntries] = useState<BillableTimeEntry[]>([
    {
      id: 'time-1',
      lawyerId: 'law-1',
      lawyerName: 'دکتر علیرضا رستمی',
      caseCode: 'SR-1403-882',
      activityType: 'تنظیم لایحه دفاعیه',
      durationMinutes: 180,
      hourlyRate: 4500000,
      totalCostToman: 13500000,
      date: '۱۴۰۳/۰۶/۲۸',
      supervisorApproved: true,
      billedToClient: true,
      description: 'تنظیم پاسخ به ادعای خسارت تاخیر تادیه سازنده و استناد به مواد ۲۲۱ و ۲۳۰ قانون مدنی'
    },
    {
      id: 'time-2',
      lawyerId: 'law-4',
      lawyerName: 'پرهام شمسایی (کارآموز)',
      caseCode: 'SR-1403-882',
      activityType: 'مطالعه پرونده',
      durationMinutes: 240,
      hourlyRate: 2000000,
      totalCostToman: 8000000,
      date: '۱۴۰۳/۰۶/۲۹',
      supervisorApproved: true,
      billedToClient: false,
      description: 'فیش‌برداری از سوابق ثبتی پلاک فرعی ۴۴۰/۱۲ و استخراج نظریات مشورتی اداره حقوقی قوه قضاییه'
    },
    {
      id: 'time-3',
      lawyerId: 'law-3',
      lawyerName: 'جناب وکیل محمدرضا هدایتی',
      caseCode: 'SR-1403-914',
      activityType: 'حضور در جلسه دادرسی',
      durationMinutes: 150,
      hourlyRate: 5000000,
      totalCostToman: 12500000,
      date: '۱۴۰۳/۰۷/۰۱',
      supervisorApproved: false,
      billedToClient: false,
      description: 'شرکت در جلسه بازپرسی شعبه ۵ دادسرای جرایم اقتصادی و استماع دفاعیات متهم ردیف دوم'
    }
  ]);

  // Live Timer State
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activeTimerCase, setActiveTimerCase] = useState('SR-1403-882');
  const [activeTimerActivity, setActiveTimerActivity] = useState<BillableTimeEntry['activityType']>('مطالعه پرونده');

  React.useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!timerRunning && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTimer = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStopAndSaveTimer = () => {
    setTimerRunning(false);
    if (timerSeconds < 60) {
      alert('مدت زمان ثبت شده کمتر از ۱ دقیقه است.');
      setTimerSeconds(0);
      return;
    }
    const minutes = Math.ceil(timerSeconds / 60);
    const hourlyRate = 3500000;
    const totalCost = Math.round((minutes / 60) * hourlyRate);

    const newEntry: BillableTimeEntry = {
      id: `time-${Date.now()}`,
      lawyerId: 'law-current',
      lawyerName: 'دکتر سیده مریم رضوی (سرپرست)',
      caseCode: activeTimerCase,
      activityType: activeTimerActivity,
      durationMinutes: minutes,
      hourlyRate,
      totalCostToman: totalCost,
      date: '۱۴۰۳/۰۷/۰۲',
      supervisorApproved: true,
      billedToClient: false,
      description: `ثبت زنده فعالیت کارکرد توسط تایمر حقوقی - مدت: ${minutes} دقیقه`
    };

    setTimesheetEntries([newEntry, ...timesheetEntries]);
    setTimerSeconds(0);
    alert('کارکرد زمانی با موفقیت به تایم‌شیت پرونده الصاق شد.');
  };

  // Intern Draft Records
  const [draftRecords, setDraftRecords] = useState<InternDraftRecord[]>([
    {
      id: 'draft-1',
      caseCode: 'SR-1403-882',
      caseTitle: 'دعوای الزام به تحویل مبیع و خسارت تاخیر مجتمع اطلس',
      internName: 'پرهام شمسایی',
      internLicense: '۲۹۱۰۵ / کارآموز',
      pleadingType: 'لایحه پاسخ به دعوی',
      submissionDate: '۱۴۰۳/۰۶/۳۰',
      status: 'pending_review',
      supervisorNotes: '',
      legalArticlesApplied: ['ماده ۲۲۰ قانون مدنی', 'ماده ۲۲۱ قانون مدنی', 'ماده ۵۱۵ قانون آیین دادرسی مدنی'],
      contentSummary: 'پاسخ به ادعای فورس‌ماژور خوانده به دلیل نوسانات نرخ مصالح ساختمانی و اثبات عدم انطباق آن با ارکان قوه قاهره'
    },
    {
      id: 'draft-2',
      caseCode: 'SR-1403-914',
      caseTitle: 'پرونده تعزیرات حکومتی و قاچاق کالا',
      internName: 'سارا امینی',
      internLicense: '۳۱۰۹۲ / کارآموز',
      pleadingType: 'لایحه تجدیدنظرخواهی',
      submissionDate: '۱۴۰۳/۰۶/۲۵',
      status: 'approved_signed',
      supervisorNotes: 'لایحه با اعمال اصلاحات بند سوم و تاکید بر تبصره ۲ ماده ۴۷ قانون مبارزه با قاچاق ممهور گردید.',
      legalArticlesApplied: ['ماده ۱۸ قانون مبارزه با قاچاق کالا و ارز', 'بند ب ماده ۱۲ قانون تعزیرات'],
      contentSummary: 'اعتراض به رای بدوی تعزیرات مبنی بر عدم انطباق برگ سبز گمرکی با تناژ ترخیص‌شده'
    }
  ]);

  // Selected Draft for Review
  const [reviewingDraft, setReviewingDraft] = useState<InternDraftRecord | null>(null);
  const [supervisorCommentInput, setSupervisorCommentInput] = useState('');

  const handleApproveDraft = (draftId: string) => {
    setDraftRecords((prev) =>
      prev.map((d) =>
        d.id === draftId
          ? {
              ...d,
              status: 'approved_signed',
              supervisorNotes: supervisorCommentInput || 'مورد تایید وکیل سرپرست (دکتر سیده مریم رضوی) جهت ثبت در سامانه خودکاربری عدل‌ایران قرار گرفت.'
            }
          : d
      )
    );
    setReviewingDraft(null);
    setSupervisorCommentInput('');
  };

  const handleRequestRevision = (draftId: string) => {
    if (!supervisorCommentInput) {
      alert('لطفاً نکات اصلاحی و موارد نقص لایحه را قید فرمایید.');
      return;
    }
    setDraftRecords((prev) =>
      prev.map((d) =>
        d.id === draftId
          ? {
              ...d,
              status: 'needs_revision',
              supervisorNotes: supervisorCommentInput
            }
          : d
      )
    );
    setReviewingDraft(null);
    setSupervisorCommentInput('');
  };

  // Fee Calculator Simulator State
  const [calcTotalFee, setCalcTotalFee] = useState<number>(500000000);
  const [calcSupervisorPercent, setCalcSupervisorPercent] = useState<number>(30);
  const [calcLeadPercent, setCalcLeadPercent] = useState<number>(45);
  const [calcReferralAgentPercent, setCalcReferralAgentPercent] = useState<number>(15);
  const [calcFundPercent, setCalcFundPercent] = useState<number>(10);

  // Legal Deductions Calculation
  const legalTax103 = Math.round(calcTotalFee * 0.05); // 5%
  const legalSupportFund = Math.round(calcTotalFee * 0.04); // 4%
  const legalCoopFund = Math.round(calcTotalFee * 0.01); // 1%
  const totalDeductions = legalTax103 + legalSupportFund + legalCoopFund; // 10%
  const netDistributable = calcTotalFee - totalDeductions;

  const supervisorNet = Math.round((netDistributable * calcSupervisorPercent) / 100);
  const leadNet = Math.round((netDistributable * calcLeadPercent) / 100);
  const referralAgentNet = Math.round((netDistributable * calcReferralAgentPercent) / 100);
  const officeFundNet = Math.round((netDistributable * calcFundPercent) / 100);

  // Filtered Associates
  const filteredAssociates = associates.filter((a) => {
    const matchSearch = a.name.includes(searchAssociate) || a.specialties.some((s) => s.includes(searchAssociate));
    const matchCity = filterCity === 'all' || a.city === filterCity;
    const matchRank = filterRank === 'all' || a.rank === filterRank;
    return matchSearch && matchCity && matchRank;
  });

  const handleCreateDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedLaw = associates.find((a) => a.id === selectedLawyerIdForDispatch);
    if (!assignedLaw) return;

    const newRef: CaseReferralRecord = {
      id: `ref-${Date.now()}`,
      caseCode: `SR-1403-${Math.floor(100 + Math.random() * 900)}`,
      title: dispatchTitle,
      clientName: dispatchClient,
      clientPhone: dispatchPhone,
      category: dispatchCategory,
      courtBranch: `شعبه دادگاه عمومی ${dispatchCity}`,
      city: dispatchCity,
      assignedLawyerId: assignedLaw.id,
      assignedLawyerName: assignedLaw.name,
      status: 'offered',
      totalFeeToman: Number(dispatchFee),
      seniorSupervisorShare: 30,
      leadLawyerShare: assignedLaw.referralFeeShare,
      referralAgentShare: 15,
      officeFundShare: 10,
      taxDeductionMoadian: Math.round(Number(dispatchFee) * 0.05),
      supportFundDeduction: Math.round(Number(dispatchFee) * 0.04),
      cooperationFundDeduction: Math.round(Number(dispatchFee) * 0.01),
      referralDate: '۱۴۰۳/۰۷/۰۲',
      acceptanceDeadlineHours: 48,
      notes: 'ارجاع جدید ثبت شده توسط سیستم هوشمند دیسپچ دفتر وکالت.'
    };

    setReferrals([newRef, ...referrals]);
    setIsDispatchModalOpen(false);
    setDispatchTitle('');
    setDispatchClient('');
    setDispatchPhone('');
    alert(`پرونده با موفقیت به ${assignedLaw.name} ارجاع داده شد.`);
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 font-sans pb-24 selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]" dir="rtl">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-[#0B152F] border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-amber-600 flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
              <Users className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                  فاز ۳۳ تخصصی
                </span>
                <span className="text-xs text-slate-400">سامانه شبکه همکاران و وکلای کانون</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white font-serif">
                شبکه وکلای همکار، ارجاع هوشمند پرونده و تقسیم حق‌الوکاله
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>داشبورد وکالت</span>
              </button>
            )}
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2f] text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/10"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                <span>بازگشت به سایت اصلی</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 py-2 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActiveTab('associates_roster')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'associates_roster'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>فهرست وکلای همکار و کارآموزان</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/40">{associates.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('smart_dispatch')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'smart_dispatch'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>موتور دیسپچ و ارجاع پرونده</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/40">{referrals.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('fee_splitting')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'fee_splitting'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Percent className="w-4 h-4" />
            <span>فرمولاسیون تقسیم حق‌الوکاله و کسورات ماده ۱۰۳</span>
          </button>

          <button
            onClick={() => setActiveTab('billable_timesheet')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'billable_timesheet'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>تایم‌شیت زنده و ساعات کار حقوقی</span>
            {timerRunning && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('supervision_vault')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'supervision_vault'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Stamp className="w-4 h-4" />
            <span>کارتابل نظارت بر لوایح کارآموزان</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300">
              {draftRecords.filter((d) => d.status === 'pending_review').length} در انتظار
            </span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">وکلای همکار فعال</span>
              <Users className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              {associates.length} <span className="text-xs font-normal text-slate-400">وکیل و کارآموز</span>
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>پوشش ۴ کانون استانی و بین‌المللی</span>
            </div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">پرونده‌های ارجاع‌شده</span>
              <Share2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              {referrals.length} <span className="text-xs font-normal text-slate-400">پرونده در جریان</span>
            </div>
            <div className="text-[11px] text-cyan-400 flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" />
              <span>میانگین پاسخ به ارجاع: ۱۸ ساعت</span>
            </div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">ارزش کل حق‌الوکاله‌ها</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۲,۱۵۰ <span className="text-xs font-normal text-slate-400">میلیون تومان</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
              <span>کسورات صندوق و ماده ۱۰۳: ۲۱۵ میلیون</span>
            </div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">ساعات ثبت‌شده ماه</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۴۸.۵ <span className="text-xs font-normal text-slate-400">ساعت کارشناسی</span>
            </div>
            <div className="text-[11px] text-purple-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>نرخ پذیرش در تایم‌شیت: ۹۶٪</span>
            </div>
          </div>
        </div>

        {/* TAB 1: Associates Roster */}
        {activeTab === 'associates_roster' && (
          <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchAssociate}
                    onChange={(e) => setSearchAssociate(e.target.value)}
                    placeholder="جستجوی نام وکیل، تخصص، کانون..."
                    className="pl-4 pr-9 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] w-64"
                  />
                </div>

                <select
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="all">همه حوزه‌ها / شهرها</option>
                  <option value="تهران">تهران (مرکز)</option>
                  <option value="مشهد">مشهد (خراسان)</option>
                  <option value="اصفهان">اصفهان</option>
                  <option value="دبی">دبی (امارات / DIAC)</option>
                </select>

                <select
                  value={filterRank}
                  onChange={(e) => setFilterRank(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="all">همه درجات وکالت</option>
                  <option value="پایه یک دادگستری">پایه یک دادگستری</option>
                  <option value="کارآموز وکالت">کارآموز وکالت</option>
                  <option value="داور رسمی کانون">داور رسمی کانون</option>
                </select>
              </div>

              <button
                onClick={() => setIsDispatchModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-[#c49f2f] hover:to-amber-700 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>ارجاع پرونده جدید به همکاران</span>
              </button>
            </div>

            {/* Associates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssociates.map((lawyer) => {
                const capacityPercent = Math.round((lawyer.activeCases / lawyer.maxCapacity) * 100);
                return (
                  <div
                    key={lawyer.id}
                    className="bg-[#0B152F] border border-slate-800/80 hover:border-[#D4AF37]/50 rounded-2xl p-5 transition-all space-y-4 relative group hover:shadow-xl hover:shadow-[#D4AF37]/5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={lawyer.avatar}
                          alt={lawyer.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-[#D4AF37] transition-colors">
                            {lawyer.name}
                          </h3>
                          <p className="text-xs text-[#D4AF37] font-medium">{lawyer.rank}</p>
                          <p className="text-[11px] text-slate-400">{lawyer.licenseNumber}</p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          lawyer.status === 'available'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : lawyer.status === 'busy'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {lawyer.status === 'available' ? 'آماده پذیرش' : lawyer.status === 'busy' ? 'تکمیل ظرفیت' : 'مرخصی'}
                      </span>
                    </div>

                    {/* Specialties Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {lawyer.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-800"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Stats & Capacity */}
                    <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/60 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">ظرفیت پذیرش پرونده:</span>
                        <span className="text-white font-mono font-bold">
                          {lawyer.activeCases} از {lawyer.maxCapacity} پرونده
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            capacityPercent > 80 ? 'bg-rose-500' : capacityPercent > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${capacityPercent}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-center text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">موفقیت</span>
                          <span className="font-bold text-emerald-400">{lawyer.winRate}٪</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">رضایت</span>
                          <span className="font-bold text-[#D4AF37]">★ {lawyer.clientRating}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">سهم ارجاع</span>
                          <span className="font-bold text-white">{lawyer.referralFeeShare}٪</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer / Action */}
                    <div className="flex items-center justify-between pt-2 text-xs border-t border-slate-800/60">
                      <div className="text-slate-400 text-[11px]">
                        <span>نرخ ساعتی: </span>
                        <span className="text-slate-200 font-mono font-bold">
                          {(lawyer.hourlyRateToman / 1000).toLocaleString()} هزار تومان
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedLawyerIdForDispatch(lawyer.id);
                          setIsDispatchModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-slate-950 border border-[#D4AF37]/30 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>ارجاع پرونده</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Smart Dispatch & Referrals */}
        {activeTab === 'smart_dispatch' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <Share2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>چرخه حیات ارجاع پرونده‌ها (Case Referral Lifecycle)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  مدیریت دعوتنامه‌های ارجاع به وکلای متخصص، تایید مهلت پاسخ، انعقاد قرارداد مشترک وکالت.
                </p>
              </div>

              <button
                onClick={() => setIsDispatchModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2f] text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>ثبت ارجاع جدید</span>
              </button>
            </div>

            {/* Referrals Table */}
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead className="bg-slate-900/80 text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">کد و عنوان پرونده</th>
                      <th className="py-3 px-4">موکل / متقاضی</th>
                      <th className="py-3 px-4">وکیل منتخب</th>
                      <th className="py-3 px-4">مبلغ حق‌الوکاله</th>
                      <th className="py-3 px-4">وضعیت دیسپچ</th>
                      <th className="py-3 px-4">تسهیم درصد</th>
                      <th className="py-3 px-4 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {referrals.map((ref) => (
                      <tr key={ref.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-xs">{ref.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {ref.caseCode} | {ref.category} | {ref.courtBranch}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-200">{ref.clientName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{ref.clientPhone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-[#D4AF37] font-medium">{ref.assignedLawyerName}</div>
                          <div className="text-[10px] text-slate-400">حوزه {ref.city}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          {(ref.totalFeeToman / 1000000).toLocaleString()} م.تومان
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              ref.status === 'active_trial'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : ref.status === 'contract_signed'
                                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                                : ref.status === 'offered'
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : 'bg-slate-500/10 text-slate-400 border-slate-500/30'
                            }`}
                          >
                            {ref.status === 'active_trial'
                              ? 'جریان دادرسی'
                              : ref.status === 'contract_signed'
                              ? 'قرارداد امضا شده'
                              : ref.status === 'offered'
                              ? 'در انتظار تایید وکیل'
                              : 'پیش‌نویس'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-mono">
                          <div className="text-slate-300">
                            پیگیری: {ref.leadLawyerShare}٪ | سرپرست: {ref.seniorSupervisorShare}٪
                          </div>
                          <div className="text-[10px] text-slate-500">
                            معرف: {ref.referralAgentShare}٪ | صندوق: {ref.officeFundShare}٪
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => {
                              alert(`پرونده: ${ref.title}\n\nیادداشت دیسپچ: ${ref.notes}\n\nکسورات قانونی:\n- ماده ۱۰۳ (۵٪): ${(ref.taxDeductionMoadian / 1000).toLocaleString()} هزار تومان\n- صندوق حمایت (۴٪): ${(ref.supportFundDeduction / 1000).toLocaleString()} هزار تومان\n- صندوق تعاون (۱٪): ${(ref.cooperationFundDeduction / 1000).toLocaleString()} هزار تومان`);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                          >
                            مشاهده جزئیات
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Fee Splitting & Tax Deductions */}
        {activeTab === 'fee_splitting' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <Percent className="w-5 h-5 text-[#D4AF37]" />
                  <span>ماشین حساب و فرمولاسیون تقسیم حق‌الوکاله و کسر قانونی ماده ۱۰۳</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  محاسبه آنلاین سهم وکیل سرپرست، وکیل پیگیری‌کننده، معرف، کسر ۵٪ مالیات علی‌الحساب ماده ۱۰۳ ق.م.م، ۴٪ صندوق حمایت و ۱٪ صندوق تعاون.
                </p>
              </div>

              {/* Interactive Simulator Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">مبلغ کل قرارداد حق‌الوکاله (تومان)</label>
                  <input
                    type="number"
                    value={calcTotalFee}
                    onChange={(e) => setCalcTotalFee(Number(e.target.value))}
                    step={10000000}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">سهم وکیل سرپرست (دکتر رضوی) ٪</label>
                  <input
                    type="number"
                    value={calcSupervisorPercent}
                    onChange={(e) => setCalcSupervisorPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">سهم وکیل پیگیری‌کننده ٪</label>
                  <input
                    type="number"
                    value={calcLeadPercent}
                    onChange={(e) => setCalcLeadPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">سهم وکیل معرف / ارجاع‌دهنده ٪</label>
                  <input
                    type="number"
                    value={calcReferralAgentPercent}
                    onChange={(e) => setCalcReferralAgentPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">سهم صندوق توسعه دفتر وکالت ٪</label>
                  <input
                    type="number"
                    value={calcFundPercent}
                    onChange={(e) => setCalcFundPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              {/* Statutory Deductions Section */}
              <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  <span>کسورات قانونی و تکلیفی کانون وکلا و سازمان امور مالیاتی (مجموع ۱۰٪)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[#0B152F] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">مالیات علی‌الحساب ماده ۱۰۳ ق.م.م (۵٪):</span>
                    <span className="font-mono font-bold text-rose-400 text-sm mt-1 block">
                      {legalTax103.toLocaleString()} تومان
                    </span>
                    <span className="text-[10px] text-slate-500">پرداخت به اداره امور مالیاتی</span>
                  </div>

                  <div className="bg-[#0B152F] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">صندوق حمایت وکلا و کارگشایان (۴٪):</span>
                    <span className="font-mono font-bold text-amber-400 text-sm mt-1 block">
                      {legalSupportFund.toLocaleString()} تومان
                    </span>
                    <span className="text-[10px] text-slate-500">واریز به حساب صندوق حمایت</span>
                  </div>

                  <div className="bg-[#0B152F] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">صندوق تعاون کانون وکلا (۱٪):</span>
                    <span className="font-mono font-bold text-cyan-400 text-sm mt-1 block">
                      {legalCoopFund.toLocaleString()} تومان
                    </span>
                    <span className="text-[10px] text-slate-500">ماده ۸ قانون تشکیل صندوق تعاون</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-slate-800 text-slate-300">
                  <span>مجموع کسورات قانونی:</span>
                  <span className="font-mono text-rose-400">{totalDeductions.toLocaleString()} تومان</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-emerald-400">
                  <span>خالص قابل تسهیم بین وکلای همکار:</span>
                  <span className="font-mono text-sm">{netDistributable.toLocaleString()} تومان</span>
                </div>
              </div>

              {/* Net Payout Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-[#D4AF37]/15 to-amber-900/20 border border-[#D4AF37]/40 rounded-xl p-4 text-center">
                  <span className="text-xs text-[#D4AF37] block font-bold">وکیل سرپرست (دکتر رضوی)</span>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {supervisorNet.toLocaleString()} تومان
                  </div>
                  <span className="text-[10px] text-slate-400">({calcSupervisorPercent}٪ از خالص)</span>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center">
                  <span className="text-xs text-slate-300 block font-bold">وکیل پیگیری‌کننده</span>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {leadNet.toLocaleString()} تومان
                  </div>
                  <span className="text-[10px] text-slate-400">({calcLeadPercent}٪ از خالص)</span>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center">
                  <span className="text-xs text-slate-300 block font-bold">وکیل معرف</span>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {referralAgentNet.toLocaleString()} تومان
                  </div>
                  <span className="text-[10px] text-slate-400">({calcReferralAgentPercent}٪ از خالص)</span>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center">
                  <span className="text-xs text-slate-300 block font-bold">صندوق توسعه دفتر</span>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {officeFundNet.toLocaleString()} تومان
                  </div>
                  <span className="text-[10px] text-slate-400">({calcFundPercent}٪ از خالص)</span>
                </div>
              </div>

              {/* Export Split Voucher Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => alert(`حواله تسویه مالی پرونده با فرمت رسمی صادر شد.\n\nمبلغ قرارداد: ${calcTotalFee.toLocaleString()} تومان\nکسورات قانونی: ${totalDeductions.toLocaleString()} تومان\nخالص تسویه سرپرست: ${supervisorNet.toLocaleString()} تومان\nخالص وکیل همکار: ${leadNet.toLocaleString()} تومان`)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-bold text-[#D4AF37] border border-[#D4AF37]/30 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>صدور حواله تسویه مالی و سند حسابداری داخلی</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Billable Timesheet & Live Timer */}
        {activeTab === 'billable_timesheet' && (
          <div className="space-y-6">
            {/* Live Stopwatch Component */}
            <div className="bg-gradient-to-r from-[#0B152F] via-[#111D3D] to-[#0B152F] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
                    <Clock className="w-3.5 h-3.5" />
                    تایمر زنده ساعات قابل فاکتور به موکل (Live Billable Stopwatch)
                  </span>
                  <h3 className="text-lg font-bold text-white font-serif">
                    رهگیری زمان واقعی مطالعه لایحه، جلسه دادرسی و مشاوره
                  </h3>
                  <p className="text-xs text-slate-400">
                    ثبت دقیق دقایق و ثانیه‌ها با محاسبه خودکار تعرفه ساعتی و تبدیل به پیش‌فاکتور رسمی.
                  </p>
                </div>

                {/* Digital Clock */}
                <div className="flex flex-col items-center gap-3">
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-widest bg-slate-950/80 px-6 py-3 rounded-2xl border border-slate-700 shadow-inner">
                    {formatTimer(timerSeconds)}
                  </div>
                  <div className="flex items-center gap-2">
                    {!timerRunning ? (
                      <button
                        onClick={() => setTimerRunning(true)}
                        className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>شروع تایمر</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setTimerRunning(false)}
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                      >
                        <Pause className="w-4 h-4 fill-current" />
                        <span>توقف موقت</span>
                      </button>
                    )}

                    <button
                      onClick={handleStopAndSaveTimer}
                      disabled={timerSeconds === 0}
                      className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2f] text-slate-950 font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>ثبت در تایم‌شیت</span>
                    </button>

                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setTimerSeconds(0);
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      title="صفر کردن"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Assignment Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-800/80">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">پرونده هدف جهت ثبت زمان:</label>
                  <select
                    value={activeTimerCase}
                    onChange={(e) => setActiveTimerCase(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-[#D4AF37] outline-none"
                  >
                    {referrals.map((r) => (
                      <option key={r.id} value={r.caseCode}>
                        {r.caseCode} - {r.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">نوع فعالیت حقوقی:</label>
                  <select
                    value={activeTimerActivity}
                    onChange={(e) => setActiveTimerActivity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-[#D4AF37] outline-none"
                  >
                    <option value="مطالعه پرونده">مطالعه پرونده و فیش‌برداری</option>
                    <option value="تنظیم لایحه دفاعیه">تنظیم لایحه دفاعیه / دادخواست</option>
                    <option value="حضور در جلسه دادرسی">حضور در جلسه دادرسی دادگاه</option>
                    <option value="مشاوره حضوری موکل">جلسه مشاوره تخصصی حضوری یا آنلاین</option>
                    <option value="مذاکره و سازش خارج از دادگاه">مذاکره و سازش حقوقی</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Timesheet Entries History */}
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <span>ریز کارکردهای ثبت‌شده وکلای همکار و کارآموزان</span>
                </h4>
                <span className="text-xs text-slate-400">
                  مجموع: {timesheetEntries.reduce((acc, curr) => acc + curr.durationMinutes, 0)} دقیقه
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">وکیل / کارشناس</th>
                      <th className="py-3 px-4">کد پرونده</th>
                      <th className="py-3 px-4">نوع فعالیت</th>
                      <th className="py-3 px-4">مدت زمان</th>
                      <th className="py-3 px-4">مبلغ کارکرد</th>
                      <th className="py-3 px-4">تایید سرپرست</th>
                      <th className="py-3 px-4">وضعیت صورتحساب</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {timesheetEntries.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 font-medium text-white">{item.lawyerName}</td>
                        <td className="py-3 px-4 font-mono text-slate-300">{item.caseCode}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 text-[11px]">
                            {item.activityType}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-200">
                          {item.durationMinutes} دقیقه
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-[#D4AF37]">
                          {(item.totalCostToman / 1000).toLocaleString()} هزار ت.
                        </td>
                        <td className="py-3 px-4">
                          {item.supervisorApproved ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              تایید شد
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                setTimesheetEntries((prev) =>
                                  prev.map((t) => (t.id === item.id ? { ...t, supervisorApproved: true } : t))
                                );
                              }}
                              className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-[10px] hover:bg-amber-500/30 transition-colors"
                            >
                              تایید سرپرست
                            </button>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full ${
                              item.billedToClient
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {item.billedToClient ? 'الصاق به فاکتور موکل' : 'در انتظار فاکتور'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Supervision & Intern Pleading Vault */}
        {activeTab === 'supervision_vault' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <Stamp className="w-4 h-4 text-[#D4AF37]" />
                  <span>کارتابل ممیزی و نظارت بر لوایح کارآموزان وکالت</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  طبق ضوابط کانون وکلا، ثبت لوایح تنظیمی کارآموزان منوط به بازبینی، اصلاح و الصاق مهر الکترونیک وکیل سرپرست است.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  مهر دیجیتال فعال: دکتر سیده مریم رضوی (پروانه ۹۸۴۲)
                </span>
              </div>
            </div>

            {/* Drafts List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {draftRecords.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-[#0B152F] border border-slate-800 hover:border-[#D4AF37]/40 rounded-2xl p-5 space-y-4 shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {draft.caseCode}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">{draft.caseTitle}</h4>
                      <p className="text-xs text-[#D4AF37] font-medium mt-0.5">
                        تنظیم‌کننده: {draft.internName} ({draft.internLicense})
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        draft.status === 'approved_signed'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : draft.status === 'needs_revision'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {draft.status === 'approved_signed'
                        ? 'تایید و ممهور شد'
                        : draft.status === 'needs_revision'
                        ? 'نیازمند اصلاح کارآموز'
                        : 'در انتظار تایید سرپرست'}
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="text-slate-300 leading-relaxed font-serif text-[13px]">
                      {draft.contentSummary}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {draft.legalArticlesApplied.map((art, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono"
                        >
                          {art}
                        </span>
                      ))}
                    </div>
                  </div>

                  {draft.supervisorNotes && (
                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200">
                      <span className="font-bold block text-amber-400 mb-1">دستور وکیل سرپرست:</span>
                      {draft.supervisorNotes}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-slate-500">تاریخ ارسال: {draft.submissionDate}</span>

                    {draft.status === 'pending_review' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setReviewingDraft(draft)}
                          className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c49f2f] text-slate-950 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Stamp className="w-3.5 h-3.5" />
                          <span>بررسی و اعمال مهر</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Review Modal */}
            {reviewingDraft && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#0B152F] border border-slate-700 rounded-3xl max-w-xl w-full p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Stamp className="w-4 h-4 text-[#D4AF37]" />
                      <span>بررسی و تایید لایحه کارآموز ({reviewingDraft.internName})</span>
                    </h3>
                    <button
                      onClick={() => setReviewingDraft(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block mb-1">موضوع لایحه:</span>
                      <span className="text-white font-bold">{reviewingDraft.caseTitle}</span>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        نکات بازخورد، اصلاح مواد قانونی یا تاییدیه وکیل سرپرست:
                      </label>
                      <textarea
                        rows={3}
                        value={supervisorCommentInput}
                        onChange={(e) => setSupervisorCommentInput(e.target.value)}
                        placeholder="نکات اصلاحی، ارجاع به آرای وحدت رویه جدید، یا تایید نهایی جهت ثبت در عدل‌ایران..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleRequestRevision(reviewingDraft.id)}
                      className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      بازگشت به کارآموز جهت اصلاح
                    </button>
                    <button
                      onClick={() => handleApproveDraft(reviewingDraft.id)}
                      className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2f] text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
                    >
                      <Stamp className="w-4 h-4" />
                      <span>تایید رسمی و الصاق مهر سرپرست</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dispatch Modal */}
      {isDispatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B152F] border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                <Share2 className="w-4 h-4 text-[#D4AF37]" />
                <span>ارجاع پرونده جدید به وکیل همکار</span>
              </h3>
              <button
                onClick={() => setIsDispatchModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDispatch} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">عنوان موضوع دعوی *</label>
                <input
                  type="text"
                  required
                  value={dispatchTitle}
                  onChange={(e) => setDispatchTitle(e.target.value)}
                  placeholder="مثال: مطالبه وجه التزام و ابطال رای داوری تجاری"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">نام موکل *</label>
                  <input
                    type="text"
                    required
                    value={dispatchClient}
                    onChange={(e) => setDispatchClient(e.target.value)}
                    placeholder="شخص حقیقی یا حقوقی"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">شماره همراه موکل</label>
                  <input
                    type="tel"
                    value={dispatchPhone}
                    onChange={(e) => setDispatchPhone(e.target.value)}
                    placeholder="۰۹۱۲..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">دسته‌بندی دعوی</label>
                  <select
                    value={dispatchCategory}
                    onChange={(e) => setDispatchCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  >
                    <option value="املاک و سرقفلی">املاک و سرقفلی</option>
                    <option value="جرایم اقتصادی">جرایم اقتصادی و تعزیرات</option>
                    <option value="داوری بین‌المللی">داوری بین‌المللی و بازرگانی</option>
                    <option value="دعاوی مالیاتی">دعاوی مالیاتی و مودیان</option>
                    <option value="روابط کارگری">روابط کارگری و تامین اجتماعی</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">شهر / حوزه قضایی</label>
                  <select
                    value={dispatchCity}
                    onChange={(e) => setDispatchCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  >
                    <option value="تهران">تهران (کانون مرکز)</option>
                    <option value="مشهد">مشهد (کانون خراسان)</option>
                    <option value="اصفهان">اصفهان</option>
                    <option value="دبی">دبی (DIAC / امارات)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">مبلغ برآوردی حق‌الوکاله (تومان)</label>
                  <input
                    type="number"
                    value={dispatchFee}
                    onChange={(e) => setDispatchFee(Number(e.target.value))}
                    step={10000000}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">ارجاع به وکیل همکار:</label>
                  <select
                    value={selectedLawyerIdForDispatch}
                    onChange={(e) => setSelectedLawyerIdForDispatch(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  >
                    {associates.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.city} - {a.rank})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsDispatchModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2f] text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-[#D4AF37]/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>تایید و ارسال دعوتنامه ارجاع</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
