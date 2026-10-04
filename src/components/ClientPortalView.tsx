import React, { useState, useEffect } from 'react';
import {
  User,
  ShieldCheck,
  Briefcase,
  FileText,
  Calendar,
  CreditCard,
  MessageSquare,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Send,
  Eye,
  Plus,
  Scale,
  PhoneCall,
  Search,
  Lock,
  ChevronRight,
  LogOut,
  MapPin,
  UserCheck,
  Share2,
  Save,
  Check,
  Phone
} from 'lucide-react';
import {
  ClientAccount,
  getStoredClientAccounts,
  updateClientAccount,
  normalizeIranPhone
} from '../utils/clientAccountsStorage';
import { ClientPortalQuickAccessWidget } from './ClientPortalQuickAccessWidget';
import { CaseInteractiveTimeline } from './timeline/CaseInteractiveTimeline';

interface ClientCase {
  id: string;
  caseNumber: string;
  courtBranch: string;
  judgeName: string;
  subject: string;
  type: string;
  progressPercentage: number;
  stage: string;
  lastUpdate: string;
  nextSessionDate: string;
  lawyerNotes: string;
  documents: { title: string; size: string; date: string; type: string }[];
  financials: {
    totalFee: string;
    paidAmount: string;
    remainingAmount: string;
    nextDue: string;
  };
}

const MOCK_CLIENT_CASES: ClientCase[] = [
  {
    id: 'c-01',
    caseNumber: '۱۴۰۳-۹۸۲۷۳-ونک',
    courtBranch: 'شعبه ۱۲ دادگاه عمومی حقوقی مجتمع قضایی شهید بهشتی تهران',
    judgeName: 'ریاست محترم شعبه: جناب آقای فلاحی',
    subject: 'الزام به تنظیم سند رسمی انتقال ملک و مطالبه وجه‌التزام خسارت تاخیر تادیه',
    type: 'دعاوی ملکی و ثبتی',
    progressPercentage: 75,
    stage: 'صدور قرار کارشناسی رسمی دادگستری و وصول نظریه هیئت ۳ نفره',
    lastUpdate: 'امروز ساعت ۱۰:۴۵ - لایحه اعتراضیه تکمیلی به دادگاه تسلیم شد.',
    nextSessionDate: 'سه‌شنبه ۱۵ مهر ۱۴۰۳ - ساعت ۰۹:۳۰ صبح',
    lawyerNotes: 'با بررسی مبایعه‌نامه و استعلام ثبتی، مالکیت خوانده احراز گردیده و تامین دلیل کارشناسی نیز به نفع موکل محترم ثبت گردید. شانس صدور دادنامه مثبت بالای ۹۰٪ برآورد می‌شود.',
    documents: [
      { title: 'دادخواست بدوی ثبت‌شده در سامانه عدل‌ایران', size: '۱.۴ MB', date: '۱۴۰۳/۰۳/۱۵', type: 'PDF' },
      { title: 'گواهی عدم حضور دفترخانه اسناد رسمی شماره ۱۸', size: '۸۵۰ KB', date: '۱۴۰۳/۰۴/۰۲', type: 'PDF' },
      { title: 'نظریه کارشناس رسمی امور ثبتی و ارزیابی ملک', size: '۳.۲ MB', date: '۱۴۰۳/۰۵/۲۰', type: 'PDF' },
      { title: 'لایحه تکمیلی دفاعیه وکیل دکتر سیده مریم رضوی', size: '۹۸۰ KB', date: '۱۴۰۳/۰۶/۱۰', type: 'DOCX' },
    ],
    financials: {
      totalFee: '۴۵,۰۰۰,۰۰۰ تومان',
      paidAmount: '۳۰,۰۰۰,۰۰۰ تومان',
      remainingAmount: '۱۵,۰۰۰,۰۰۰ تومان',
      nextDue: 'پس از ابلاغ رای قطعی دادگاه بدوی',
    },
  },
  {
    id: 'c-02',
    caseNumber: '۱۴۰۳-۳۴۱۱۲-داوری',
    courtBranch: 'مرکز داوری اتاق بازرگانی، صنایع، معادن و کشاورزی ایران',
    judgeName: 'سرداور پرونده: دکتر سیده مریم رضوی',
    subject: 'اختلاف قراردادی در اجرای پروژه صادرات تجهیزات نیروگاهی و ضمانت‌نامه بانکی',
    type: 'داوری تجاری بین‌المللی',
    progressPercentage: 40,
    stage: 'تبادل لوایح طرفین و بررسی اسناد اعتبارات اسنادی (LC)',
    lastUpdate: '۳ روز پیش - ابلاغ اخطاریه به طرف خارجی جهت معرفی نماینده حقوقی',
    nextSessionDate: 'یکشنبه ۲۷ مهر ۱۴۰۳ - ساعت ۱۱:۰۰ صبح',
    lawyerNotes: 'مطابق شروط داوری قرارداد فیدیک، رویه داوری سازمانی ICC اعمال شده و استعلام‌های بین‌المللی ارسال گردیده است.',
    documents: [
      { title: 'قرارداد اصلی پیمانکاری و شرط ارجاع به داوری', size: '۴.۱ MB', date: '۱۴۰۳/۰۲/۱۰', type: 'PDF' },
      { title: 'درخواست رسمی آغاز داوری و معرفی شهود', size: '۱.۸ MB', date: '۱۴۰۳/۰۴/۱۸', type: 'PDF' },
    ],
    financials: {
      totalFee: '۸۵,۰۰۰,۰۰۰ تومان',
      paidAmount: '۵۰,۰۰۰,۰۰۰ تومان',
      remainingAmount: '۳۵,۰۰۰,۰۰۰ تومان',
      nextDue: 'همزمان با تشکیل جلسه استماع داوری',
    },
  },
];

interface ClientPortalViewProps {
  onBackToMainDashboard?: () => void;
  onOpenBooking?: () => void;
  userPhoneNumber?: string;
  userName?: string;
  onLogout?: () => void;
}

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({
  onBackToMainDashboard,
  onOpenBooking,
  userPhoneNumber,
  userName,
  onLogout,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(MOCK_CLIENT_CASES[0].id);
  const [activeTab, setActiveTab] = useState<'case' | 'timeline' | 'documents' | 'financial' | 'messages' | 'profile'>('case');
  
  // Profile & Contact Info Form State (as requested by user)
  const [profileForm, setProfileForm] = useState({
    name: userName || 'مهندس علیرضا رادمنش',
    nationalId: '۰۰۱۹۲۸۳۷۴۶',
    sanaCode: 'SANA-۹۹۲۸۱',
    province: 'تهران',
    city: 'تهران - منطقه ۱',
    address: 'خیابان ولیعصر، بالاتر از پارک وی، کوچه سپیدار، پلاک ۱۸',
    postalCode: '۱۹۶۸۷۱۴۳۵۲',
    emergencyPhone: '۰۲۱۲۲۰۰۱۱۲۲',
    preferredMessenger: 'eitaa' as 'eitaa' | 'bale' | 'whatsapp' | 'telegram' | 'phone',
    messengerHandle: '@radmanesh_law',
    legalTopic: 'دعاوی ملکی و الزام به تنظیم سند رسمی',
    legalRequest: 'تقاضای الزام خوانده به تحویل مبیع، فک رهن و تنظیم سند رسمی پلاک ثبتی ۱۲۸۴/۳۳ به انضمام مطالبه خسارت تاخیر تادیه و تعیین داور مرضی‌الطرفین',
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [matchedAccountId, setMatchedAccountId] = useState<string | null>(null);

  useEffect(() => {
    if (userPhoneNumber) {
      const normalized = normalizeIranPhone(userPhoneNumber);
      const accounts = getStoredClientAccounts();
      const matched = accounts.find(
        (a) => a.phone === normalized || a.phone.slice(1) === normalized.replace(/^0/, '')
      );
      if (matched) {
        setMatchedAccountId(matched.id);
        setProfileForm((prev) => ({
          ...prev,
          name: matched.name || prev.name,
          nationalId: matched.nationalId || prev.nationalId,
          sanaCode: matched.sanaCode || prev.sanaCode,
          province: matched.province || prev.province,
          city: matched.city || prev.city,
          address: matched.address || prev.address,
          emergencyPhone: matched.emergencyPhone || prev.emergencyPhone,
          preferredMessenger: matched.preferredMessenger || prev.preferredMessenger,
          messengerHandle: matched.messengerHandle || prev.messengerHandle,
          legalTopic: matched.legalTopic || prev.legalTopic,
          legalRequest: matched.legalRequest || prev.legalRequest,
        }));
      }
    }
  }, [userPhoneNumber]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchedAccountId) {
      updateClientAccount(matchedAccountId, {
        name: profileForm.name,
        nationalId: profileForm.nationalId,
        sanaCode: profileForm.sanaCode,
        province: profileForm.province,
        city: profileForm.city,
        address: profileForm.address,
        emergencyPhone: profileForm.emergencyPhone,
        preferredMessenger: profileForm.preferredMessenger,
        messengerHandle: profileForm.messengerHandle,
        legalTopic: profileForm.legalTopic,
        legalRequest: profileForm.legalRequest,
        status: 'active',
      });
    }
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3500);
  };
  
  // Upload State
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploadTitle, setUploadTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Message State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'lawyer', text: 'سلام جناب رادمنش گرامی، لایحه جدید اعتراضیه امروز به شعبه ۱۲ تسلیم شد و شماره ثبت دریافت گردید.', time: '۱۰:۴۵' },
    { sender: 'client', text: 'بسیار سپاسگزارم خانم دکتر، آیا نیاز است شخصاً در جلسه کارشناسی هفته آینده حاضر باشم؟', time: '۱۱:۱۵' },
    { sender: 'lawyer', text: 'خیر نیازی به حضور شما نیست؛ وکیل همکار دفتر مدارک و مبایعه‌نامه اصلی را تحویل هیئت کارشناسی خواهند داد.', time: '۱۱:۳۰' },
  ]);
  const [newMessageText, setNewMessageText] = useState('');

  const activeCase = MOCK_CLIENT_CASES.find((c) => c.id === selectedCaseId) || MOCK_CLIENT_CASES[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    setChatMessages([
      ...chatMessages,
      { sender: 'client', text: newMessageText, time: 'هم‌اکنون' },
    ]);
    setNewMessageText('');

    // Simulate auto acknowledgment from lawyer assistant
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'lawyer',
          text: 'پیام شما توسط دبیرخانه دفتر وکالت دکتر رضوی دریافت شد و به وکیل مربوطه ارجاع گردید.',
          time: 'هم‌اکنون',
        },
      ]);
    }, 1200);
  };

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      setUploadedFiles([uploadTitle, ...uploadedFiles]);
      setUploadTitle('');
      setIsUploading(false);
    }, 800);
  };

  return (
    <div className="space-y-8 text-right font-persian" id="client-portal-module">
      
      {/* Client Identity Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37] text-[#0B132B] flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white/30">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black font-serif text-white">
                  {userName || (userPhoneNumber ? `موکل گرامی (${userPhoneNumber})` : 'مهندس علیرضا رادمنش')}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ورود با پیامک OTP معتبر</span>
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1">
                شماره همراه: <span className="font-mono text-[#D4AF37] font-bold" dir="ltr">{userPhoneNumber || '۰۹۱۲۳۴۵۶۷۸۹'}</span> | کد موکل: <span className="font-mono text-[#D4AF37] font-bold">CL-1403-889</span> | وکیل معتمد: <span className="text-white font-bold">دکتر سیده مریم رضوی</span>
              </p>
            </div>
          </div>

          {/* Quick Stats / Emergency Support / Logout */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="block text-[11px] text-gray-300">پرونده‌های فعال</span>
              <span className="font-mono text-base font-black text-[#D4AF37]">۲ پرونده</span>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="block text-[11px] text-gray-300">نوبت بعدی دادگاه</span>
              <span className="text-xs font-bold text-white">۱۵ مهر (شعبه ۱۲)</span>
            </div>

            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>درخواست جلسه فوری</span>
              </button>
            )}

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="px-3.5 py-2.5 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
                title="خروج از حساب کاربری"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* New Quick Access Dashboard Widget (Recent Case Updates & Upcoming Hearing Dates) */}
      <ClientPortalQuickAccessWidget
        cases={MOCK_CLIENT_CASES}
        activeCaseId={selectedCaseId}
        onSelectCase={(caseId) => {
          setSelectedCaseId(caseId);
          setActiveTab('case');
        }}
        onSwitchTab={setActiveTab}
        onOpenBooking={onOpenBooking}
      />

      {/* Case Selector Dropdown / Pills */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
            انتخاب پرونده جهت مشاهده کارتابل و جزئیات:
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {MOCK_CLIENT_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                selectedCaseId === c.id
                  ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span>{c.subject.slice(0, 32)}...</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/10">
                {c.caseNumber.split('-')[1]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('case')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'case'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'text-gray-500 dark:text-gray-400 hover:text-[#D4AF37]'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>وضعیت و گزارش پرونده</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'timeline'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'text-gray-500 dark:text-gray-400 hover:text-[#D4AF37]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>تایم‌لاین تعاملی و مواعد پرونده</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'documents'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'text-gray-500 dark:text-gray-400 hover:text-[#D4AF37]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>گاوصندوق اسناد و آپلود مدارک ({(activeCase.documents?.length || 0) + (uploadedFiles?.length || 0)})</span>
        </button>

        <button
          onClick={() => setActiveTab('financial')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'financial'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'text-gray-500 dark:text-gray-400 hover:text-[#D4AF37]'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>امور مالی و اقساط حق‌الوکاله</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'messages'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'text-gray-500 dark:text-gray-400 hover:text-[#D4AF37]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>ارتباط مستقیم و محرمانه با وکیل</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'profile'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'text-gray-500 dark:text-gray-400 hover:text-[#D4AF37]'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>مشخصات، مکان و درخواست حقوقی من</span>
        </button>
      </div>

      {/* Tab 1: Case Summary & Progress */}
      {activeTab === 'case' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Case Info (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Progress Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold">
                  {activeCase.type}
                </span>
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
                  شماره بایگانی: {activeCase.caseNumber}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-[#0B132B] dark:text-white leading-relaxed">
                  {activeCase.subject}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  مرجع رسیدگی: <span className="text-gray-800 dark:text-gray-200 font-semibold">{activeCase.courtBranch}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {activeCase.judgeName}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-700 dark:text-gray-300">مرحله فعلی دادرسی: {activeCase.stage}</span>
                  <span className="font-mono text-[#D4AF37] text-sm">{activeCase.progressPercentage}٪</span>
                </div>
                <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FCE38A] rounded-full transition-all duration-500"
                    style={{ width: `${activeCase.progressPercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pt-1">
                  <span>ثبت دادخواست</span>
                  <span>تبادل لوایح</span>
                  <span>کارشناسی رسمی</span>
                  <span>صدور دادنامه قطعی</span>
                </div>
              </div>

              {/* Lawyer Assessment Box */}
              <div className="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border-r-4 border-r-[#D4AF37] space-y-2">
                <span className="text-xs font-black text-[#AA820A] dark:text-[#F3E5AB] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  یادداشت و تحلیل حقوقی دکتر سیده مریم رضوی:
                </span>
                <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed text-justify">
                  {activeCase.lawyerNotes}
                </p>
              </div>

              {/* Last Update Banner */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>آخرین وضعیت ثبتی: {activeCase.lastUpdate}</span>
              </div>
            </div>

          </div>

          {/* Sidebar Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Next Court Session Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/30 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold">
                <Calendar className="w-4 h-4" />
                <span>جلسه آینده رسیدگی دادگاه</span>
              </div>
              <h4 className="text-base font-bold text-white leading-snug">
                {activeCase.nextSessionDate}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                حضور وکیل در این جلسه الزامی بوده و نیازی به حضور شخصی موکل نیست مگر آنکه دستور کتبی قاضی ابلاغ گردد.
              </p>
              <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>لایحه دفاعیه از قبل تدوین و بارگذاری شده است.</span>
              </div>
            </div>

            {/* Direct Line to Secretary */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <span>پشتیبانی مستقیم موکلین دفتر</span>
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                خط تلفن ویژه موکلین جهت پاسخگویی به ابهامات پرونده در ساعات اداری:
              </p>
              <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B132B] dark:text-white">شماره تماس اضطراری:</span>
                <span className="font-mono text-xs font-bold text-[#D4AF37] dir-ltr">۰۲۱-۸۸۷۷۶۶۵۵</span>
              </div>
            </div>

          </div>

          {/* Dynamic & Interactive Case Milestones Timeline (Status History & Upcoming Milestones) */}
          <div className="lg:col-span-12 pt-6 border-t border-gray-200 dark:border-gray-800">
            <CaseInteractiveTimeline
              caseId={activeCase.id}
              caseNumber={activeCase.caseNumber}
              caseSubject={activeCase.subject}
              onOpenBooking={onOpenBooking}
            />
          </div>

        </div>
      )}

      {/* Standalone Tab: Case Milestones Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <CaseInteractiveTimeline
            caseId={activeCase.id}
            caseNumber={activeCase.caseNumber}
            caseSubject={activeCase.subject}
            onOpenBooking={onOpenBooking}
          />
        </div>
      )}

      {/* Tab 2: Documents Vault & Upload */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          
          {/* Upload New Document Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#D4AF37]" />
              <span>بارگذاری مدارک و مستندات جدید برای وکیل</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              شما می‌توانید تصاویر واضح اسناد، چک‌ها، اظهارنامه‌ها یا قراردادهای تکمیلی را با فرمت PDF یا تصویر بارگذاری فرمایید.
            </p>

            <form onSubmit={handleUploadDocument} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8">
                <input
                  type="text"
                  required
                  placeholder="عنوان مدرک (مثال: تصویر سند تک‌برگ ملک یا رسید واریز)..."
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="sm:col-span-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="btn-gold w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isUploading ? 'در حال ارسال امن...' : 'ثبت و ارسال به وکیل'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Documents Table */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
              لیست اسناد قضایی و اوراق پرونده:
            </h4>

            <div className="space-y-3">
              {uploadedFiles.length === 0 && (!activeCase.documents || activeCase.documents.length === 0) && (
                <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-dashed border-gray-300 dark:border-gray-700 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-[#D4AF37] flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h5 className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    تاکنون سندی برای این پرونده ثبت نشده است
                  </h5>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    با استفاده از کادر بالا می‌توانید مدارک هویتی، تصاویر قراردادها یا اسناد موردنیاز وکیل را بارگذاری فرمایید.
                  </p>
                </div>
              )}

              {/* Newly uploaded docs */}
              {uploadedFiles.map((item, idx) => (
                <div
                  key={`user-up-${idx}`}
                  className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <span className="font-bold text-[#0B132B] dark:text-white block">{item}</span>
                      <span className="text-[10px] text-gray-400">توسط شما بارگذاری شد (در حال بررسی کارشناس دفتر)</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">ثبت موقت</span>
                </div>
              ))}

              {/* Pre-existing court documents */}
              {activeCase.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 flex items-center justify-between text-xs hover:border-[#D4AF37]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <div>
                      <span className="font-bold text-[#0B132B] dark:text-white block">{doc.title}</span>
                      <span className="text-[11px] text-gray-400 font-mono">تاریخ ثبت: {doc.date} | حجم: {doc.size}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`دانلود فایل ${doc.title} آغاز شد.`)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:text-[#D4AF37] flex items-center gap-1.5 font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>دانلود نسخه رسمی</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Financials & Retainer */}
      {activeTab === 'financial' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                صورتحساب مالی و اقساط حق‌الوکاله
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                مربوط به قرارداد الکترونیک وکالت شماره {activeCase.caseNumber}
              </p>
            </div>

            <button
              onClick={() => alert('صدور فاکتور رسمی مالیاتی با مهر دفتر وکالت...')}
              className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37] hover:text-[#0B132B] text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>دانلود صورتحساب رسمی</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
              <span className="block text-xs text-gray-500 dark:text-gray-400">مبلغ کل قرارداد وکالت</span>
              <span className="font-mono text-base font-black text-[#0B132B] dark:text-white mt-1 block">
                {activeCase.financials.totalFee}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <span className="block text-xs text-emerald-700 dark:text-emerald-300">مبالغ پرداخت‌شده تا کنون</span>
              <span className="font-mono text-base font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                {activeCase.financials.paidAmount}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <span className="block text-xs text-amber-800 dark:text-amber-200">مانده حق‌الوکاله</span>
              <span className="font-mono text-base font-black text-amber-600 dark:text-amber-400 mt-1 block">
                {activeCase.financials.remainingAmount}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B132B] dark:text-white block">
                شرط سررسید قسط باقیمانده:
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {activeCase.financials.nextDue}
              </span>
            </div>

            <button
              onClick={() => alert('اتصال به درگاه پرداخت شاپرک جهت تسویه آنلاین')}
              className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>پرداخت آنلاین قسط یا واریز علی‌الحساب</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Direct Messaging */}
      {activeTab === 'messages' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0B132B] flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                  گفتگوی اختصاصی با دکتر سیده مریم رضوی و دفتر وکالت
                </h3>
                <span className="text-[10px] text-emerald-500 font-semibold">
                  پاسخگویی سریع تحت پروتکل محرمانگی وکیل-موکل
                </span>
              </div>
            </div>

            <span className="text-xs font-mono text-gray-400">رمزنگاری شده TLS</span>
          </div>

          {/* Chat Stream */}
          <div className="space-y-3 h-80 overflow-y-auto p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'client' ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'client'
                      ? 'bg-[#0B132B] dark:bg-[#1C2541] text-white rounded-br-none border border-[#D4AF37]/30'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[9px] text-gray-400 mt-1 text-left font-mono">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Send Input */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              required
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder="پیام یا پرسش خود پیرامون پرونده را بنویسید..."
              className="flex-1 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="btn-gold px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>ارسال</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 6: Profile, Location & Legal Request Form (as requested) */}
      {activeTab === 'profile' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base sm:text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  فرم مشخصات، مکان و درخواست حقوقی موکل
                </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                اطلاعات ثبت شده در این فرم مستقیماً در کارتابل خانم وکیل ذخیره و جهت تنظیم دادخواست، لوایح و ابلاغیه‌های قضایی استفاده خواهد شد.
              </p>
            </div>

            {profileSaved && (
              <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4" />
                <span>اطلاعات شما با موفقیت در پرونده الکترونیک وکیل ذخیره گردید.</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            
            {/* بخش ۱: اطلاعات هویتی و ثنا */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span>۱. اطلاعات هویتی و ثنا</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    نام و نام خانوادگی موکل:
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    کد ملی موکل:
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={profileForm.nationalId}
                    onChange={(e) => setProfileForm({ ...profileForm, nationalId: e.target.value })}
                    placeholder="۰۰۱۹۲۸۳۷۴۶"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    کد شناسه ثنا (در صورت داشتن):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={profileForm.sanaCode}
                    onChange={(e) => setProfileForm({ ...profileForm, sanaCode: e.target.value })}
                    placeholder="SANA-۹۹۲۸۱"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* بخش ۲: مکان و نشانی محل سکونت */}
            <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>۲. مکان، استان و محل سکونت</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    استان محل سکونت:
                  </label>
                  <input
                    type="text"
                    value={profileForm.province}
                    onChange={(e) => setProfileForm({ ...profileForm, province: e.target.value })}
                    placeholder="مثال: تهران"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    شهر / منطقه:
                  </label>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                    placeholder="مثال: تهران - منطقه ونک"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    کد پستی ۱۰ رقمی:
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={profileForm.postalCode}
                    onChange={(e) => setProfileForm({ ...profileForm, postalCode: e.target.value })}
                    placeholder="۱۹۶۸۷۱۴۳۵۲"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                  نشانی پستی دقیق (جهت درج در اوراق قضایی یا ارسال مدارک):
                </label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  placeholder="مثال: خیابان ولیعصر، بالاتر از میدان ونک، خیابان دامن افشار، پلاک ۱۲، زنگ ۴"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            {/* بخش ۳: راه‌های ارتباطی و پیام‌رسان ترجیحی */}
            <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>۳. راه‌های ارتباطی تکمیلی و پیام‌رسان‌ها</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    پیام‌رسان ترجیحی جهت ارتباط با وکیل:
                  </label>
                  <select
                    value={profileForm.preferredMessenger}
                    onChange={(e) => setProfileForm({ ...profileForm, preferredMessenger: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="eitaa">ایتا (Eitaa)</option>
                    <option value="bale">بله (Bale)</option>
                    <option value="whatsapp">واتس‌اپ (WhatsApp)</option>
                    <option value="telegram">تلگرام (Telegram)</option>
                    <option value="phone">فقط تماس تلفنی مستقیم</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    آیدی پیام‌رسان یا شماره اختصاصی:
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={profileForm.messengerHandle}
                    onChange={(e) => setProfileForm({ ...profileForm, messengerHandle: e.target.value })}
                    placeholder="@username یا ۰۹۱۲..."
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    تلفن ثابت یا شماره تماس اضطراری:
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={profileForm.emergencyPhone}
                    onChange={(e) => setProfileForm({ ...profileForm, emergencyPhone: e.target.value })}
                    placeholder="۰۲۱۲۲۰۰۱۱۲۲"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* بخش ۴: شرح درخواست و وضعیت حقوقی */}
            <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>۴. موضوع پرونده و شرح درخواست به وکیل</span>
              </h4>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                  موضوع کلی دعوا یا خدمت حقوقی مورد نیاز:
                </label>
                <input
                  type="text"
                  value={profileForm.legalTopic}
                  onChange={(e) => setProfileForm({ ...profileForm, legalTopic: e.target.value })}
                  placeholder="مثال: الزام به تنظیم سند رسمی، مطالبه وجه چک، داوری، قرارداد..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                  شرح ماوقع و خلاصه درخواست شما از خانم وکیل:
                </label>
                <textarea
                  rows={4}
                  value={profileForm.legalRequest}
                  onChange={(e) => setProfileForm({ ...profileForm, legalRequest: e.target.value })}
                  placeholder="لطفاً روند ماجرا، تاریخ‌ها، طرف دعوا و خواسته نهایی خود را به اختصار بنویسید..."
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white leading-relaxed focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <p className="text-[11px] text-gray-400">
                🔒 اطلاعات ارسالی در چارچوب قانون آیین دادرسی و سوگند وکالت، کاملاً محرمانه تلقی می‌گردد.
              </p>

              <button
                type="submit"
                className="btn-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <Save className="w-4 h-4" />
                <span>ذخیره و ثبت در پرونده الکترونیک وکیل</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
