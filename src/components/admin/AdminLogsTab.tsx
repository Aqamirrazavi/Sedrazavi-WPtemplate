import React, { useState } from 'react';
import {
  AdminErrorLogItem,
  AdminAuditEventItem,
  AdminLogSettings,
  LogLevel,
  getStoredErrorLogs,
  getStoredAuditLogs,
  clearErrorLogs,
  getLogSettings,
  saveLogSettings,
} from '../../utils/adminLogsStorage';
import {
  FileText,
  AlertOctagon,
  ShieldCheck,
  Settings,
  Trash2,
  Filter,
  Check,
  AlertTriangle,
  Info,
  Clock,
  User,
  Activity,
  Mail,
} from 'lucide-react';

export const AdminLogsTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'errors' | 'events' | 'settings'>('errors');

  const [errorLogs, setErrorLogs] = useState<AdminErrorLogItem[]>(getStoredErrorLogs());
  const [auditEvents, setAuditEvents] = useState<AdminAuditEventItem[]>(getStoredAuditLogs());
  const [logSettings, setLogSettings] = useState<AdminLogSettings>(getLogSettings());

  // Error filter
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleClearLogs = () => {
    if (confirm('آیا از پاکسازی تمام خطاهای ثبت‌شده در لاگ مطمئن هستید؟')) {
      clearErrorLogs();
      setErrorLogs([]);
      showNotification('کلیه لاگ‌های خطا با موفقیت پاکسازی شدند.');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveLogSettings(logSettings);
    showNotification('تنظیمات سیستم لاگ‌گیری و دیباگ ذخیره شد.');
  };

  const filteredErrors = errorLogs.filter((err) => {
    if (selectedLevel === 'ALL') return true;
    return err.level === selectedLevel;
  });

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
              سیستم لاگ‌گیری، وقایع امنیتی و دیباگ (فاز ۳)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            ۳ تب فاز ۳: ثبت خطاهای هسته و پیامک، ردگیری رویدادهای کاربران و تنظیمات حالت اشکال‌زدایی.
          </p>
        </div>

        {/* 3 Subtabs Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveSubTab('errors')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'errors'
                ? 'bg-white dark:bg-[#0B132B] text-red-600 dark:text-red-400 shadow-sm border border-red-500/30'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>۱. خطاهای خطا ({errorLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('events')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'events'
                ? 'bg-white dark:bg-[#0B132B] text-sky-600 dark:text-sky-400 shadow-sm border border-sky-500/30'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>۲. رویدادها و وقایع امنیتی ({auditEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('settings')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'settings'
                ? 'bg-white dark:bg-[#0B132B] text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>۳. تنظیمات لاگ و دیباگ</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. Error Logs Tab */}
      {activeSubTab === 'errors' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                فیلتر بر اساس سطح خطا:
              </span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs"
              >
                <option value="ALL">همه موارد ({errorLogs.length})</option>
                <option value="CRITICAL">بحرانی (CRITICAL)</option>
                <option value="ERROR">خطا (ERROR)</option>
                <option value="WARNING">هشدار (WARNING)</option>
                <option value="INFO">اطلاعات (INFO)</option>
              </select>
            </div>

            <button
              onClick={handleClearLogs}
              disabled={errorLogs.length === 0}
              className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-1.5 border border-red-200 dark:border-red-800 disabled:opacity-40"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>پاکسازی کامل لاگ‌های خطا</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {filteredErrors.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-500">
                هیچ خطایی در این دسته یافت نشد. سیستم در سلامت کامل است.
              </div>
            ) : (
              filteredErrors.map((err) => (
                <div
                  key={err.id}
                  className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/70 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                          err.level === 'CRITICAL'
                            ? 'bg-red-600 text-white'
                            : err.level === 'ERROR'
                            ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                            : err.level === 'WARNING'
                            ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                            : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                        }`}
                      >
                        {err.level}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#0B132B] dark:text-white">
                        {err.source}
                      </span>
                    </div>

                    <span className="text-[11px] text-gray-500 font-mono">
                      {err.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
                    {err.message}
                  </p>

                  {err.file && (
                    <div className="text-[10px] text-gray-500 font-mono">
                      فایل: {err.file} {err.line ? `| خط: ${err.line}` : ''}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 2. Audit Events Tab */}
      {activeSubTab === 'events' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            ثبت لاگ‌های امنیتی ورود کاربران، تغییرات پرونده‌ها و تنظیمات وکیل:
          </div>

          <div className="space-y-2">
            {auditEvents.map((event) => (
              <div
                key={event.id}
                className="p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                      {event.category}
                    </span>
                    <span className="text-xs font-bold text-[#0B132B] dark:text-white">
                      {event.action}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-[#D4AF37]" />
                      <span>{event.user}</span>
                    </span>
                    <span className="font-mono">IP: {event.ipAddress}</span>
                    {event.details && <span>| {event.details}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      event.status === 'موفق'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-amber-500/10 text-amber-600'
                    }`}
                  >
                    {event.status}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    {event.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Log Settings Tab */}
      {activeSubTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-5 max-w-xl">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong>پیکربندی لاگ‌گیری و دیباگ:</strong> فعال بودن WP_DEBUG_LOG و ارسال خودکار ایمیل در صورت وقوع خطای غیرمنتظره.
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={logSettings.debugMode}
              onChange={(e) =>
                setLogSettings({ ...logSettings, debugMode: e.target.checked })
              }
              className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
            />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              فعال‌سازی حالت اشکال‌زدایی عمیق (WP_DEBUG & Audit Tracking)
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={logSettings.emailAlertsOnCritical}
              onChange={(e) =>
                setLogSettings({
                  ...logSettings,
                  emailAlertsOnCritical: e.target.checked,
                })
              }
              className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
            />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              ارسال فوری ایمیل هشدار به وکیل در صورت خطای بحرانی (Critical)
            </span>
          </label>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              پست الکترونیکی دریافت هشدارهای فنی:
            </label>
            <input
              type="email"
              value={logSettings.alertEmail}
              onChange={(e) =>
                setLogSettings({ ...logSettings, alertEmail: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                مدت نگهداری لاگ‌ها (روز):
              </label>
              <input
                type="number"
                min={7}
                max={90}
                value={logSettings.logRetentionDays}
                onChange={(e) =>
                  setLogSettings({
                    ...logSettings,
                    logRetentionDays: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                حداکثر حجم فایل لاگ (MB):
              </label>
              <input
                type="number"
                min={5}
                max={100}
                value={logSettings.maxFileSizeMb}
                onChange={(e) =>
                  setLogSettings({
                    ...logSettings,
                    maxFileSizeMb: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            <span>ذخیره تنظیمات لاگ</span>
          </button>
        </form>
      )}
    </div>
  );
};
