import React, { useState, useEffect } from 'react';
import {
  Shield,
  FileText,
  Clock,
  Lock,
  Download,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  X,
  User,
  Building2,
  Activity,
  FileCheck,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Eye,
  Key,
  ShieldAlert,
  HelpCircle,
  FileSignature
} from 'lucide-react';

interface ClientMatterPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LegalMatter {
  id: string;
  case_number: string;
  title: string;
  client_id: string;
  client_name: string;
  court_branch: string;
  lead_attorney: string;
  status: 'active' | 'in_review' | 'judgment_rendered' | 'archived';
  status_label: string;
  filing_date: string;
  dispute_value: string;
  current_milestone: number;
  milestones: { title: string; date: string; completed: boolean }[];
  summary: string;
}

interface MatterDocument {
  id: string;
  matter_id: string;
  title: string;
  category: string;
  file_name: string;
  file_size: string;
  uploaded_at: string;
  sha256: string;
  malware_status: 'clean' | 'scanning';
  security_level: 'confidential' | 'restricted' | 'judicial';
}

interface JudicialDeadline {
  id: string;
  matter_id: string;
  case_number: string;
  title: string;
  due_date_jalali: string;
  days_remaining: number;
  court_session_type: string;
  is_urgent: boolean;
}

interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  status: 'ALLOWED' | 'BLOCKED_403';
  details: string;
}

export const ClientMatterPortalModal: React.FC<ClientMatterPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'cases' | 'vault' | 'deadlines' | 'idor_lab' | 'audit'>('cases');
  
  // Current authenticated client simulation
  const [currentClientId, setCurrentClientId] = useState<string>('client_user_101');
  const [currentClientName, setCurrentClientName] = useState<string>('آقای مهندس سهراب بختیاری');

  // Selected matter
  const [selectedMatterId, setSelectedMatterId] = useState<string>('MAT-2026-101');

  // IDOR Simulator State
  const [simulatedAttemptId, setSimulatedAttemptId] = useState<string>('MAT-2026-112'); // Belonging to client_user_204
  const [idorResult, setIdorResult] = useState<{
    tested: boolean;
    allowed: boolean;
    httpCode: number;
    message: string;
    targetOwner: string;
    loggedAuditId?: string;
  } | null>(null);

  // Download token state
  const [activeDownloadToken, setActiveDownloadToken] = useState<{
    docId: string;
    token: string;
    expiresInSeconds: number;
    url: string;
  } | null>(null);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'AUD-8821',
      timestamp: '۱۰:۲۴:۱۵ - امروز',
      actor: 'client_user_101',
      action: 'VIEW_CASES_LIST',
      resource: '/sedrazavi/v1/matters/my-cases',
      status: 'ALLOWED',
      details: 'دریافت فهرست پرونده‌های تحت مالکیت موکل (۲ پرونده معتبر)',
    },
    {
      id: 'AUD-8820',
      timestamp: '۱۰:۱۹:۰۴ - امروز',
      actor: 'client_user_101',
      action: 'OBJECT_AUTH_CHECK',
      resource: 'matter:MAT-2026-101',
      status: 'ALLOWED',
      details: 'تأیید مجوز دسترسی سمت سرور بر اساس شناسه مشتری و توکن احراز هویت',
    },
    {
      id: 'AUD-8815',
      timestamp: 'دیروز ۱۶:۴۰',
      actor: 'unauthorized_guest_ip',
      action: 'ATTEMPT_IDOR_TAMPER',
      resource: 'matter:MAT-2026-101',
      status: 'BLOCKED_403',
      details: 'سد امنیتی Anti-IDOR فعال شد: تلاش برای دسترسی به پرونده بدون توکن مالکیت',
    },
  ]);

  // Matter Records (Level C mock data matching class-legal-matter-portal.php)
  const matters: LegalMatter[] = [
    {
      id: 'MAT-2026-101',
      case_number: '۱۴۰۴۹۲۸۳۰۰۰۱۴۷۲۵',
      title: 'دعوی الزام به تنظیم سند رسمی و مطالبه وجه التزام قراردادی',
      client_id: 'client_user_101',
      client_name: 'آقای مهندس سهراب بختیاری',
      court_branch: 'شعبه ۱۰۴ دادگاه عمومی حقوقی مجتمع قضایی شهید بهشتی تهران',
      lead_attorney: 'سید امیر حسین رضوی فردویی (@sedrazavi)',
      status: 'active',
      status_label: 'در جریان رسیدگی قضایی',
      filing_date: '۱۴۰۴/۰۸/۱۵',
      dispute_value: '۳۴,۵۰۰,۰۰۰,۰۰۰ ریال',
      current_milestone: 2,
      milestones: [
        { title: 'ثبت دادخواست و ارجاع شعبه', date: '۱۴۰۴/۰۸/۱۵', completed: true },
        { title: 'تعیین وقت رسیدگی و ابلاغ ثنا', date: '۱۴۰۴/۰۹/۱۰', completed: true },
        { title: 'جلسه رسیدگی و ارجاع به کارشناسی رسمی', date: '۱۴۰۴/۱۰/۲۲', completed: true },
        { title: 'وصول نظریه کارشناس و تبادل لوایح', date: '۱۴۰۴/۱۱/۳۰', completed: false },
        { title: 'صدور دادنامه قطعی و اجرای احکام', date: 'در انتظار', completed: false },
      ],
      summary: 'پرونده مربوط به عدم انجام تعهد انتقال سند مجتمع تجاری به انضمام خسارت تاخیر تادیه و مطالبه وجه التزام روزانه مقرر در مبایعه‌نامه.',
    },
    {
      id: 'MAT-2026-102',
      case_number: '۱۴۰۴۹۲۸۳۰۰۰۲۱۹۸۴',
      title: 'داوری تجاری و ابطال رای داور در قرارداد مشارکت پیمانکاری',
      client_id: 'client_user_101',
      client_name: 'آقای مهندس سهراب بختیاری',
      court_branch: 'شعبه ۵ دادگاه تجدیدنظر استان تهران',
      lead_attorney: 'سید امیر حسین رضوی فردویی (@sedrazavi)',
      status: 'in_review',
      status_label: 'تبادل لوایح در مرحله تجدیدنظر',
      filing_date: '۱۴۰۴/۱۰/۰۲',
      dispute_value: '۸۲,۰۰۰,۰۰۰,۰۰۰ ریال',
      current_milestone: 3,
      milestones: [
        { title: 'صدور رای هیات داوری', date: '۱۴۰۴/۰۹/۱۵', completed: true },
        { title: 'اعتراض به رای داور و ثبت دادخواست ابطال', date: '۱۴۰۴/۱۰/۰۲', completed: true },
        { title: 'تبادل لوایح تخصصی تجدیدنظرخواهی', date: '۱۴۰۴/۱۱/۱۲', completed: true },
        { title: 'انشای رای دادگاه تجدیدنظر', date: 'در انتظار', completed: false },
      ],
      summary: 'ابطال رای داور به جهت خروج داور منفرد از صلاحیت رسیدگی و نقض قوانین آمره موضوع ماده ۴۸۹ قانون آیین دادرسی مدنی.',
    },
    {
      id: 'MAT-2026-112',
      case_number: '۱۴۰۴۹۲۸۳۰۰۰۴۴۱۰۱',
      title: 'دعاوی کیفری کلاهبرداری رایانه‌ای و انتقال منافع مال غیر (محرمانه)',
      client_id: 'client_user_204',
      client_name: 'شرکت تجارت الکترونیک سپهر آریا (شخص ثالث)',
      court_branch: 'شعبه ۲ بازپرسی دادسرای تخصصی جرایم رایانه‌ای',
      lead_attorney: 'سید امیر حسین رضوی فردویی (@sedrazavi)',
      status: 'active',
      status_label: 'تحقیقات مقدماتی محرمانه',
      filing_date: '۱۴۰۴/۱۱/۰۱',
      dispute_value: '۱۲۵,۰۰۰,۰۰۰,۰۰۰ ریال',
      current_milestone: 1,
      milestones: [
        { title: 'شکواییه و ثبت در سامانه ثنا', date: '۱۴۰۴/۱۱/۰۱', completed: true },
        { title: 'استعلامات فتا و ردیابی تراکنش‌ها', date: 'در حال انجام', completed: false },
      ],
      summary: 'پرونده متعلق به شرکت ثالث - دسترسی سایر موکلین به این رکورد مشمول سد Anti-IDOR و خطای ۴۰۳ است.',
    },
  ];

  // Filter matters visible to current client (Strict Anti-IDOR check)
  const clientVisibleMatters = matters.filter((m) => m.client_id === currentClientId);
  const currentMatter = matters.find((m) => m.id === selectedMatterId) || clientVisibleMatters[0];

  // Matter Documents
  const documents: MatterDocument[] = [
    {
      id: 'DOC-501',
      matter_id: 'MAT-2026-101',
      title: 'دادخواست نهایی و ضمائم به پیوست مبایعه‌نامه',
      category: 'لوایح و دادخواست',
      file_name: 'Dadkhast_Final_1404_signed.pdf',
      file_size: '۲.۴ مگابایت',
      uploaded_at: '۱۴۰۴/۰۸/۱۵',
      sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      malware_status: 'clean',
      security_level: 'confidential',
    },
    {
      id: 'DOC-502',
      matter_id: 'MAT-2026-101',
      title: 'نظریه کارشناس رسمی دادگستری در ارزیابی ملک تجاری',
      category: 'نظریه کارشناسی',
      file_name: 'Karshenasi_Rasmi_Estelam_1404.pdf',
      file_size: '۴.۱ مگابایت',
      uploaded_at: '۱۴۰۴/۱۰/۲۵',
      sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      malware_status: 'clean',
      security_level: 'judicial',
    },
    {
      id: 'DOC-503',
      matter_id: 'MAT-2026-101',
      title: 'لایحه دفاعیه تکمیلی در رد ادعای فورس‌ماژور خوانده',
      category: 'لوایح و دفاعیات',
      file_name: 'Layehe_Defaieh_No_ForceMajeure.pdf',
      file_size: '۱.۸ مگابایت',
      uploaded_at: '۱۴۰۴/۱۱/۰۴',
      sha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      malware_status: 'clean',
      security_level: 'restricted',
    },
    {
      id: 'DOC-504',
      matter_id: 'MAT-2026-102',
      title: 'تصویر صورت‌جلسه توافقنامه داوری و ابلاغ رای داور',
      category: 'اسناد داوری',
      file_name: 'Arbitration_Award_Copy_1404.pdf',
      file_size: '۳.۲ مگابایت',
      uploaded_at: '۱۴۰۴/۱۰/۰۳',
      sha256: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
      malware_status: 'clean',
      security_level: 'confidential',
    },
  ];

  // Judicial Deadlines
  const deadlines: JudicialDeadline[] = [
    {
      id: 'DL-1',
      matter_id: 'MAT-2026-101',
      case_number: '۱۴۰۴۹۲۸۳۰۰۰۱۴۷۲۵',
      title: 'مهلت قانونی ثبت اعتراض و لایحه در خصوص نظریه کارشناس رسمی',
      due_date_jalali: '۱۴۰۴/۱۱/۱۰',
      days_remaining: 3,
      court_session_type: 'مهلت اخطاریه قضایی (ماده ۲۶۰ ق.آ.د.م)',
      is_urgent: true,
    },
    {
      id: 'DL-2',
      matter_id: 'MAT-2026-101',
      case_number: '۱۴۰۴۹۲۸۳۰۰۰۱۴۷۲۵',
      title: 'جلسه رسیدگی دادگاه جهت استماع اظهارات طرفین و شهود',
      due_date_jalali: '۱۴۰۴/۱۱/۲۸ ساعت ۰۹:۳۰',
      days_remaining: 21,
      court_session_type: 'وقت رسیدگی حضوری',
      is_urgent: false,
    },
    {
      id: 'DL-3',
      matter_id: 'MAT-2026-102',
      case_number: '۱۴۰۴۹۲۸۳۰۰۰۲۱۹۸۴',
      title: 'مهلت تبادل لوایح تجدیدنظرخواهی به موجب اخطاریه دفتر شعبه',
      due_date_jalali: '۱۴۰۴/۱۱/۱۵',
      days_remaining: 8,
      court_session_type: 'تبادل لوایح ۱۰ روزه',
      is_urgent: false,
    },
  ];

  // Timer countdown for active download token
  useEffect(() => {
    if (!activeDownloadToken || activeDownloadToken.expiresInSeconds <= 0) return;
    const interval = setInterval(() => {
      setActiveDownloadToken((prev) => {
        if (!prev || prev.expiresInSeconds <= 1) return null;
        return { ...prev, expiresInSeconds: prev.expiresInSeconds - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeDownloadToken]);

  // Handler for Generating 15-Minute Expiring HMAC Download Token
  const handleGenerateDownloadToken = (doc: MatterDocument) => {
    // Verify client has permission to this matter
    const targetMatter = matters.find((m) => m.id === doc.matter_id);
    if (!targetMatter || targetMatter.client_id !== currentClientId) {
      alert('خطای امنیتی ۴۰۳: دسترسی غیرمجاز به فایل پرونده دیگر موکلین مسدود شد.');
      return;
    }

    const mockHmac = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const tokenPayload = {
      docId: doc.id,
      token: `sr_hmac_${mockHmac}`,
      expiresInSeconds: 900, // 15 minutes
      url: `/wp-json/sedrazavi/v1/matters/secure-file?doc_id=${doc.id}&token=sr_hmac_${mockHmac}`,
    };

    setActiveDownloadToken(tokenPayload);

    // Record audit log
    const newLog: AuditLogEntry = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'هم‌اکنون',
      actor: currentClientId,
      action: 'GENERATE_DOWNLOAD_TOKEN',
      resource: `doc:${doc.id}`,
      status: 'ALLOWED',
      details: `تولید توکن رمزنگاری‌شده HMAC با انقضای ۱۵ دقیقه‌ای برای سند «${doc.title}»`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Handler for Interactive Anti-IDOR Security Simulator
  const handleTestIdorSecurity = () => {
    const targetMatter = matters.find((m) => m.id === simulatedAttemptId);
    const isOwner = targetMatter && targetMatter.client_id === currentClientId;

    if (isOwner) {
      setIdorResult({
        tested: true,
        allowed: true,
        httpCode: 200,
        message: 'مالکیت پرونده تأیید شد: این پرونده متعلق به شماست و دسترسی قانونی است.',
        targetOwner: targetMatter?.client_name || '',
      });
    } else {
      // IDOR Attempt Detected and Blocked!
      const auditId = `AUD-${Math.floor(1000 + Math.random() * 9000)}`;
      setIdorResult({
        tested: true,
        allowed: false,
        httpCode: 403,
        message:
          'سد امنیتی Anti-IDOR با موفقیت نفوذ را دفع کرد! دسترسی به پرونده سایر موکلین به علت عدم تطابق هویت مالک مسدود گردید.',
        targetOwner: targetMatter?.client_name || 'موکل ثالث',
        loggedAuditId: auditId,
      });

      const newLog: AuditLogEntry = {
        id: auditId,
        timestamp: 'هم‌اکنون',
        actor: currentClientId,
        action: 'SIMULATED_IDOR_VIOLATION',
        resource: `matter:${simulatedAttemptId}`,
        status: 'BLOCKED_403',
        details: `تلاش شبیه‌سازی‌شده برای دسترسی به پرونده ${simulatedAttemptId} مسدود و لاگ گردید (عدم تطابق مالکیت سمت سرور)`,
      };
      setAuditLogs((prev) => [newLog, ...prev]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 md:p-6 overflow-y-auto"
      dir="rtl"
    >
      <div className="relative w-full max-w-5xl bg-[#0b132b]/95 border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-500/20 bg-gradient-to-r from-indigo-950/80 via-[#0b132b] to-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">پرتال امن موکل و کارتابل عملیات پرونده</h2>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  سطح C حقوقی (P4)
                </span>
                <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Anti-IDOR Barrier Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>دفتر وکالت سید امیر حسین رضوی فردویی</span>
                <span className="text-indigo-400">•</span>
                <span className="font-mono text-slate-300">{currentClientName} ({currentClientId})</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="بستن پنجره"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-black/40 border-b border-indigo-500/20 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'cases'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>پرونده‌ها و روند دادرسی</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'vault'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>گاوصندوق اسناد محرمانه</span>
            <span className="w-4 h-4 rounded-full bg-indigo-400/20 text-indigo-300 text-[10px] flex items-center justify-center">
              {documents.filter((d) => d.matter_id === currentMatter.id).length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('deadlines')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'deadlines'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>مهلت‌های قضایی و دادگاه</span>
            <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[10px] border border-rose-500/30">
              ۳ روز تا مهلت
            </span>
          </button>

          <button
            onClick={() => setActiveTab('idor_lab')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'idor_lab'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'text-slate-400 hover:text-amber-300 hover:bg-amber-500/10'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>آزمایشگاه امنیت Anti-IDOR</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'audit'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>دفتر ثبت وقایع امنیتی (Audit)</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* TAB 1: CASES & TIMELINE */}
          {activeTab === 'cases' && (
            <div className="space-y-6">
              {/* Matter Selector Strip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientVisibleMatters.map((matter) => (
                  <div
                    key={matter.id}
                    onClick={() => setSelectedMatterId(matter.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedMatterId === matter.id
                        ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/20'
                        : 'bg-black/30 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {matter.case_number}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {matter.status_label}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 leading-relaxed">{matter.title}</h3>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>شعبه: {matter.court_branch.substring(0, 30)}...</span>
                      <span className="font-mono text-indigo-300">{matter.dispute_value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Case Details Card */}
              {currentMatter && (
                <div className="p-5 rounded-2xl bg-black/40 border border-indigo-500/20 space-y-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <h4 className="text-base font-black text-white">{currentMatter.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        مرجع رسیدگی: <strong className="text-slate-200">{currentMatter.court_branch}</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">وکیل پرونده:</span>
                      <span className="text-xs font-bold text-amber-300 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30">
                        {currentMatter.lead_attorney}
                      </span>
                    </div>
                  </div>

                  {/* Judicial Milestone Stepper */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-indigo-400" />
                      <span>مراحل طی‌شده دادرسی و گام جاری:</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                      {currentMatter.milestones.map((ms, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border relative ${
                            ms.completed
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                              : idx === currentMatter.current_milestone
                              ? 'bg-indigo-950/50 border-indigo-500 text-indigo-200 animate-pulse'
                              : 'bg-black/20 border-slate-800/80 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono font-bold">گام ۰{idx + 1}</span>
                            {ms.completed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                            )}
                          </div>
                          <div className="text-xs font-bold leading-snug">{ms.title}</div>
                          <div className="text-[10px] text-slate-400 mt-2 font-mono">{ms.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-indigo-400 ml-1">خلاصه وضعیت پرونده:</strong>
                    {currentMatter.summary}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRIVATE DOCUMENT VAULT */}
          {activeTab === 'vault' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between bg-black/30 p-3.5 rounded-xl border border-indigo-500/20">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>اسناد در پوشه محافظت‌شده نگهداری می‌شوند. لینک‌های دانلود با کلید امنیتی HMAC فقط به مدت ۱۵ دقیقه معتبرند.</span>
                </div>
              </div>

              {/* Active Download Token Banner */}
              {activeDownloadToken && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-200">
                        توکن دانلود امن با موفقیت تولید گردید
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 bg-emerald-900/50 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        زمان باقی‌مانده: {Math.floor(activeDownloadToken.expiresInSeconds / 60)}:
                        {(activeDownloadToken.expiresInSeconds % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono bg-black/50 p-2.5 rounded-lg border border-emerald-500/20 text-slate-300 overflow-x-auto">
                    <span className="text-emerald-400">HMAC-Token:</span>
                    <span className="truncate">{activeDownloadToken.token}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`data:application/pdf;base64,JVBERi0xLjUK`}
                      download={`SedRazavi_Doc_${activeDownloadToken.docId}.pdf`}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>دانلود فایل پی‌دی‌اف امن</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Documents List */}
              <div className="space-y-3">
                {documents
                  .filter((d) => d.matter_id === currentMatter.id)
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-xl bg-black/40 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">{doc.title}</h4>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <span className="font-mono text-slate-300">{doc.file_name}</span>
                            <span>•</span>
                            <span>حجم: {doc.file_size}</span>
                            <span>•</span>
                            <span>تاریخ بارگذاری: {doc.uploaded_at}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                              SHA-256: {doc.sha256.substring(0, 16)}...
                            </span>
                            <span className="text-[10px] text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/30">
                              اسکن بدافزار: پاک (Clean)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleGenerateDownloadToken(doc)}
                          className="px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-bold transition-all border border-indigo-500/40 flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>تولید توکن و دانلود امن</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 3: JUDICIAL DEADLINES */}
          {activeTab === 'deadlines' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  کلیه مهلت‌ها و اخطاریه‌های دادگاه منطبق با قانون آیین دادرسی مدنی و منطقه زمانی تهران (Asia/Tehran) محاسبه و پایش می‌شوند.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deadlines.map((dl) => (
                  <div
                    key={dl.id}
                    className={`p-4 rounded-xl border transition-all ${
                      dl.is_urgent
                        ? 'bg-rose-950/20 border-rose-500/40 shadow-lg shadow-rose-950/30'
                        : 'bg-black/30 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-slate-400">{dl.case_number}</span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          dl.days_remaining <= 3
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                        }`}
                      >
                        {dl.days_remaining} روز باقی‌مانده
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2 leading-relaxed">{dl.title}</h4>

                    <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-2.5 mt-3">
                      <div className="flex items-center justify-between">
                        <span>نوع رویداد قضایی:</span>
                        <span className="text-slate-200 font-medium">{dl.court_session_type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>سررسید قانونی:</span>
                        <span className="font-mono text-amber-300 font-bold">{dl.due_date_jalali}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ANTI-IDOR SECURITY SIMULATOR */}
          {activeTab === 'idor_lab' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-black text-amber-300">
                    آزمایشگاه نفوذ و پایش استواری سد Anti-IDOR (Insecure Direct Object Reference)
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  طبق بند ۴.۴ و ۸.۳ سند معماری v25.0، هر درخواست به پرونده یا سند موکل باید هم مجوز کاربر و هم مالکیت آبجکت (Object Ownership) را سمت سرور اعتبارسنجی کند. تغییر شناسه پرونده در URL یا Payload بدون داشتن کلید احراز هویتِ مالک، باید فوراً خطای ۴۰۳ صادر کند.
                </p>
              </div>

              {/* Interactive Simulation Sandbox */}
              <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      هویت مشتری فعال جاری (شما):
                    </label>
                    <select
                      value={currentClientId}
                      onChange={(e) => {
                        setCurrentClientId(e.target.value);
                        setCurrentClientName(
                          e.target.value === 'client_user_101'
                            ? 'آقای مهندس سهراب بختیاری'
                            : 'شرکت تجارت الکترونیک سپهر آریا'
                        );
                        setIdorResult(null);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    >
                      <option value="client_user_101">client_user_101 (آقای سهراب بختیاری - پرونده‌های ۱۰۱ و ۱۰۲)</option>
                      <option value="client_user_204">client_user_204 (شرکت سپهر آریا - پرونده ۱۱۲ محرمانه)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      تلاش برای دسترسی به پرونده با شناسه هدف:
                    </label>
                    <select
                      value={simulatedAttemptId}
                      onChange={(e) => {
                        setSimulatedAttemptId(e.target.value);
                        setIdorResult(null);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    >
                      <option value="MAT-2026-101">MAT-2026-101 (متعلق به client_user_101)</option>
                      <option value="MAT-2026-102">MAT-2026-102 (متعلق به client_user_101)</option>
                      <option value="MAT-2026-112">MAT-2026-112 (متعلق به client_user_204 - شخص ثالث)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={handleTestIdorSecurity}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-black text-xs transition-all flex items-center gap-2 shadow-lg shadow-amber-600/30"
                  >
                    <ShieldAlert className="w-4 h-4 text-black" />
                    <span>اجرای تست دسترسی و شبیه‌سازی تامپرینگ (Tampering Test)</span>
                  </button>
                  <span className="text-[11px] text-slate-400">
                    REST: <code className="text-amber-400 font-mono">/sedrazavi/v1/matters/case-details?matter_id={simulatedAttemptId}</code>
                  </span>
                </div>

                {/* Simulation Output */}
                {idorResult && (
                  <div
                    className={`p-4 rounded-xl border mt-3 transition-all ${
                      idorResult.allowed
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-xs flex items-center gap-1.5">
                        {idorResult.allowed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                        )}
                        وضعیت پاسخ سرور: HTTP {idorResult.httpCode}{' '}
                        {idorResult.allowed ? 'OK (Authorized)' : 'Forbidden (IDOR Blocked)'}
                      </span>
                      {idorResult.loggedAuditId && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-rose-500/30">
                          لاگ امنیتی: {idorResult.loggedAuditId}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium leading-relaxed">{idorResult.message}</p>
                    <p className="text-[11px] text-slate-300 mt-2">
                      مالک قانونی پرونده: <strong>{idorResult.targetOwner}</strong>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT LOG */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-black/30 border border-indigo-500/20 text-xs text-slate-300 flex items-center justify-between">
                <span>دفتر ثبت وقایع غیرقابل تغییر (Append-Only Audit Trail) — ثبت کلیه دسترسی‌ها، فراخوانی توکن و تلاش‌های مشکوک</span>
                <span className="font-mono text-indigo-400">{auditLogs.length} رویداد ثبت‌شده</span>
              </div>

              <div className="space-y-2">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-black/40 border border-slate-800 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                          log.status === 'ALLOWED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {log.status}
                      </span>
                      <span className="font-mono text-slate-400">{log.id}</span>
                      <span className="font-bold text-white">{log.action}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{log.resource}</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      <span>{log.details}</span>
                      <span className="font-mono text-slate-500">{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-indigo-500/20 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>پلتفرم حقوقی SedRazavi OS — دارای گواهی تطبیق با بندهای ۲.۳ و ۴.۴ مستر پلن v25.0</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-mono text-[11px]">Zero-PII-Leak Enforced</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
