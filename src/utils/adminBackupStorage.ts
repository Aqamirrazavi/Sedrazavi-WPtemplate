import { LawyerSiteProfile, DEFAULT_LAWYER_PROFILE } from './lawyerCustomizationStorage';

export interface AdminBackupVersion {
  id: string;
  title: string;
  description: string;
  createdAt: string; // Persian date string or ISO
  casesCount: number;
  sizeKb: number;
  author: string;
  profileSnapshot: LawyerSiteProfile;
  systemMeta: {
    wpVersion: string;
    phpVersion: string;
    elementorVersion: string;
  };
}

export interface AutoBackupConfig {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  retentionCount: number;
  backupDatabase: boolean;
  backupMedia: boolean;
  lastRun?: string;
  nextRun?: string;
}

const BACKUP_STORAGE_KEY = 'sedrazavi_admin_backups_v1';
const AUTO_BACKUP_CONFIG_KEY = 'sedrazavi_auto_backup_config_v1';

const INITIAL_BACKUPS: AdminBackupVersion[] = [
  {
    id: 'bak-14030615-init',
    title: 'نسخه پشتیبان پس از استقرار اولیه فاز ۲ و ویجت‌های المنتور',
    description: 'شامل تنظیمات احادیث، دکمه طلایی شناور و پالت شب و روز دفتر ونک',
    createdAt: '۱۴۰۳/۰۶/۱۵ - ۱۴:۳۰',
    casesCount: 4,
    sizeKb: 284,
    author: 'دکتر سیده مریم رضوی (مدیر ارشد)',
    profileSnapshot: DEFAULT_LAWYER_PROFILE,
    systemMeta: {
      wpVersion: '6.4.3',
      phpVersion: '8.2.14',
      elementorVersion: '3.21.4',
    },
  },
  {
    id: 'bak-14030530-base',
    title: 'پشتیبان پایگاه داده پرونده‌ها و تنظیمات کانون وکلای مرکز',
    description: 'نسخه پایدار قبل از تغییرات گسترده در بخش استعلام آنلاین و پیامک',
    createdAt: '۱۴۰۳/۰۵/۳۰ - ۱۱:۰۰',
    casesCount: 3,
    sizeKb: 215,
    author: 'سیستم خودکار وردپرس',
    profileSnapshot: DEFAULT_LAWYER_PROFILE,
    systemMeta: {
      wpVersion: '6.4.2',
      phpVersion: '8.1.20',
      elementorVersion: '3.20.0',
    },
  },
];

export function getStoredBackups(): AdminBackupVersion[] {
  if (typeof window === 'undefined') return INITIAL_BACKUPS;
  try {
    const raw = localStorage.getItem(BACKUP_STORAGE_KEY);
    if (!raw) return INITIAL_BACKUPS;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading backups from storage:', err);
    return INITIAL_BACKUPS;
  }
}

export function saveBackup(
  title: string,
  description: string,
  profile: LawyerSiteProfile,
  casesCount: number = 4
): AdminBackupVersion {
  const current = getStoredBackups();
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateStr = formatter.format(now).replace(',', ' -');

  const newBackup: AdminBackupVersion = {
    id: `bak-${Date.now()}`,
    title: title.trim() || 'پشتیبان دستی اختصاصی',
    description: description.trim() || 'تهیه نسخه پشتیبان دستی از پیشخوان وکیل',
    createdAt: dateStr,
    casesCount,
    sizeKb: Math.floor(250 + Math.random() * 80),
    author: 'وکیل پایه یک (کاربر جاری)',
    profileSnapshot: profile,
    systemMeta: {
      wpVersion: '6.4.3',
      phpVersion: '8.2.14',
      elementorVersion: '3.21.4',
    },
  };

  const updated = [newBackup, ...current];
  try {
    localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to persist backup:', err);
  }
  return newBackup;
}

export function deleteBackup(id: string): AdminBackupVersion[] {
  const current = getStoredBackups();
  const filtered = current.filter((b) => b.id !== id);
  try {
    localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete backup:', err);
  }
  return filtered;
}

export function getAutoBackupConfig(): AutoBackupConfig {
  const defaultConfig: AutoBackupConfig = {
    enabled: true,
    frequency: 'weekly',
    retentionCount: 5,
    backupDatabase: true,
    backupMedia: false,
    lastRun: '۱۴۰۳/۰۶/۱۰',
    nextRun: '۱۴۰۳/۰۶/۱۷',
  };
  if (typeof window === 'undefined') return defaultConfig;
  try {
    const raw = localStorage.getItem(AUTO_BACKUP_CONFIG_KEY);
    return raw ? JSON.parse(raw) : defaultConfig;
  } catch {
    return defaultConfig;
  }
}

export function saveAutoBackupConfig(cfg: AutoBackupConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AUTO_BACKUP_CONFIG_KEY, JSON.stringify(cfg));
  } catch (err) {
    console.error('Error saving auto backup config:', err);
  }
}
