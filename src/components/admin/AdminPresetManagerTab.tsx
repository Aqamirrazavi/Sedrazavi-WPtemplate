import React, { useState } from 'react';
import {
  Briefcase,
  Code,
  Compass,
  Globe,
  Activity,
  Box,
  Check,
  Save,
  Download,
  Sliders,
  Palette,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { INDUSTRY_PRESETS, IndustryPreset } from '../../data/industryPresets';
import { usePresetConfig } from '../../hooks/usePresetConfig';

export const AdminPresetManagerTab: React.FC = () => {
  const { preset, changePreset, updateOverrides, modularSettings, updateModular } = usePresetConfig();

  const [activeSubTab, setActiveSubTab] = useState<'presets' | 'customize' | 'demo' | 'modular'>('presets');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Editable fields for customizer
  const [customTitle, setCustomTitle] = useState(preset.site_title);
  const [customTagline, setCustomTagline] = useState(preset.site_tagline);
  const [customHeroTitle, setCustomHeroTitle] = useState(preset.hero_title);
  const [customHeroDesc, setCustomHeroDesc] = useState(preset.hero_desc);
  const [customCtaPrimary, setCustomCtaPrimary] = useState(preset.hero_cta_primary);
  const [customClientTerm, setCustomClientTerm] = useState(preset.terms.client);
  const [customCaseTerm, setCustomCaseTerm] = useState(preset.terms.case);
  const [customInquiryTerm, setCustomInquiryTerm] = useState(preset.terms.inquiry);
  const [customBookingTerm, setCustomBookingTerm] = useState(preset.terms.booking);

  // Update form inputs when preset changes
  const handleSelectPreset = (id: string) => {
    changePreset(id);
    const selected = INDUSTRY_PRESETS[id];
    if (selected) {
      setCustomTitle(selected.site_title);
      setCustomTagline(selected.site_tagline);
      setCustomHeroTitle(selected.hero_title);
      setCustomHeroDesc(selected.hero_desc);
      setCustomCtaPrimary(selected.hero_cta_primary);
      setCustomClientTerm(selected.terms.client);
      setCustomCaseTerm(selected.terms.case);
      setCustomInquiryTerm(selected.terms.inquiry);
      setCustomBookingTerm(selected.terms.booking);
    }
    showToast(`صنف سایت به «${selected?.name || id}» تغییر یافت.`);
  };

  const handleSaveCustomization = (e: React.FormEvent) => {
    e.preventDefault();
    updateOverrides({
      site_title: customTitle,
      site_tagline: customTagline,
      hero_title: customHeroTitle,
      hero_desc: customHeroDesc,
      hero_cta_primary: customCtaPrimary,
      terms: {
        ...preset.terms,
        client: customClientTerm,
        case: customCaseTerm,
        inquiry: customInquiryTerm,
        booking: customBookingTerm,
      },
    });
    showToast('شخصی‌سازی متون و اصطلاحات با موفقیت ذخیره شد.');
  };

  const handleResetToDefault = () => {
    const base = INDUSTRY_PRESETS[preset.id];
    if (base) {
      setCustomTitle(base.site_title);
      setCustomTagline(base.site_tagline);
      setCustomHeroTitle(base.hero_title);
      setCustomHeroDesc(base.hero_desc);
      setCustomCtaPrimary(base.hero_cta_primary);
      setCustomClientTerm(base.terms.client);
      setCustomCaseTerm(base.terms.case);
      setCustomInquiryTerm(base.terms.inquiry);
      setCustomBookingTerm(base.terms.booking);
      updateOverrides(base);
      showToast('تنظیمات به مقادیر پیش‌فرض صنف بازگردانده شد.');
    }
  };

  const [isImporting, setIsImporting] = useState(false);
  const handleImportDemo = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      showToast(`محتوای دموی نمونه شامل ۴ خدمت اختصاصی و تنظیمات صنف «${preset.name}» با موفقیت درون‌ریزی شد.`);
    }, 800);
  };

  const showToast = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 4000);
  };

  const getPresetIcon = (id: string) => {
    switch (id) {
      case 'lawyer': return <Briefcase className="w-5 h-5" />;
      case 'web_agency': return <Code className="w-5 h-5" />;
      case 'engineering': return <Compass className="w-5 h-5" />;
      case 'corporate': return <Globe className="w-5 h-5" />;
      case 'doctor': return <Activity className="w-5 h-5" />;
      case 'project_saas': return <Box className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast alert */}
      {saveSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg text-emerald-800 dark:text-emerald-200 text-sm flex items-center justify-between transition-all">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{saveSuccess}</span>
          </div>
          <button onClick={() => setSaveSuccess(null)} className="text-xs opacity-75 hover:opacity-100">بستن</button>
        </div>
      )}

      {/* Horizontal GitHub-style Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto text-sm">
        <button
          onClick={() => setActiveSubTab('presets')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
            activeSubTab === 'presets'
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>انتخابگر صنف سایت (۶ حالت)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('customize')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
            activeSubTab === 'customize'
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>شخصی‌سازی متون و اصطلاحات</span>
        </button>
        <button
          onClick={() => setActiveSubTab('modular')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
            activeSubTab === 'modular'
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>ماژولار و خلوت‌سازی داشبورد</span>
        </button>
        <button
          onClick={() => setActiveSubTab('demo')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
            activeSubTab === 'demo'
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>درون‌ریزی دموهای آماده</span>
        </button>
      </div>

      {/* Tab 1: Industry Presets Selector */}
      {activeSubTab === 'presets' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">انتخاب کاربری قالب و افزونه</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                با انتخاب هر صنف، تمامی عناوین، خدمات، متون هیرو، اصطلاحات پیگیری و پالت رنگی به صورت آنی تغییر می‌یابند.
              </p>
            </div>
            <div className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md">
              صنف فعال: <strong className="text-slate-800 dark:text-slate-200">{preset.name}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(INDUSTRY_PRESETS).map((item) => {
              const isSelected = preset.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectPreset(item.id)}
                  className={`cursor-pointer rounded-xl p-4 border transition-all text-right relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800/80 shadow-sm ring-1 ring-slate-900 dark:ring-white'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                          style={{ backgroundColor: item.accent_color }}
                        >
                          {getPresetIcon(item.id)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                          <span className="text-[11px] text-slate-400 font-mono">{item.english_name}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                      {item.hero_desc}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
                      <div className="flex justify-between">
                        <span>اصطلاح مخاطب:</span>
                        <strong className="text-slate-700 dark:text-slate-300">{item.terms.client}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>اصطلاح پیگیری:</span>
                        <strong className="text-slate-700 dark:text-slate-300">{item.terms.case}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 flex items-center justify-between text-xs">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.accent_color }}
                    />
                    <button
                      type="button"
                      className={`text-xs px-2.5 py-1 rounded transition-colors ${
                        isSelected
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? 'فعال است ✓' : 'فعال‌سازی این صنف'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Granular Customization */}
      {activeSubTab === 'customize' && (
        <form onSubmit={handleSaveCustomization} className="space-y-5 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">شخصی‌سازی متون صنف «{preset.name}»</h3>
              <p className="text-xs text-slate-500 mt-0.5">می‌توانید تک‌تک متون و عناوین را مطابق سلیقه یا برند خود تغییر دهید.</p>
            </div>
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>بازنشانی به پیش‌فرض</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">عنوان کامل وب‌سایت</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">شعار سایت (Tagline)</label>
              <input
                type="text"
                value={customTagline}
                onChange={(e) => setCustomTagline(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">تیتر اصلی هیرو (Hero Title)</label>
              <input
                type="text"
                value={customHeroTitle}
                onChange={(e) => setCustomHeroTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">توضیحات معرفی هیرو (Hero Description)</label>
              <textarea
                rows={2}
                value={customHeroDesc}
                onChange={(e) => setCustomHeroDesc(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">اصطلاحات تخصصی صنف (Terminology)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 mb-1">واژه مشتری/کاربر:</label>
                <input
                  type="text"
                  value={customClientTerm}
                  onChange={(e) => setCustomClientTerm(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">واژه پروژه/پرونده:</label>
                <input
                  type="text"
                  value={customCaseTerm}
                  onChange={(e) => setCustomCaseTerm(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">عنوان فرم نوبت/رزرو:</label>
                <input
                  type="text"
                  value={customBookingTerm}
                  onChange={(e) => setCustomBookingTerm(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">عنوان فرم پیگیری:</label>
                <input
                  type="text"
                  value={customInquiryTerm}
                  onChange={(e) => setCustomInquiryTerm(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره تغییرات سفارشی</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Modular Dashboard Toggles */}
      {activeSubTab === 'modular' && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">شخصی‌سازی ماژول‌های داشبورد (خلوت‌سازی رابط کاربری)</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              برای جلوگیری از شلوغی و پیچیدگی، بخش‌هایی را که نیاز ندارید خاموش کنید تا پنل کاربری تمیز و سریع باقی بماند.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">کارت‌های آمار و KPI کلی</strong>
                <span className="text-slate-400">نمایش تعداد مراجعین، پرونده‌های فعال و نوبت‌های امروز</span>
              </div>
              <input
                type="checkbox"
                checked={modularSettings.showOverviewStats}
                onChange={(e) => updateModular({ showOverviewStats: e.target.checked })}
                className="w-4 h-4 text-slate-900 rounded"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">جدول آخرین مراجعین و استعلام‌ها</strong>
                <span className="text-slate-400">فهرست خلاصه درخواست‌های ثبت‌شده اخیر در پنل</span>
              </div>
              <input
                type="checkbox"
                checked={modularSettings.showRecentInquiries}
                onChange={(e) => updateModular({ showRecentInquiries: e.target.checked })}
                className="w-4 h-4 text-slate-900 rounded"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">دکمه‌های اقدام سریع (Quick Actions)</strong>
                <span className="text-slate-400">دکمه‌های ثبت نوبت جدید، خروجی اکسل و ثبت استعلام</span>
              </div>
              <input
                type="checkbox"
                checked={modularSettings.showQuickActions}
                onChange={(e) => updateModular({ showQuickActions: e.target.checked })}
                className="w-4 h-4 text-slate-900 rounded"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">نمودار رادار تخصص‌ها (Radar Chart)</strong>
                <span className="text-slate-400">نمودار هندسی توزیع حوزه‌های فعالیت (اختیاری جهت خلوت بودن)</span>
              </div>
              <input
                type="checkbox"
                checked={modularSettings.showPracticeRadar}
                onChange={(e) => updateModular({ showPracticeRadar: e.target.checked })}
                className="w-4 h-4 text-slate-900 rounded"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">لاگ‌ها و رویدادهای سیستمی (System Logs)</strong>
                <span className="text-slate-400">نمایش تاریخچه ثبت رویدادهای فنی برای ادمین</span>
              </div>
              <input
                type="checkbox"
                checked={modularSettings.showSystemLogs}
                onChange={(e) => updateModular({ showSystemLogs: e.target.checked })}
                className="w-4 h-4 text-slate-900 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Demo Importer */}
      {activeSubTab === 'demo' && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">درون‌ریزی دیتای دمو برای صنف «{preset.name}»</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              با فشردن این دکمه، داده‌های نمونه شامل ۴ خدمت استاندارد، سوالات متداول و استعلام‌های تستی در سایت ایجاد می‌شوند.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <div className="font-semibold text-slate-800 dark:text-slate-200">خدماتی که بارگذاری خواهند شد:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              {preset.services.map((svc) => (
                <li key={svc.id}>
                  <strong>{svc.title}</strong> — {svc.tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={handleImportDemo}
              disabled={isImporting}
              className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isImporting ? 'در حال درون‌ریزی محتوا...' : `درون‌ریزی دموی صنف ${preset.name}`}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
