import React, { useState } from 'react';
import {
  FileText,
  Phone,
  Image,
  Download,
  Palette,
  Check,
  X,
  ExternalLink,
  Sparkles,
  Sliders,
  Eye,
  Save,
  HelpCircle,
  FileCode,
  Music,
  Video,
} from 'lucide-react';

interface NoCodeClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleLiveEdit: () => void;
  isLiveEditActive: boolean;
  customData: any;
  onSaveCustomData: (data: any) => void;
}

export const NoCodeClientPortalModal: React.FC<NoCodeClientPortalModalProps> = ({
  isOpen,
  onClose,
  onToggleLiveEdit,
  isLiveEditActive,
  customData,
  onSaveCustomData,
}) => {
  const [activeTab, setActiveTab] = useState<'texts' | 'contact' | 'media' | 'downloads' | 'style'>('texts');
  const [formData, setFormData] = useState({
    siteName: customData?.siteName || 'استودیو طراحی وب و خدمات دیجیتال رضوی',
    siteTagline: customData?.siteTagline || 'طراحی سایت سریع، سبک و حرفه‌ای با گوتنبرگ بدون افزونه‌های سنگین',
    heroTitle: customData?.heroTitle || 'طراحی سایت وردپرس با گوتنبرگ؛ سریع، سبک، حرفه‌ای',
    heroSubtitle: customData?.heroSubtitle || 'بدون افزونه‌های سنگین، با تمرکز بر سرعت، سئو و تجربه کاربری',
    ctaPrimary: customData?.ctaPrimary || 'مشاوره رایگان ۲۰ دقیقه‌ای',
    ctaSecondary: customData?.ctaSecondary || 'مشاهده نمونه‌کارها',
    phone: customData?.phone || '۰۲۱-۸۸۹۹۰۰۱۱',
    mobile: customData?.mobile || '۰۹۱۲-۳۴۵۶۷۸۹',
    whatsapp: customData?.whatsapp || '09123456789',
    telegram: customData?.telegram || 'sedrazavi_support',
    email: customData?.email || 'info@sedrazavi.ir',
    address: customData?.address || 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج فناوری رضوی',
    workingHours: customData?.workingHours || 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰',
    promoVideoUrl: customData?.promoVideoUrl || 'https://aparat.com/v/sample',
    catalogPdfUrl: customData?.catalogPdfUrl || 'https://sedrazavi.ir/catalog-1403.pdf',
    downloadAppUrl: customData?.downloadAppUrl || 'https://sedrazavi.ir/app-v2.apk',
    accentColor: customData?.accentColor || '#6366F1',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCustomData(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" dir="rtl">
      <div className="bg-[#0F172A] text-[#F8FAFC] rounded-2xl border border-[#334155] w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#1E293B] border-b border-[#334155] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center text-[#818CF8]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>پیشخوان ساده کارفرما — مدیریت محتوا بدون کدنویسی</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 font-medium">
                  No-Code Client Suite
                </span>
              </h2>
              <p className="text-xs text-[#94A3B8]">
                متون، شماره تماس‌ها، لینک‌ها، فایل‌های دانلودی و تصاویر سایت خود را به سادگی و بدون نیاز به طراح سایت ویرایش کنید.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#334155] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Edit Banner / Shortcut */}
        <div className="bg-[#1E1E2F] px-6 py-3 border-b border-[#334155]/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
            <span>⚡ قابلیت‌های شخصی‌سازی سه‌گانه:</span>
            <span className="text-[#818CF8] font-bold">۱. پیشخوان فرمی آسان</span>
            <span>•</span>
            <span className="text-[#10B981] font-bold">۲. نوار شناور ویرایش زنده دیداری فرانت‌اند</span>
            <span>•</span>
            <span className="text-[#F59E0B] font-bold">۳. سفارشی‌ساز زنده وردپرس</span>
          </div>

          <button
            type="button"
            onClick={() => {
              onToggleLiveEdit();
              onClose();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              isLiveEditActive
                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                : 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isLiveEditActive ? 'بستن نوار ویرایش زنده' : 'فعال‌سازی نوار ویرایشگر سریع در صفحه'}</span>
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-[#334155] px-6 bg-[#1E293B]/60 overflow-x-auto text-xs sm:text-sm">
          {[
            { id: 'texts', label: '📝 متون و تیترها' },
            { id: 'contact', label: '📞 اطلاعات تماس و شبکه‌ها' },
            { id: 'media', label: '🖼️ رسانه و ویدیو' },
            { id: 'downloads', label: '📥 مرکز دانلود و کاتالوگ' },
            { id: 'style', label: '🎨 رنگ و استایل سازمانی' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#6366F1] text-[#818CF8] bg-[#6366F1]/10'
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1">
          {saveSuccess && (
            <div className="p-3 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>تغییرات با موفقیت ذخیره شدند و روی فرانت‌اند سایت اعمال گردیدند!</span>
            </div>
          )}

          {/* TAB 1: Texts */}
          {activeTab === 'texts' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#94A3B8] mb-1 font-medium">نام برند یا عنوان وب‌سایت:</label>
                  <input
                    type="text"
                    value={formData.siteName}
                    onChange={e => setFormData({ ...formData, siteName: e.target.value })}
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#94A3B8] mb-1 font-medium">شعار کوتاه سایت:</label>
                  <input
                    type="text"
                    value={formData.siteTagline}
                    onChange={e => setFormData({ ...formData, siteTagline: e.target.value })}
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#94A3B8] mb-1 font-medium">تیتر بزرگ صفحه اصلی (H1):</label>
                <input
                  type="text"
                  value={formData.heroTitle}
                  onChange={e => setFormData({ ...formData, heroTitle: e.target.value })}
                  className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#94A3B8] mb-1 font-medium">زیرعنوان بنر اصلی:</label>
                <textarea
                  rows={3}
                  value={formData.heroSubtitle}
                  onChange={e => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#94A3B8] mb-1 font-medium">متن دکمه اقدام اصلی (CTA 1):</label>
                  <input
                    type="text"
                    value={formData.ctaPrimary}
                    onChange={e => setFormData({ ...formData, ctaPrimary: e.target.value })}
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#94A3B8] mb-1 font-medium">متن دکمه فرعی (CTA 2):</label>
                  <input
                    type="text"
                    value={formData.ctaSecondary}
                    onChange={e => setFormData({ ...formData, ctaSecondary: e.target.value })}
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Contact */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#94A3B8] mb-1 font-medium">شماره تماس ثابت دفتر:</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#94A3B8] mb-1 font-medium">شماره همراه پشتیبانی / واتساپ:</label>
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#94A3B8] mb-1 font-medium">آیدی تلگرام پشتیبانی (بدون @):</label>
                  <input
                    type="text"
                    value={formData.telegram}
                    onChange={e => setFormData({ ...formData, telegram: e.target.value })}
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#94A3B8] mb-1 font-medium">آدرس ایمیل اداری:</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#94A3B8] mb-1 font-medium">نشانی کامل پستی:</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#94A3B8] mb-1 font-medium">ساعات کاری و پاسخگویی:</label>
                <input
                  type="text"
                  value={formData.workingHours}
                  onChange={e => setFormData({ ...formData, workingHours: e.target.value })}
                  className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Media */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1 font-medium">لینک ویدیوی معرفی برند (آپارات یا فایل MP4):</label>
                <input
                  type="url"
                  value={formData.promoVideoUrl}
                  onChange={e => setFormData({ ...formData, promoVideoUrl: e.target.value })}
                  className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#1E293B]/50 border border-[#334155] text-xs text-[#94A3B8] space-y-1">
                <div className="text-white font-bold flex items-center gap-1.5">
                  <Image className="w-4 h-4 text-[#818CF8]" /> جایگزینی تصاویر لوگو و بنر
                </div>
                <div>می‌توانید تصاویر را در رسانه‌های وردپرس آپلود کرده و آدرس لینک مستقیم آن را در کادرهای بالا قرار دهید.</div>
              </div>
            </div>
          )}

          {/* TAB 4: Downloads */}
          {activeTab === 'downloads' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1 font-medium">لینک کاتالوگ یا فایل PDF معرفی (دانلود مستقیم):</label>
                <input
                  type="url"
                  value={formData.catalogPdfUrl}
                  onChange={e => setFormData({ ...formData, catalogPdfUrl: e.target.value })}
                  className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#94A3B8] mb-1 font-medium">لینک دانلود نرم‌افزار یا اپلیکیشن موبایل (APK / EXE):</label>
                <input
                  type="url"
                  value={formData.downloadAppUrl}
                  onChange={e => setFormData({ ...formData, downloadAppUrl: e.target.value })}
                  className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#1E293B]/50 border border-[#334155] text-xs text-[#94A3B8]">
                <strong className="text-white block mb-1">حمایت از کاربری دانلود سنتر:</strong>
                تمامی فایل‌های نرم‌افزار، موزیک، ویدیو و اسناد با کلیک روی دکمه‌های سایت به صورت مستقیم و با بالاترین سرعت دانلود خواهند شد.
              </div>
            </div>
          )}

          {/* TAB 5: Style */}
          {activeTab === 'style' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#94A3B8] mb-2 font-medium">رنگ شاخص و سازمانی برند (Accent Color):</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={formData.accentColor}
                    onChange={e => setFormData({ ...formData, accentColor: e.target.value })}
                    className="w-14 h-12 rounded-xl bg-transparent cursor-pointer border border-[#334155]"
                  />
                  <span className="text-xs font-mono text-[#CBD5E1] bg-[#1E293B] px-3 py-2 rounded-lg border border-[#334155]">
                    {formData.accentColor}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {['#6366F1', '#D4AF37', '#10B981', '#38BDF8', '#EC4899', '#F59E0B'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFormData({ ...formData, accentColor: c })}
                    style={{ backgroundColor: c }}
                    className="w-8 h-8 rounded-lg cursor-pointer ring-2 ring-transparent hover:ring-white transition"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="border-t border-[#334155] pt-4 flex items-center justify-between">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#6366F1]/30 hover:shadow-[#6366F1]/50 transition cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره و انتشار تغییرات در سایت</span>
            </button>

            <span className="text-xs text-[#94A3B8]">
              بدون نیاز به بازنشانی یا ورود به پنل پیچیده ادمین
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
