export type LogLevel = 'ERROR' | 'WARNING' | 'CRITICAL' | 'INFO';

export interface AdminErrorLogItem {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
  file?: string;
  line?: number | string;
  stack?: string;
}

export interface AdminAuditEventItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: 'پرونده‌ها' | 'امنیت' | 'تنظیمات' | 'پیامک' | 'رزرو';
  ipAddress: string;
  status: 'موفق' | 'ناموفق' | 'هشدار';
  details?: string;
}

export interface AdminLogSettings {
  debugMode: boolean;
  logRetentionDays: number;
  emailAlertsOnCritical: boolean;
  alertEmail: string;
  maxFileSizeMb: number;
}

const ERROR_LOGS_KEY = 'sedrazavi_error_logs_v1';
const AUDIT_LOGS_KEY = 'sedrazavi_audit_logs_v1';
const LOG_SETTINGS_KEY = 'sedrazavi_log_settings_v1';

const INITIAL_ERROR_LOGS: AdminErrorLogItem[] = [
  {
    id: 'err-101',
    timestamp: '۱۴۰۳/۰۶/۱۵ - ۱۶:۲۲:۱۰',
    level: 'WARNING',
    source: 'includes/otp-auth-integration.php',
    message: 'تاخیر در پاسخ درگاه پیامک کاوه‌نگار (زمان پاسخ: ۱.۴ ثانیه)',
    file: 'otp-auth-integration.php',
    line: 1468,
  },
  {
    id: 'err-102',
    timestamp: '۱۴۰۳/۰۶/۱۵ - ۱۴:۱۵:۰۳',
    level: 'INFO',
    source: 'includes/case-tracking.php',
    message: 'استعلام موفق پرونده ۱۴۰۳-۰۰۱ توسط موکل بدون خطای امنیتی',
    file: 'case-tracking.php',
    line: 624,
  },
  {
    id: 'err-103',
    timestamp: '۱۴۰۳/۰۶/۱۴ - ۰۹:۴۰:۵۰',
    level: 'ERROR',
    source: 'elementor-widgets.php',
    message: 'ویجت sedrazavi_banner_slider در کش المنتور بازخوانی شد.',
    file: 'elementor-widgets.php',
    line: 855,
  },
  {
    id: 'err-104',
    timestamp: '۱۴۰۳/۰۶/۱۳ - ۱۸:۰۵:۱۴',
    level: 'CRITICAL',
    source: 'includes/database-resilience.php',
    message: 'تلاش ناموفق برای دسترسی به آدرس پرونده بدون اعتبارسنجی توکن نانس',
    file: 'database-resilience.php',
    line: 412,
  },
];

const INITIAL_AUDIT_LOGS: AdminAuditEventItem[] = [
  {
    id: 'aud-201',
    timestamp: '۱۴۰۳/۰۶/۱۵ - ۱۷:۳۰',
    user: 'دکتر سیده مریم رضوی',
    action: 'ویرایش مرحله دادرسی پرونده کلاسه ۱۴۰۳-۰۰۲ به تبادل لوایح',
    category: 'پرونده‌ها',
    ipAddress: '178.252.189.44',
    status: 'موفق',
    details: 'شعبه ۱۲ دادگاه تجدیدنظر استان تهران',
  },
  {
    id: 'aud-202',
    timestamp: '۱۴۰۳/۰۶/۱۵ - ۱۶:۱۰',
    user: 'موکل (۰۹۱۲۳۴۵۶۷۸۹)',
    action: 'ورود به پرتال موکلین از طریق رمز یکبار مصرف پیامکی',
    category: 'امنیت',
    ipAddress: '2.185.120.91',
    status: 'موفق',
    details: 'اعتبارسنجی با شماره همراه ثبت‌شده',
  },
  {
    id: 'aud-203',
    timestamp: '۱۴۰۳/۰۶/۱۴ - ۱۱:۲۵',
    user: 'دکتر سیده مریم رضوی',
    action: 'تغییر تنظیمات پالت تم و ذخیره‌سازی در حافظه محلی',
    category: 'تنظیمات',
    ipAddress: '178.252.189.44',
    status: 'موفق',
  },
  {
    id: 'aud-204',
    timestamp: '۱۴۰۳/۰۶/۱۴ - ۱۰:۰۵',
    user: 'مراجع ناشناس (مهمان)',
    action: 'ثبت درخواست تماس فوری بدون ثبت‌نام (کد پیگیری CB-782190)',
    category: 'رزرو',
    ipAddress: '5.121.80.12',
    status: 'موفق',
    details: 'موضوع: مشاوره فوری ملکی و سرقفلی',
  },
  {
    id: 'aud-205',
    timestamp: '۱۴۰۳/۰۶/۱۳ - ۲۳:۱۵',
    user: 'سیستم خودکار',
    action: 'تلاش ورود ناموفق با رمز عبور اشتباه به پیشخوان مدیریت',
    category: 'امنیت',
    ipAddress: '194.26.29.11',
    status: 'هشدار',
    details: '۳ بار تلاش ناموفق - IP به مدت ۳۰ دقیقه مسدود شد',
  },
];

export function getStoredErrorLogs(): AdminErrorLogItem[] {
  if (typeof window === 'undefined') return INITIAL_ERROR_LOGS;
  try {
    const raw = localStorage.getItem(ERROR_LOGS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_ERROR_LOGS;
  } catch {
    return INITIAL_ERROR_LOGS;
  }
}

export function getStoredAuditLogs(): AdminAuditEventItem[] {
  if (typeof window === 'undefined') return INITIAL_AUDIT_LOGS;
  try {
    const raw = localStorage.getItem(AUDIT_LOGS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_AUDIT_LOGS;
  } catch {
    return INITIAL_AUDIT_LOGS;
  }
}

export function clearErrorLogs(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ERROR_LOGS_KEY, JSON.stringify([]));
  } catch (err) {
    console.error('Error clearing error logs:', err);
  }
}

export function getLogSettings(): AdminLogSettings {
  const defaultSettings: AdminLogSettings = {
    debugMode: true,
    logRetentionDays: 30,
    emailAlertsOnCritical: true,
    alertEmail: 'dr.razavi.law@gmail.com',
    maxFileSizeMb: 25,
  };
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const raw = localStorage.getItem(LOG_SETTINGS_KEY);
    return raw ? JSON.parse(raw) : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveLogSettings(settings: AdminLogSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOG_SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving log settings:', err);
  }
}
