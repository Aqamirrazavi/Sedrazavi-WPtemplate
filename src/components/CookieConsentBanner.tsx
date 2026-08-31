import React, { useState, useEffect } from 'react';
import { Shield, Cookie, Check, X, Settings, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });
  const [savedBannerState, setSavedBannerState] = useState<string | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('dadman_cookie_consent');
    if (!consent) {
      // Delay showing banner slightly for smooth UX
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setSavedBannerState(consent);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    localStorage.setItem('dadman_cookie_consent', JSON.stringify({
      status: 'accepted_all',
      preferences: fullConsent,
      timestamp: new Date().toISOString(),
      expiresInDays: 365,
    }));
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleDecline = () => {
    const minimalConsent: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    localStorage.setItem('dadman_cookie_consent', JSON.stringify({
      status: 'declined_optional',
      preferences: minimalConsent,
      timestamp: new Date().toISOString(),
      expiresInDays: 365,
    }));
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('dadman_cookie_consent', JSON.stringify({
      status: 'custom',
      preferences,
      timestamp: new Date().toISOString(),
      expiresInDays: 365,
    }));
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleReopen = () => {
    setIsVisible(true);
    setIsSettingsOpen(true);
  };

  return (
    <>
      {/* Floating Mini Trigger when closed (GDPR compliance badge) */}
      {!isVisible && (
        <button
          onClick={handleReopen}
          className="fixed bottom-4 right-4 z-40 bg-[#0B132B] hover:bg-[#1C2541] text-[#D4AF37] border border-[#D4AF37]/40 p-2.5 rounded-full shadow-xl shadow-black/20 flex items-center gap-2 text-xs font-semibold transition-all hover:scale-105 group"
          title="تنظیمات حریم خصوصی و کوکی‌ها (GDPR)"
          id="cookie-gdpr-trigger"
        >
          <Cookie className="w-4 h-4 text-[#D4AF37]" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-gray-200">
            حریم خصوصی و کوکی‌ها
          </span>
        </button>
      )}

      {/* Main Luxury Cookie Consent Banner (Section 13) */}
      {isVisible && !isSettingsOpen && (
        <div
          id="cookie-consent-banner"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-[#0B132B]/95 dark:bg-[#070D1E]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-8"
          dir="rtl"
        >
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Text & Icon */}
            <div className="flex items-start gap-3.5 flex-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#D4AF37]/20">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-white font-serif">
                    حریم خصوصی، امنیت داده‌ها و مدیریت کوکی‌ها (GDPR & ISO 27001)
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 font-mono font-bold">
                    قالب دادمان
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  ما در دفتر وکالت دادمان برای ارائه خدمات امن، پیگیری وضعیت پرونده‌ها و بهینه‌سازی تجربه کاربری شما از کوکی‌های رمزنگاری‌شده استفاده می‌کنیم. اطلاعات شما بر اساس قوانین بین‌المللی حفاظت از داده‌ها (GDPR) محافظت می‌شود.
                </p>
                <button
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-medium pt-0.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  مطالعه کامل منشور سیاست حریم خصوصی و امنیت موکلان
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-all flex items-center gap-1.5"
                id="btn-cookie-settings"
              >
                <Settings className="w-3.5 h-3.5 text-[#D4AF37]" />
                شخصی‌سازی
              </button>

              <button
                onClick={handleDecline}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors"
                id="btn-cookie-decline"
              >
                فقط ضروری
              </button>

              <button
                onClick={handleAcceptAll}
                className="btn-gold px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                id="btn-cookie-accept-all"
              >
                <Check className="w-4 h-4" />
                پذیرش همه و ذخیره
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Cookie Granular Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in" dir="rtl">
          <div className="bg-white dark:bg-[#0B132B] w-full max-w-xl rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-l from-[#0B132B] to-[#1C2541] text-white flex items-center justify-between border-b border-[#D4AF37]/20">
              <div className="flex items-center gap-2.5">
                <Cookie className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-bold font-serif">تنظیمات ترجیحات کوکی و داده‌ها</h3>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Preference toggles */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-sm">
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                شما می‌توانید دسته‌های مختلف کوکی‌ها را فعال یا غیرفعال کنید. داده‌های هویتی و شماره پرونده‌های شما همیشه با متدهای رمزنگاری قوی در سرور پردازش می‌شوند.
              </p>

              {/* 1. Essential (Locked) */}
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0B132B] dark:text-white">کوکی‌های ضروری و احراز هویت پرونده</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 font-bold">
                      همیشه فعال
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    برای امنیت نشست کاربر، استعلام شماره پرونده‌ها در سامانه و جلوگیری از حملات CSRF الزامی است.
                  </p>
                </div>
                <input type="checkbox" checked disabled className="mt-1 w-4 h-4 accent-[#D4AF37] cursor-not-allowed opacity-75" />
              </div>

              {/* 2. Analytics */}
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="font-bold text-[#0B132B] dark:text-white">کوکی‌های آماری و عملکرد سایت</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    به ما کمک می‌کند تا صفحات پربازدید حقوقی را شناسایی کرده و سرعت بارگذاری مقالات را بهبود ببخشیم (کاملاً ناشناس).
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-[#D4AF37] cursor-pointer"
                />
              </div>

              {/* 3. Preferences */}
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="font-bold text-[#0B132B] dark:text-white">شخصی‌سازی و حالت شب</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    حفظ تنظیمات فونت، تم تیره/روشن و فرم‌های ناتمام مشاوره حقوقی برای مراجعات بعدی شما.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.preferences}
                  onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-[#D4AF37] cursor-pointer"
                />
              </div>

              {/* 4. Marketing */}
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="font-bold text-[#0B132B] dark:text-white">کوکی‌های ارتباطی و خبرنامه حقوقی</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ارسال تازه‌ترین تغییرات قوانین و آراء وحدت رویه مرتبط با حوزه پرونده شما از طریق ایمیل یا پیامک.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-[#D4AF37] cursor-pointer"
                />
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-xs text-[#AA820A] dark:text-[#D4AF37] hover:underline"
              >
                مشاهده سیاست حریم خصوصی
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleDecline}
                  className="px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                >
                  رد غیرضروری‌ها
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="btn-gold px-4 py-1.5 rounded-lg text-xs font-bold"
                >
                  ذخیره تنظیمات
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Full Privacy Policy Modal (Section 13.3) */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in" dir="rtl">
          <div className="bg-white dark:bg-[#0B132B] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#D4AF37]/30 max-h-[85vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-5 bg-[#0B132B] text-white flex items-center justify-between border-b border-[#D4AF37]/20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif">سیاست حریم خصوصی و امنیت موکلان (Privacy Policy)</h3>
                  <p className="text-[11px] text-gray-400">آدرس وب‌سایت: https://dadman.ir/privacy-policy</p>
                </div>
              </div>
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              
              <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs space-y-1">
                <p className="font-bold text-[#0B132B] dark:text-[#F3E5AB]">
                  اصل رازداری و سوگند وکالت:
                </p>
                <p>
                  کلیه اطلاعات مبادله شده در این سامانه اعم از اسناد مالی، شکواییه‌ها، دادخواست‌ها و اطلاعات تماس، مشمول ماده ۳۰ قانون وکالت و اصل رازداری حرفه‌ای بوده و تحت هیچ عنوان در اختیار اشخاص ثالث یا مراجع غیرقضایی قرار نخواهد گرفت.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                  ۱. داده‌های جمع‌آوری شده
                </h4>
                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                  ما صرفاً اطلاعاتی را جمع‌آوری می‌کنیم که جهت تنظیم وکالت‌نامه رسمی، استعلام پرونده، ارسال پیامک نوبت دادگاه و تماس مستقیم وکیل ضروری است: نام و نام خانوادگی، شماره ملی، شماره تماس همراه و اسناد و شواهد بارگذاری‌شده برای پرونده.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                  ۲. رمزنگاری داده‌ها و امنیت سایبری
                </h4>
                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                  تمام تراکنش‌ها بر روی پروتکل امن SSL با رمزنگاری ۲۵۶ بیتی (AES-256) انجام می‌گیرد. کلیه شماره پرونده‌ها و اطلاعات مالی موکلان در پایگاه داده با توابع هش یک‌طرفه و کلیدهای متقارن ذخیره می‌شوند.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                  ۳. حقوق موکلان تحت استاندارد GDPR
                </h4>
                <ul className="text-xs space-y-1.5 list-disc list-inside text-gray-600 dark:text-gray-400 mr-2">
                  <li>حق دسترسی و دریافت نسخه خروجی تمام داده‌های ثبت‌شده در سامانه.</li>
                  <li>حق تصحیح اطلاعات نادرست هویتی یا اطلاعات پرونده.</li>
                  <li>حق فراموشی و حذف کامل سوابق پس از مختومه شدن پرونده و تسویه حساب مالی.</li>
                  <li>حق محدودسازی پردازش و عدم دریافت پیامک‌های اطلاع‌رسانی غیراضطراری.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="text-xs">
                  <p className="font-bold text-[#0B132B] dark:text-white">درخواست حذف یا خروجی داده‌های شما (GDPR Request)</p>
                  <p className="text-gray-500 dark:text-gray-400">ارسال ایمیل مستقیم به واحد حفاظت از داده‌ها: privacy@dadman-law.ir</p>
                </div>
                <button
                  onClick={() => alert('درخواست صادرات داده‌های حقوقی با موفقیت ثبت شد. ظرف ۴۸ ساعت فایل رمزگذاری‌شده برای ایمیل شما ارسال می‌شود.')}
                  className="px-3 py-1.5 bg-[#0B132B] dark:bg-gray-700 text-white rounded-lg text-xs font-semibold hover:bg-[#1C2541]"
                >
                  درخواست خروجی داده
                </button>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end shrink-0">
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="btn-gold px-6 py-2 rounded-lg text-xs font-bold"
              >
                متوجه شدم و قبول دارم
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
