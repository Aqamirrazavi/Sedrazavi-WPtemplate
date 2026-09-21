import React, { useState } from 'react';
import {
  KeyRound,
  Mail,
  ShieldCheck,
  Smartphone,
  Copy,
  Check,
  RefreshCw,
  AlertTriangle,
  Lock,
  UserCheck,
  Clock,
  History,
  QrCode,
  Laptop,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Send,
  UserPlus,
  ShieldAlert,
  Download,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface LawyerUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  licenseNumber: string;
  status: 'active' | 'pending_password' | 'pending_invitation' | 'blocked';
  creationMethod: 'admin_password' | 'invitation';
  createdDate: string;
  twoFactorEnabled: boolean;
  lastLogin?: string;
  activeSessionsCount: number;
}

export const DualModeLawyerAuth: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<'admin_password' | 'invitation' | 'two_factor' | 'sessions' | 'audit_log'>('admin_password');

  // Form states - Mode 1 (Admin Password)
  const [adminForm, setAdminForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    role: 'وکیل پایه یک',
    licenseNumber: '',
    licenseYear: '1400',
    password: '',
    confirmPassword: '',
    forcePasswordReset: true,
    force2FA: true,
    notifyAdmin: true,
    capabilities: {
      cases: true,
      articles: true,
      services: true,
      consultations: true,
      financial: false,
      settings: false,
    },
  });

  // Form states - Mode 2 (Email Invitation)
  const [inviteForm, setInviteForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    role: 'وکیل همکار',
    licenseNumber: '',
    expiresInDays: 7,
    reminder24h: true,
    reminder72h: true,
    capabilities: {
      cases: true,
      articles: true,
      services: true,
      consultations: true,
      financial: false,
      settings: false,
    },
  });

  // Password Generator & Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [generatedCredentialModal, setGeneratedCredentialModal] = useState<{
    show: boolean;
    name: string;
    email: string;
    tempPassword: string;
    expiryHours: number;
    token: string;
  } | null>(null);

  // Invitation Success Notification
  const [inviteSuccessNotice, setInviteSuccessNotice] = useState<string | null>(null);

  // 2FA Simulator state
  const [mock2faSecret] = useState('K7NP9XLYW4QZ8M3B');
  const [twoFactorCodeInput, setTwoFactorCodeInput] = useState('');
  const [is2faVerified, setIs2faVerified] = useState(false);
  const [backupCodes] = useState([
    '9821-4451', '1092-8873', '6743-1290', '4491-0021', '8910-3342',
    '5512-9081', '3341-7654', '2219-0987', '7810-6543', '6651-4432'
  ]);
  const [copiedBackupCodes, setCopiedBackupCodes] = useState(false);

  // Active Sessions
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 'sess-1',
      device: 'MacBook Pro (Apple Silicon)',
      browser: 'Chrome 128.0',
      os: 'macOS Sonoma',
      ip: '5.218.42.110 (تهران)',
      lastActivity: 'هم‌اکنون (نشست فعلی)',
      isCurrent: true,
    },
    {
      id: 'sess-2',
      device: 'iPhone 15 Pro',
      browser: 'Safari Mobile 17.5',
      os: 'iOS 17.5',
      ip: '5.127.88.94 (همراه اول)',
      lastActivity: '۲ ساعت پیش',
      isCurrent: false,
    },
    {
      id: 'sess-3',
      device: 'Desktop PC (دفتر وکالت)',
      browser: 'Firefox 129.0',
      os: 'Windows 11 Pro',
      ip: '188.253.12.5 (شاتل ثابت)',
      lastActivity: 'دیروز ساعت ۱۸:۳۰',
      isCurrent: false,
    },
  ]);

  // Audit Log State
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 'log-1',
      action: 'user_created_admin_password',
      user: 'ادمین اصلی (دکتر رضوی)',
      target: 'دکتر علیرضا افشار (alireza.afshar@law.ir)',
      ip: '5.218.42.110',
      date: '۱۴۰۳/۰۷/۰۱ - ۱۱:۳۰',
      severity: 'info',
      details: 'ایجاد حساب با رمز ادمین و فعال‌سازی اجبار تغییر رمز در ورود نخست.',
    },
    {
      id: 'log-2',
      action: 'secure_email_dispatched',
      user: 'سیستم خودکار امنیتی',
      target: 'alireza.afshar@law.ir',
      ip: '127.0.0.1 (Internal Mailer)',
      date: '۱۴۰۳/۰۷/۰۱ - ۱۱:۳۱',
      severity: 'info',
      details: 'ارسال ایمیل رمزنگاری‌شده حاوی لینک یک‌بارمصرف انقضای ۲۴ ساعته.',
    },
    {
      id: 'log-3',
      action: 'invitation_sent',
      user: 'ادمین اصلی (دکتر رضوی)',
      target: 'خانم وکیل نیلوفر شاکری (n.shakeri@advocate.ir)',
      ip: '5.218.42.110',
      date: '۱۴۰۳/۰۷/۰۱ - ۱۰:۱۵',
      severity: 'info',
      details: 'تولید توکن ۶۴ بایتی دعوت‌نامه و ارسال لینک فعال‌سازی ۷ روزه.',
    },
    {
      id: 'log-4',
      action: 'forced_password_changed',
      user: 'دکتر علیرضا افشار',
      target: 'حساب وکیل',
      ip: '5.127.88.94',
      date: '۱۴۰۳/۰۶/۳۰ - ۱۶:۴۵',
      severity: 'success',
      details: 'تغییر اجباری رمز عبور در نخستین ورود، ابطال پرچم _password_reset_required.',
    },
    {
      id: 'log-5',
      action: 'two_factor_enabled',
      user: 'دکتر علیرضا افشار',
      target: 'Google Authenticator (TOTP)',
      ip: '5.127.88.94',
      date: '۱۴۰۳/۰۶/۳۰ - ۱۶:۴۷',
      severity: 'success',
      details: 'فعال‌سازی موفق احراز هویت دو مرحله‌ای و ذخیره ۱۰ کد پشتیبان.',
    },
    {
      id: 'log-6',
      action: 'suspicious_login_blocked',
      user: 'مهاجم ناشناس',
      target: 'ورود به پنل وکیل',
      ip: '45.154.255.8 (روسیه)',
      date: '۱۴۰۳/۰۶/۲۹ - ۰۳:۱۴',
      severity: 'critical',
      details: 'تشخیص ۵ تلاش ناموفق پیاپی در ۱۰ دقیقه (حمله Brute Force)، مسدودسازی موقت IP به مدت ۱۵ دقیقه و ارسال اعلان امنیتی.',
    },
  ]);

  // Password Generator Function (16 chars, meets strict rules)
  const generateStrongPassword = () => {
    const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // exclude O, I
    const lowers = 'abcdefghijkmnopqrstuvwxyz'; // exclude l
    const numbers = '23456789'; // exclude 0, 1
    const symbols = '!@#$%^&*()_+~';

    let pwd = '';
    // ensure at least 2 of each
    for (let i = 0; i < 2; i++) {
      pwd += uppers[Math.floor(Math.random() * uppers.length)];
      pwd += lowers[Math.floor(Math.random() * lowers.length)];
      pwd += numbers[Math.floor(Math.random() * numbers.length)];
      pwd += symbols[Math.floor(Math.random() * symbols.length)];
    }
    // fill up to 16 chars
    const all = uppers + lowers + numbers + symbols;
    while (pwd.length < 16) {
      pwd += all[Math.floor(Math.random() * all.length)];
    }
    // shuffle string
    const shuffled = pwd.split('').sort(() => 0.5 - Math.random()).join('');
    setAdminForm(prev => ({ ...prev, password: shuffled, confirmPassword: shuffled }));
  };

  // Calculate Password Strength
  const calculateStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'خالی', color: 'bg-gray-300' };
    let score = 0;
    if (pwd.length >= 8) score += 2;
    if (pwd.length >= 12) score += 3;
    if (pwd.length >= 16) score += 3;
    if (/[A-Z]/.test(pwd)) score += 2;
    if (/[a-z]/.test(pwd)) score += 2;
    if (/[0-9]/.test(pwd)) score += 2;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score += 3;

    if (score <= 5) return { score: 25, label: 'ضعیف', color: 'bg-rose-500' };
    if (score <= 9) return { score: 50, label: 'متوسط', color: 'bg-amber-500' };
    if (score <= 13) return { score: 75, label: 'قوی', color: 'bg-emerald-500' };
    return { score: 100, label: 'بسیار امن و غیرقابل نفوذ', color: 'bg-emerald-600' };
  };

  const strength = calculateStrength(adminForm.password);

  // Submit Mode 1: Admin Password
  const handleSubmitAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminForm.fullName || !adminForm.email || !adminForm.password) {
      alert('لطفاً فیلدهای الزامی (نام، ایمیل و رمز عبور) را تکمیل نمایید.');
      return;
    }
    if (adminForm.password !== adminForm.confirmPassword) {
      alert('رمز عبور و تکرار آن یکسان نیستند.');
      return;
    }

    const token = 'sec_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setGeneratedCredentialModal({
      show: true,
      name: adminForm.fullName,
      email: adminForm.email,
      tempPassword: adminForm.password,
      expiryHours: 24,
      token: token,
    });

    // Add to audit log
    const newLog = {
      id: 'log-' + Date.now(),
      action: 'user_created_admin_password',
      user: 'ادمین سیستم',
      target: `${adminForm.fullName} (${adminForm.email})`,
      ip: '5.218.42.110',
      date: 'هم‌اکنون',
      severity: 'info',
      details: `ایجاد حساب وکیل با تحویل رمز امن و پرچم اجبار تغییر رمز در ورود اول. انقضای رمز اولیه: ۲۴ ساعت.`,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Submit Mode 2: Invitation Link
  const handleSubmitInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.fullName || !inviteForm.email) {
      alert('لطفاً نام و ایمیل وکیل را وارد فرمایید.');
      return;
    }

    const token = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setInviteSuccessNotice(
      `دعوت‌نامه رسمی با توکن اختصاصی ۶۴ کاراکتری برای "${inviteForm.fullName}" به آدرس "${inviteForm.email}" ارسال گردید. لینک دعوت به مدت ۷ روز معتبر است.`
    );

    const newLog = {
      id: 'log-' + Date.now(),
      action: 'invitation_sent',
      user: 'ادمین سیستم',
      target: `${inviteForm.fullName} (${inviteForm.email})`,
      ip: '5.218.42.110',
      date: 'هم‌اکنون',
      severity: 'info',
      details: `ارسال دعوت‌نامه ایمیلی فعال‌سازی حساب وکیل. توکن رمزنگاری‌شده: ${token.substring(0, 12)}... با مهلت ۷ روزه.`,
    };
    setAuditLogs(prev => [newLog, ...prev]);

    setTimeout(() => {
      setInviteSuccessNotice(null);
    }, 7000);
  };

  // Terminate a session
  const handleTerminateSession = (sessionId: string) => {
    setActiveSessions(prev => prev.filter(s => s.id !== sessionId));
    const newLog = {
      id: 'log-' + Date.now(),
      action: 'session_force_logout',
      user: 'ادمین سیستم',
      target: `بستن نشست با شناسه ${sessionId}`,
      ip: '5.218.42.110',
      date: 'هم‌اکنون',
      severity: 'warning',
      details: 'خاتمه اجباری نشست کاربری فعال از راه دور.',
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Header Bar */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#121E42] to-[#0B132B] border border-[#D4AF37]/30 shadow-xl shadow-black/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold mb-2 border border-[#D4AF37]/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>فاز ۱۶: سیستم احراز هویت دوگانه وکلا (Dual-Mode Lawyer Auth)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white flex items-center gap-3">
              <KeyRound className="w-8 h-8 text-[#D4AF37]" />
              مرکز مدیریت احراز هویت و امنیت حساب‌های وکلا
            </h1>
            <p className="text-gray-300 text-sm mt-1 max-w-2xl">
              تعریف حساب وکیل با دو سناریوی منعطف (تعیین رمز توسط ادمین با اجبار تغییر در اولین ورود یا ارسال دعوت‌نامه ایمیلی امن)، احراز هویت دو مرحله‌ای TOTP و پایش لحظه‌ای سشن‌ها.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs border border-white/10 transition-colors"
              >
                بازگشت به صفحه اصلی
              </button>
            )}
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-[#0B132B] font-bold text-xs shadow-md shadow-[#D4AF37]/20 transition-all hover:scale-105"
              >
                میز کار وکیل
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 p-1.5 rounded-xl bg-[#0B132B]/80 border border-white/10">
          <button
            onClick={() => setActiveTab('admin_password')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'admin_password'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>روش اول: تعیین رمز توسط ادمین</span>
          </button>

          <button
            onClick={() => setActiveTab('invitation')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'invitation'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>روش دوم: ارسال دعوت‌نامه ایمیلی</span>
          </button>

          <button
            onClick={() => setActiveTab('two_factor')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'two_factor'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>احراز هویت دو مرحله‌ای (2FA)</span>
          </button>

          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'sessions'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>مدیریت نشست‌ها و دستگاه‌ها ({activeSessions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('audit_log')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'audit_log'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <History className="w-4 h-4" />
            <span>لاگ وقایع امنیتی (Audit Log)</span>
          </button>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="max-w-6xl mx-auto">
        {/* TAB 1: ADMIN PASSWORD MODE */}
        {activeTab === 'admin_password' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#0B132B] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">افزودن حساب وکیل با تعیین رمز توسط ادمین</h2>
                    <p className="text-xs text-gray-400">مناسب وکلایی که مایلند رمز ورود اولیه توسط مدیریت صادر گردد.</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
                  اجبار تغییر رمز فعال
                </span>
              </div>

              <form onSubmit={handleSubmitAdminPassword} className="space-y-6">
                {/* Section A: Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-300 font-semibold mb-1.5">
                      نام و نام‌خانوادگی وکیل <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مانند: دکتر علیرضا افشار"
                      value={adminForm.fullName}
                      onChange={e => setAdminForm({ ...adminForm, fullName: e.target.value })}
                      className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 font-semibold mb-1.5">
                      پست الکترونیک (ایمیل رسمی) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="lawyer@example.com"
                      value={adminForm.email}
                      onChange={e => setAdminForm({ ...adminForm, email: e.target.value })}
                      className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 font-semibold mb-1.5">
                      شماره تلفن همراه (برای 2FA و احراز پیامکی) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="09123456789"
                      value={adminForm.mobile}
                      onChange={e => setAdminForm({ ...adminForm, mobile: e.target.value })}
                      className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 font-semibold mb-1.5">
                      سمت سازمانی در دفتر وکالت
                    </label>
                    <select
                      value={adminForm.role}
                      onChange={e => setAdminForm({ ...adminForm, role: e.target.value })}
                      className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="وکیل پایه یک">وکیل پایه یک دادگستری</option>
                      <option value="وکیل همکار">وکیل همکار پرونده</option>
                      <option value="کارآموز وکالت">کارآموز وکالت</option>
                      <option value="مشاور حقوقی">مشاور حقوقی ارشد</option>
                      <option value="منشی و مسئول دفتر">مسئول دفتر و ارجاعات</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 font-semibold mb-1.5">
                      شماره پروانه وکالت
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: ۲۴۵۸۱ / کانون مرکز"
                      value={adminForm.licenseNumber}
                      onChange={e => setAdminForm({ ...adminForm, licenseNumber: e.target.value })}
                      className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 font-semibold mb-1.5">
                      سال اخذ پروانه
                    </label>
                    <input
                      type="number"
                      placeholder="1395"
                      value={adminForm.licenseYear}
                      onChange={e => setAdminForm({ ...adminForm, licenseYear: e.target.value })}
                      className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Section B: Password Generator */}
                <div className="p-4 rounded-xl bg-[#121E42]/60 border border-[#D4AF37]/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                      <Lock className="w-4 h-4" />
                      تنظیم و تولید خودکار رمز عبور قدرتمند (۱۶ کاراکتر تصادفی)
                    </span>
                    <button
                      type="button"
                      onClick={generateStrongPassword}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      تولید رمز قوی با یک کلیک
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="رمز عبور اولیه"
                        value={adminForm.password}
                        onChange={e => setAdminForm({ ...adminForm, password: e.target.value })}
                        className="w-full bg-[#0B132B] border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white pl-10 font-mono tracking-wider"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-3 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="تکرار رمز عبور اولیه"
                        value={adminForm.confirmPassword}
                        onChange={e => setAdminForm({ ...adminForm, confirmPassword: e.target.value })}
                        className="w-full bg-[#0B132B] border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono tracking-wider"
                      />
                    </div>
                  </div>

                  {/* Password Strength Meter */}
                  {adminForm.password && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>میزان امنیت و تاب‌آوری رمز:</span>
                        <span className="font-bold text-white">{strength.label}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${strength.color}`}
                          style={{ width: `${strength.score}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>شامل حداقل ۲ حرف بزرگ، ۲ حرف کوچک، ۲ عدد و ۲ نماد استاندارد بدون کاراکترهای مشابه (مثل 0 و O).</span>
                  </div>
                </div>

                {/* Section C: Security Flags */}
                <div className="space-y-2.5 pt-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adminForm.forcePasswordReset}
                      onChange={e => setAdminForm({ ...adminForm, forcePasswordReset: e.target.checked })}
                      className="w-4 h-4 text-[#D4AF37] rounded accent-[#D4AF37]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">اجبار به تغییر رمز در اولین ورود (_password_reset_required)</span>
                      <span className="text-gray-400">وکیل در ورود نخست بلافاصله به صفحه تغییر رمز هدایت شده و تا تعیین رمز شخصی به سایر بخش‌ها دسترسی نخواهد داشت.</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adminForm.force2FA}
                      onChange={e => setAdminForm({ ...adminForm, force2FA: e.target.checked })}
                      className="w-4 h-4 text-[#D4AF37] rounded accent-[#D4AF37]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">اجبار فعال‌سازی احراز هویت دو مرحله‌ای (2FA Mandatory)</span>
                      <span className="text-gray-400">برای حفظ محرمانگی پرونده‌ها و استانداردهای کانون وکلا، راه‌اندازی اپلیکیشن Authenticator الزامی می‌شود.</span>
                    </div>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-[#0B132B] font-bold text-sm shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.02] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>ایجاد حساب و صدور لینک امن یکبارمصرف</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar Guidelines */}
            <div className="space-y-6">
              <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-[#D4AF37] mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  اصول امنیتی سناریوی رمز ادمین
                </h3>
                <ul className="space-y-2.5 text-xs text-gray-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-0.5">•</span>
                    <span><strong>عدم ذخیره به صورت متن ساده:</strong> تمامی رمزها پیش از درج در دیتابیس با استاندارد وردپرس <code className="text-[#D4AF37]">wp_hash_password</code> هش می‌شوند.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-0.5">•</span>
                    <span><strong>انقضای ۲۴ ساعته:</strong> در صورتی که وکیل ظرف ۲۴ ساعت وارد سامانه نشود، رمز موقت منقضی شده و درخواست صدور مجدد الزامی خواهد بود.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-0.5">•</span>
                    <span><strong>ثبت گزارش در Audit Log:</strong> نام ادمین صادرکننده، IP و ساعت ایجاد به همراه وضعیت سشن در لاگ رسمی ثبت می‌گردد.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>راهنمای پشتیبانی از وکلای ارشد</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  برخی همکاران ارشد تمایل دارند اطلاعات ورود آماده تحویل داده شود؛ این سیستم با ایجاد رمز و در عین حال اجبار به تغییر آن در اولین کلیک، تعادل کاملی میان آسایش کاربر و محرمانگی اسرار موکلان برقرار می‌کند.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVITATION BASED MODE */}
        {activeTab === 'invitation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#0B132B] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">ارسال دعوت‌نامه ایمیلی فعال‌سازی (مدرن و بدون افشای رمز)</h2>
                    <p className="text-xs text-gray-400">ادمین هرگز به رمز وکیل دسترسی نخواهد داشت؛ وکیل با کلیک روی لینک امن خود رمز را تعیین می‌کند.</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
                  استاندارد GDPR & Privacy
                </span>
              </div>

              {inviteSuccessNotice && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{inviteSuccessNotice}</span>
                </div>
              )}

              <form onSubmit={handleSubmitInvitation} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-300 font-semibold mb-1.5">
                      نام و نام‌خانوادگی وکیل مدعو <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="خانم وکیل نیلوفر شاکری"
                      value={inviteForm.fullName}
                      onChange={e => setInviteForm({ ...inviteForm, fullName: e.target.value })}
                      className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 font-semibold mb-1.5">
                      پست الکترونیک رسمی (ایمیل دعوت) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="n.shakeri@advocate.ir"
                      value={inviteForm.email}
                      onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })}
                      className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 font-semibold mb-1.5">
                      شماره موبایل جهت ارسال پیامک موازی (اختیاری)
                    </label>
                    <input
                      type="tel"
                      placeholder="09120000000"
                      value={inviteForm.mobile}
                      onChange={e => setInviteForm({ ...inviteForm, mobile: e.target.value })}
                      className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 font-semibold mb-1.5">
                      سمت سازمانی اختصاص داده شده
                    </label>
                    <select
                      value={inviteForm.role}
                      onChange={e => setInviteForm({ ...inviteForm, role: e.target.value })}
                      className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="وکیل همکار">وکیل همکار پرونده</option>
                      <option value="وکیل پایه یک">وکیل پایه یک دادگستری</option>
                      <option value="کارآموز وکالت">کارآموز وکالت</option>
                      <option value="مشاور حقوقی">مشاور ارشد حقوقی</option>
                    </select>
                  </div>
                </div>

                {/* Invitation Settings */}
                <div className="p-4 rounded-xl bg-[#121E42]/60 border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-white block">
                    تنظیمات انقضا و یادآوری خودکار دعوت‌نامه
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 text-xs text-gray-300">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <span>انقضای لینک در: <strong>۷ روز کاری</strong></span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-gray-300">
                      <input
                        type="checkbox"
                        checked={inviteForm.reminder24h}
                        onChange={e => setInviteForm({ ...inviteForm, reminder24h: e.target.checked })}
                        className="rounded accent-[#D4AF37]"
                      />
                      <span>یادآوری خودکار پس از ۲۴ ساعت</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-gray-300">
                      <input
                        type="checkbox"
                        checked={inviteForm.reminder72h}
                        onChange={e => setInviteForm({ ...inviteForm, reminder72h: e.target.checked })}
                        className="rounded accent-[#D4AF37]"
                      />
                      <span>یادآوری نهایی پس از ۷۲ ساعت</span>
                    </label>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>ارسال دعوت‌نامه ایمیلی امن (توکن ۶۴ بایتی)</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Invitation Preview Simulation */}
            <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                پیش‌نمایش ایمیل دریافتی توسط وکیل
              </h3>
              <div className="p-4 rounded-xl bg-[#121E42] border border-white/15 text-xs space-y-3 leading-relaxed">
                <div className="pb-2 border-b border-white/10 text-gray-400">
                  فرستنده: <span className="text-white">noreply@sedrazavi.com</span> (امضا شده با DKIM/SPF)
                </div>
                <div className="text-gray-300">
                  سلام <strong>{inviteForm.fullName || 'همکار گرامی'}</strong> عزیز،<br />
                  شما به عنوان <strong>{inviteForm.role}</strong> به سامانه جامع حقوقی دفتر وکالت دکتر سیده مریم رضوی دعوت شده‌اید.
                </div>
                <div className="p-3 rounded-lg bg-[#0B132B] border border-[#D4AF37]/30 text-center space-y-2">
                  <div className="text-[11px] text-gray-400">جهت تنظیم رمز اختصاصی و فعال‌سازی حساب خود کلیک فرمایید:</div>
                  <div className="inline-block px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0B132B] font-bold text-xs">
                    فعال‌سازی حساب کاربری و تعیین رمز
                  </div>
                  <div className="text-[10px] text-gray-400">این لینک اختصاصی حاوی توکن یکتا بوده و تا ۷ روز آینده معتبر است.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TWO FACTOR AUTHENTICATION (2FA) */}
        {activeTab === 'two_factor' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Setup Guide */}
            <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">راه‌اندازی ورود دو مرحله‌ای با Google Authenticator / Authy</h2>
                  <p className="text-xs text-gray-400">تولید رمز یکبارمصرف مبتنی بر زمان (TOTP) هر ۳۰ ثانیه یک‌بار.</p>
                </div>
              </div>

              {/* Step 1 & 2 */}
              <div className="p-4 rounded-xl bg-[#121E42]/60 border border-white/10 flex flex-col sm:flex-row items-center gap-6">
                {/* Simulated QR Code */}
                <div className="w-36 h-36 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-full h-full border-4 border-black border-dashed flex flex-col items-center justify-center text-black text-center text-[10px] font-mono">
                    <QrCode className="w-12 h-12 text-black mb-1" />
                    <span>QR: SedRazavi</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-white block">مرحله ۱: اسکن بارکد در اپلیکیشن</span>
                  <p className="text-gray-300">اپلیکیشن Google Authenticator یا Microsoft Authenticator را در گوشی باز کرده و بارکد روبرو را اسکن نمایید.</p>
                  <div className="pt-2">
                    <span className="text-[11px] text-gray-400 block">یا کلید مخفی زیر را دستی وارد کنید:</span>
                    <code className="text-[#D4AF37] font-mono font-bold text-xs bg-black/40 px-2 py-1 rounded border border-white/10 inline-block mt-1">
                      {mock2faSecret}
                    </code>
                  </div>
                </div>
              </div>

              {/* Step 3: Verification */}
              <div className="p-4 rounded-xl bg-[#121E42]/60 border border-white/10 space-y-3">
                <span className="text-xs font-bold text-white block">مرحله ۲: تأیید کد ۶ رقمی از روی گوشی</span>
                <div className="flex gap-3">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={twoFactorCodeInput}
                    onChange={e => setTwoFactorCodeInput(e.target.value)}
                    className="w-40 bg-[#0B132B] border border-white/20 rounded-xl px-3.5 py-2.5 text-center font-mono text-lg font-bold text-[#D4AF37] tracking-widest focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (twoFactorCodeInput.length === 6) {
                        setIs2faVerified(true);
                      } else {
                        alert('لطفاً کد ۶ رقمی را کامل وارد نمایید.');
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B132B] font-bold text-xs transition-all hover:scale-105"
                  >
                    تأیید و فعال‌سازی
                  </button>
                </div>

                {is2faVerified && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>احراز هویت دو مرحله‌ای با موفقیت فعال شد. از این پس در هر ورود کد از شما پرسیده خواهد شد.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Backup Codes */}
            <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                  کدهای پشتیبان اضطراری (Backup Codes)
                </h3>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(backupCodes.join('\n'));
                    setCopiedBackupCodes(true);
                    setTimeout(() => setCopiedBackupCodes(false), 2500);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs border border-white/10"
                >
                  {copiedBackupCodes ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBackupCodes ? 'کپی شد' : 'کپی همه کدها'}</span>
                </button>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                در صورتی که گوشی موبایل یا اپلیکیشن 2FA در دسترس نباشد، هر یک از این کدهای ۸ رقمی می‌تواند <strong>تنها یک بار</strong> برای ورود اضطراری به پنل وکیل استفاده شود.
              </p>

              <div className="grid grid-cols-2 gap-2.5 p-4 rounded-xl bg-[#121E42]/60 border border-white/10 font-mono text-center text-sm font-bold text-[#D4AF37]">
                {backupCodes.map((code, idx) => (
                  <div key={idx} className="p-2 rounded bg-[#0B132B] border border-white/5 tracking-wider">
                    {code}
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>کدهای پشتیبان را در محل امنی یادداشت کرده یا فایل متنی آن را نزد خود نگهداری فرمایید.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SESSIONS & DEVICES */}
        {activeTab === 'sessions' && (
          <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-[#D4AF37]" />
                  دستگاه‌ها و نشست‌های فعال همزمان (Concurrent Sessions Management)
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  مطابق ضوابط امنیتی، حداکثر ۳ دستگاه همزمان مجاز به اتصال به حساب هر وکیل هستند. نشست‌ها پس از ۳۰ دقیقه عدم فعالیت منقضی می‌گردند.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveSessions(prev => prev.filter(s => s.isCurrent));
                  alert('تمام نشست‌های دیگر با موفقیت بسته شدند.');
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all"
              >
                خروج از تمام نشست‌های دیگر (Force Logout Others)
              </button>
            </div>

            <div className="space-y-3">
              {activeSessions.map(session => (
                <div
                  key={session.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    session.isCurrent
                      ? 'bg-emerald-500/5 border-emerald-500/30'
                      : 'bg-[#121E42]/60 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      session.isCurrent ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-400'
                    }`}>
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{session.device}</span>
                        {session.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                            دستگاه جاری
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        <span>مرورگر: {session.browser}</span>
                        <span>آدرس آی‌پی: {session.ip}</span>
                        <span>آخرین فعالیت: {session.lastActivity}</span>
                      </div>
                    </div>
                  </div>

                  {!session.isCurrent && (
                    <button
                      onClick={() => handleTerminateSession(session.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold"
                    >
                      بستن نشست
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#121E42]/40 border border-white/10 text-xs text-gray-300 space-y-2">
              <span className="font-bold text-[#D4AF37] block">مکانیزم امنیتی Session Fingerprint:</span>
              <p className="leading-relaxed">
                هر درخواست با ترکیب هش‌شده‌ی <code className="text-[#D4AF37]">hash(IP[0..24] + UserAgent)</code> اعتبارسنجی می‌شود. در صورت تغییر ناگهانی امضای مرورگر یا شبکه، نشست فوراً باطل شده و کاربر جهت جلوگیری از Session Hijacking مجدداً به صفحه ورود هدایت می‌گردد.
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT LOG */}
        {activeTab === 'audit_log' && (
          <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-[#D4AF37]" />
                  دفتر کل وقایع احراز هویت و دسترسی وکلا (Audit Trail)
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  ثبت رسمی کلیه رویدادهای ایجاد حساب، تغییر رمز، ورود، خروج و موارد مشکوک با نگهداری ۹۰ روزه وفق الزامات حقوقی.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('خروجی CSV تمام وقایع ذخیره گردید.')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs border border-white/10"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>دانلود خروجی CSV</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="py-3 px-3">زمان</th>
                    <th className="py-3 px-3">نوع رویداد</th>
                    <th className="py-3 px-3">مجری رویداد</th>
                    <th className="py-3 px-3">طرف هدف</th>
                    <th className="py-3 px-3">آدرس IP</th>
                    <th className="py-3 px-3">سطح</th>
                    <th className="py-3 px-3">شرح جزئیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 font-mono text-gray-400 whitespace-nowrap">{log.date}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#D4AF37] whitespace-nowrap">{log.action}</td>
                      <td className="py-3 px-3 whitespace-nowrap">{log.user}</td>
                      <td className="py-3 px-3 whitespace-nowrap">{log.target}</td>
                      <td className="py-3 px-3 font-mono text-gray-400 whitespace-nowrap">{log.ip}</td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          log.severity === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          log.severity === 'warning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          log.severity === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-300 max-w-xs truncate" title={log.details}>
                        {log.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: CREDENTIALS DISPATCH CONFIRMATION */}
      {generatedCredentialModal && generatedCredentialModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" dir="rtl">
          <div className="bg-[#0B132B] border border-[#D4AF37]/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl shadow-black space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                اطلاعات ورود موقت وکیل صادر گردید
              </h3>
              <button
                onClick={() => setGeneratedCredentialModal(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              حساب کاربری برای <strong>{generatedCredentialModal.name}</strong> ایجاد شد. اطلاعات دسترسی امن زیر را کپی نموده و در اختیار وکیل قرار دهید:
            </p>

            <div className="p-4 rounded-xl bg-[#121E42] border border-white/15 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">نام کاربری / ایمیل:</span>
                <span className="text-white font-bold">{generatedCredentialModal.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">رمز عبور اولیه:</span>
                <span className="text-[#D4AF37] font-bold text-sm tracking-wider">{generatedCredentialModal.tempPassword}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400 text-[11px]">
                <span>مهلت اعتبار رمز موقت:</span>
                <span className="text-amber-400">۲۴ ساعت از اکنون</span>
              </div>
              <div className="flex items-center justify-between text-gray-400 text-[11px]">
                <span>وضعیت تغییر رمز:</span>
                <span className="text-emerald-400 font-bold">اجباری در نخستین ورود</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>به دلایل امنیتی، این اطلاعات تنها یک‌بار در اینجا به شما نشان داده می‌شود و در هیچ کجای دیتابیس به صورت متن ساده ذخیره نخواهد شد.</span>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => {
                  const text = `اطلاعات ورود به سامانه حقوقی:\nایمیل: ${generatedCredentialModal.email}\nرمز عبور: ${generatedCredentialModal.tempPassword}\n(توجه: در اولین ورود ملزم به تغییر این رمز خواهید بود)`;
                  navigator.clipboard.writeText(text);
                  setCopiedPassword(true);
                  setTimeout(() => setCopiedPassword(false), 2000);
                }}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5"
              >
                {copiedPassword ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPassword ? 'کپی شد' : 'کپی مشخصات'}</span>
              </button>

              <button
                onClick={() => setGeneratedCredentialModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B132B] font-bold text-xs"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
