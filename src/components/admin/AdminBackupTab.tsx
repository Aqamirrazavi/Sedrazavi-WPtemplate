import React, { useState } from 'react';
import {
  AdminBackupVersion,
  AutoBackupConfig,
  getStoredBackups,
  saveBackup,
  deleteBackup,
  getAutoBackupConfig,
  saveAutoBackupConfig,
} from '../../utils/adminBackupStorage';
import {
  LawyerSiteProfile,
  saveLawyerProfile,
} from '../../utils/lawyerCustomizationStorage';
import {
  HardDrive,
  Download,
  RotateCcw,
  Trash2,
  Calendar,
  Clock,
  ShieldCheck,
  PlusCircle,
  Check,
  AlertTriangle,
  Settings,
  FileArchive,
} from 'lucide-react';

interface AdminBackupTabProps {
  profile: LawyerSiteProfile;
  onUpdateProfile: (updated: LawyerSiteProfile) => void;
}

export const AdminBackupTab: React.FC<AdminBackupTabProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'manual' | 'versions' | 'auto'>('versions');

  const [backups, setBackups] = useState<AdminBackupVersion[]>(getStoredBackups());
  const [autoConfig, setAutoConfig] = useState<AutoBackupConfig>(getAutoBackupConfig());

  // Form for manual backup
  const [backupTitle, setBackupTitle] = useState('');
  const [backupDescription, setBackupDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleCreateManualBackup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    setTimeout(() => {
      const created = saveBackup(backupTitle, backupDescription, profile, 4);
      setBackups(getStoredBackups());
      setBackupTitle('');
      setBackupDescription('');
      setIsCreating(false);
      showNotification(`نسخه پشتیبان «${created.title}» با موفقیت ذخیره شد.`);
      setActiveSubTab('versions');
    }, 600);
  };

  const handleRestoreVersion = (backup: AdminBackupVersion) => {
    if (
      confirm(
        `آیا از بازیابی نسخه «${backup.title}» مطمئن هستید؟ این کار تنظیمات پروفایل وکیل و پوسته را به زمان ${backup.createdAt} بازمی‌گرداند.`
      )
    ) {
      saveLawyerProfile(backup.profileSnapshot);
      onUpdateProfile(backup.profileSnapshot);
      showNotification(`سیستم با موفقیت به نسخه «${backup.title}» بازیابی شد.`);
    }
  };

  const handleDeleteVersion = (id: string) => {
    if (confirm('آیا از حذف این نسخه پشتیبان مطمئن هستید؟ این عمل غیرقابل بازگشت است.')) {
      const remaining = deleteBackup(id);
      setBackups(remaining);
      showNotification('نسخه پشتیبان مورد نظر با موفقیت حذف گردید.');
    }
  };

  const handleDownloadBackupJson = (backup: AdminBackupVersion) => {
    const dataStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sedrazavi-backup-${backup.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveAutoConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveAutoBackupConfig(autoConfig);
    showNotification('تنظیمات زمان‌بندی پشتیبان‌گیری خودکار ذخیره شد.');
  };

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
              سیستم پشتیبان‌گیری و بازگردانی (Backup & Rollback)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            ۳ تب اختصاصی فاز ۳: پشتیبان‌گیری دستی، تاریخچه نسخه‌ها با بازیابی فوری و زمان‌بندی خودکار.
          </p>
        </div>

        {/* 3 Subtabs Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveSubTab('versions')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'versions'
                ? 'bg-white dark:bg-[#0B132B] text-[#D4AF37] shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <FileArchive className="w-3.5 h-3.5" />
            <span>۱. تاریخچه نسخه‌ها ({backups.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('manual')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'manual'
                ? 'bg-white dark:bg-[#0B132B] text-emerald-600 dark:text-emerald-400 shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>۲. پشتیبان‌گیری دستی</span>
          </button>

          <button
            onClick={() => setActiveSubTab('auto')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'auto'
                ? 'bg-white dark:bg-[#0B132B] text-indigo-600 dark:text-indigo-400 shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>۳. زمان‌بندی خودکار</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 1. Version History & Restore Tab */}
      {activeSubTab === 'versions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
              لیست نسخه‌های پشتیبان موجود در سرور و امکان بازگردانی (Rollback):
            </span>
            <button
              onClick={() => setActiveSubTab('manual')}
              className="btn-gold px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>ایجاد نسخه پشتیبان جدید</span>
            </button>
          </div>

          <div className="space-y-3">
            {backups.map((bak) => (
              <div
                key={bak.id}
                className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-[#D4AF37]/50"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#0B132B] dark:text-white">
                      {bak.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] font-mono text-[11px] font-bold">
                      {bak.sizeKb} KB
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {bak.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>تاریخ ایجاد: {bak.createdAt}</span>
                    </span>
                    <span>توسط: {bak.author}</span>
                    <span className="font-mono">
                      WP: {bak.systemMeta?.wpVersion} | PHP: {bak.systemMeta?.phpVersion}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleRestoreVersion(bak)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-amber-500/30"
                    title="بازیابی این نسخه"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>بازیابی این نسخه (Rollback)</span>
                  </button>

                  <button
                    onClick={() => handleDownloadBackupJson(bak)}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
                    title="دانلود فایل JSON"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteVersion(bak.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                    title="حذف نسخه"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Manual Backup Creation Tab */}
      {activeSubTab === 'manual' && (
        <form onSubmit={handleCreateManualBackup} className="space-y-4 max-w-xl">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong>پشتیبان‌گیری دستی:</strong> از کلیه تنظیمات اختصاصی وکیل، رنگ‌ها، بنرها، اعضای تیم، اطلاعات نقشه و دیتابیس استعلام پرونده‌ها اسنپ‌شات تهیه می‌شود.
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              عنوان نسخه پشتیبان:
            </label>
            <input
              type="text"
              placeholder="مثال: پشتیبان قبل از بارگذاری لوایح جدید دیوان"
              value={backupTitle}
              onChange={(e) => setBackupTitle(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              توضیحات و یادداشت نسخه:
            </label>
            <textarea
              rows={3}
              placeholder="توضیحاتی در مورد دلایل تهیه این نسخه یا تغییرات اعمال شده بنویسید..."
              value={backupDescription}
              onChange={(e) => setBackupDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <HardDrive className={`w-4 h-4 ${isCreating ? 'animate-spin' : ''}`} />
            <span>{isCreating ? 'در حال تهیه پشتیبان...' : 'تهیه و ذخیره نسخه پشتیبان فوری'}</span>
          </button>
        </form>
      )}

      {/* 3. Automatic Backup Configuration Tab */}
      {activeSubTab === 'auto' && (
        <form onSubmit={handleSaveAutoConfig} className="space-y-5 max-w-xl">
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200">
            <strong>کرون‌جاب خودکار وردپرس (WP-Cron):</strong> تهیه منظم نسخه‌های پشتیبان در پس‌زمینه بدون افت سرعت لود سایت.
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoConfig.enabled}
              onChange={(e) =>
                setAutoConfig({ ...autoConfig, enabled: e.target.checked })
              }
              className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
            />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              فعال‌سازی سیستم پشتیبان‌گیری دوره‌ای خودکار
            </span>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                دوره تکرار (فرکانس):
              </label>
              <select
                value={autoConfig.frequency}
                onChange={(e) =>
                  setAutoConfig({ ...autoConfig, frequency: e.target.value as any })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs"
              >
                <option value="daily">روزانه (ساعت ۰۳:۰۰ بامداد)</option>
                <option value="weekly">هفتگی (جمعه‌ها ۰۳:۰۰ بامداد)</option>
                <option value="monthly">ماهانه (اول هر ماه شمسی)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                حداکثر نسخه‌های نگهداری:
              </label>
              <input
                type="number"
                min={2}
                max={30}
                value={autoConfig.retentionCount}
                onChange={(e) =>
                  setAutoConfig({ ...autoConfig, retentionCount: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
              />
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoConfig.backupDatabase}
                onChange={(e) =>
                  setAutoConfig({ ...autoConfig, backupDatabase: e.target.checked })
                }
                className="w-4 h-4 rounded text-[#D4AF37]"
              />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                پشتیبان‌گیری از جداول پایگاه داده پرونده‌ها و تنظیمات
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoConfig.backupMedia}
                onChange={(e) =>
                  setAutoConfig({ ...autoConfig, backupMedia: e.target.checked })
                }
                className="w-4 h-4 rounded text-[#D4AF37]"
              />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                فشرده‌سازی و پشتیبان‌گیری از کتابخانه رسانه‌ها و تصاویر وکیل
              </span>
            </label>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-[11px] text-gray-500 space-y-1">
            <div>آخرین اجرای موفق: <strong className="text-gray-700 dark:text-gray-300">{autoConfig.lastRun || 'ندارد'}</strong></div>
            <div>موعد اجرای بعدی: <strong className="text-gray-700 dark:text-gray-300">{autoConfig.nextRun || 'ندارد'}</strong></div>
          </div>

          <button
            type="submit"
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            <span>ذخیره تنظیمات خودکار</span>
          </button>
        </form>
      )}
    </div>
  );
};
