import React, { useState } from 'react';
import {
  X, Check, Download, ExternalLink, Sparkles, FolderDown,
  Layers, Filter, Search, CheckCircle2, Shield, Store,
  Activity, Briefcase, Video, Palette, Code, RefreshCw,
  SlidersHorizontal, Upload, FileText
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export interface IndustryCatalogItem {
  id: string;
  title: string;
  category: 'legal' | 'ecommerce' | 'medical' | 'corporate' | 'media' | 'creative';
  categoryLabel: string;
  badge: string;
  description: string;
  version: string;
  author: string;
  rating: number;
  downloads: string;
  zipSize: string;
  accentColor: string;
  features: string[];
  cptCount: number;
  shortcodesCount: number;
  templatesCount: number;
  previewUrl?: string;
  githubBranch: string;
}

const CATALOG_ITEMS: IndustryCatalogItem[] = [
  {
    id: 'law-core',
    title: 'دفتر وکالت و دعاوی حقوقی (SedRazavi Legal Core)',
    category: 'legal',
    categoryLabel: 'حقوقی و وکالت',
    badge: 'پیش‌فرض هسته',
    description: 'تمپلیت‌های تخصصی دادگاه، محاسبه‌گر تمبر مالیاتی، رادار ریسک پرونده و پرونده الکترونیک موکلین.',
    version: '3.4.0',
    author: 'گروه وکلای سیدرضوی',
    rating: 4.9,
    downloads: '14,250+',
    zipSize: '1.8 MB',
    accentColor: '#D97706',
    features: ['محاسبه‌گر هزینه دادرسی', 'پیگیری آنلاین پرونده', 'استعلام موکل با پیامک', 'سامانه داوری آنلاین'],
    cptCount: 6,
    shortcodesCount: 14,
    templatesCount: 8,
    githubBranch: 'main'
  },
  {
    id: 'ecommerce-shop',
    title: 'فروشگاه تخصصی و فایل‌های دیجیتال (SedRazavi Commerce)',
    category: 'ecommerce',
    categoryLabel: 'فروشگاه و تجارت',
    badge: 'پرفروش‌ترین',
    description: 'سبد خرید شناور ایجکس، درگاه بانکی شاپرک، فیلتر محصولات پیشرفته، صدور فاکتور و دانلود امن فایل‌ها.',
    version: '2.8.2',
    author: 'تیم توسعه فروشگاهی',
    rating: 4.8,
    downloads: '9,840+',
    zipSize: '2.1 MB',
    accentColor: '#10B981',
    features: ['سبد خرید کشویی Real-time', 'صدور فاکتور رسمی PDF', 'فروش خدمات و لایسنس', 'درگاه‌های زرین‌پال و سامان'],
    cptCount: 4,
    shortcodesCount: 11,
    templatesCount: 6,
    githubBranch: 'ecommerce-pack'
  },
  {
    id: 'medical-health',
    title: 'کلینیک و سلامت هوشمند (SedRazavi Clinic & Med)',
    category: 'medical',
    categoryLabel: 'پزشکی و سلامت',
    badge: 'جدید',
    description: 'سیستم پیشرفته نوبت‌دهی آنلاین، پرونده الکترونیک بیمار، تریاژ علائم بیماری و مشاوره تصویری پزشک.',
    version: '1.9.0',
    author: 'شبکه سلامت پارس',
    rating: 4.9,
    downloads: '5,120+',
    zipSize: '1.9 MB',
    accentColor: '#06B6D4',
    features: ['تقویم نوبت‌دهی ساعتی', 'پرونده امن پزشکی', 'پنل اختصاصی بیمار', 'فرم غربالگری هوشمند'],
    cptCount: 5,
    shortcodesCount: 9,
    templatesCount: 7,
    githubBranch: 'medical-pack'
  },
  {
    id: 'corporate-enterprise',
    title: 'شرکت مهندسی و بازرگانی بین‌الملل (SedRazavi Enterprise)',
    category: 'corporate',
    categoryLabel: 'مهندسی و شرکتی',
    badge: 'سازمانی',
    description: 'شبیه‌ساز قراردادهای اینکوترمز، پورتال مناقصات و ضمانت‌نامه‌ها، نمودار ماتریس تحلیل ریسک و رزومه شرکتی.',
    version: '2.3.1',
    author: 'مهندسین توسعه بین‌الملل',
    rating: 4.7,
    downloads: '7,300+',
    zipSize: '2.4 MB',
    accentColor: '#6366F1',
    features: ['محاسبه‌گر اینکوترمز ۲۰۲۰', 'پورتفولیو پروژه‌های صنعتی', 'مدیریت شرکای تجاری', 'چندزبانه WPML/Polylang'],
    cptCount: 7,
    shortcodesCount: 12,
    templatesCount: 9,
    githubBranch: 'enterprise-pack'
  },
  {
    id: 'media-podcast-hub',
    title: 'استودیو چندرسانه‌ای، پادکست و ویدئو (SedRazavi Media)',
    category: 'media',
    categoryLabel: 'رسانه و پادکست',
    badge: 'محبوب سازندگان',
    description: 'پخش‌کننده استریم صوتی پیشرفته، آرشیو ویدئوهای HD، فیلتر موضوعی و قابلیت دانلود در کیفیت‌های مختلف.',
    version: '2.6.0',
    author: 'کانون صوت و تصویر',
    rating: 4.9,
    downloads: '11,400+',
    zipSize: '1.7 MB',
    accentColor: '#EC4899',
    features: ['پلیر اختصاصی Waveform', 'دانلود چندکیفیتی ویدیو', 'اشتراک و پلی‌لیست کاربر', 'فید RSS اپل پادکست و اسپاتیفای'],
    cptCount: 3,
    shortcodesCount: 8,
    templatesCount: 5,
    githubBranch: 'media-pack'
  },
  {
    id: 'creative-agency',
    title: 'پورتفولیو و آژانس خلاق دیجیتال (SedRazavi Creative Studio)',
    category: 'creative',
    categoryLabel: 'طراحی و دیزاین',
    badge: 'مدرن و تعاملی',
    description: 'طراحی مینیمال و نئومورفیک، بنتوگرید نمونه‌کارها، شوکیس انیمیشن‌دار پروژه‌ها و پنل ثبت سفارش هوشمند.',
    version: '1.8.5',
    author: 'استودیو دیزاین خلاق',
    rating: 4.8,
    downloads: '6,200+',
    zipSize: '1.6 MB',
    accentColor: '#F59E0B',
    features: ['گرید بنتو نمونه‌کارها', 'تاریک/روشن خودکار', 'فرم برآورد قیمت آنلاین', 'طراحی بدون وابستگی به افزونه سنگین'],
    cptCount: 4,
    shortcodesCount: 10,
    templatesCount: 6,
    githubBranch: 'creative-pack'
  }
];

interface CloudThemeCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPreset?: (presetId: string) => void;
}

export const CloudThemeCatalogModal: React.FC<CloudThemeCatalogModalProps> = ({
  isOpen,
  onClose,
  onApplyPreset
}) => {
  const { info, success, error } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [activeThemeId, setActiveThemeId] = useState<string>('law-core');
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [customJsonInput, setCustomJsonInput] = useState('');

  if (!isOpen) return null;

  const filteredItems = CATALOG_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery = item.title.includes(searchQuery) || item.description.includes(searchQuery);
    return matchesCategory && matchesQuery;
  });

  const handleInstallTheme = (item: IndustryCatalogItem) => {
    setInstallingId(item.id);
    info(`در حال واکشی پکیج "${item.title}" از مخزن گیت‌هاب...`);

    setTimeout(() => {
      setInstallingId(null);
      setActiveThemeId(item.id);
      if (onApplyPreset) {
        onApplyPreset(item.id);
      }
      success(`پکیج و چایلدتم "${item.title}" با موفقیت نصب و روی سایت فعال شد!`);
    }, 1400);
  };

  const handleDownloadZip = (item: IndustryCatalogItem) => {
    success(`دانلود فایل زیپ "${item.id}-child-theme.zip" آغاز شد.`);
    // Generate simulated zip download blob
    const element = document.createElement("a");
    const file = new Blob([
      `/*\nTheme Name: ${item.title}\nTheme URI: https://sedrazavi.ir\nTemplate: sedrazavi-theme\nVersion: ${item.version}\nAuthor: ${item.author}\n*/\n\n@import url("../sedrazavi-theme/style.css");\n:root { --primary-hue: ${item.accentColor}; }`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${item.id}-child-theme.zip`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImportCustomJson = () => {
    try {
      const parsed = JSON.parse(customJsonInput);
      success(`صنف سفارشی "${parsed.industry_name || 'سفارشی'}" با موفقیت ایمپورت و فعال شد!`);
      setShowJsonModal(false);
      setCustomJsonInput('');
    } catch {
      error('خطا: فرمت فایل جیسون نامعتبر است. لطفاً ساختار JSON را بررسی کنید.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#090D1A] border border-slate-800 shadow-2xl overflow-hidden my-auto text-right">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-950 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  کاتالوگ ابری چایلدتم‌ها و پکیج‌های اصناف (Cloud Presets Store)
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                انتخاب، پیش‌نمایش و فعال‌سازی مستقیم پکیج کامل هر صنف و موضوع روی سایت با یک کلیک
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowJsonModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>بارگذاری صنف با JSON</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/40 flex flex-wrap items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'همه پکیج‌ها' },
              { id: 'legal', label: 'حقوقی و وکالت' },
              { id: 'ecommerce', label: 'فروشگاهی' },
              { id: 'medical', label: 'پزشکی و کلینیک' },
              { id: 'corporate', label: 'مهندسی و تجاری' },
              { id: 'media', label: 'رسانه و پادکست' },
              { id: 'creative', label: 'طراحی و دیزاین' },
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در قالب‌ها و اصناف..."
              className="w-full pl-3 pr-9 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
          </div>
        </div>

        {/* Catalog Items Grid */}
        <div className="p-5 sm:p-6 max-h-[62vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map(item => {
              const isActive = activeThemeId === item.id;
              const isInstalling = installingId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-5 flex flex-col justify-between transition-all relative overflow-hidden text-right ${
                    isActive
                      ? 'bg-slate-900/90 border-cyan-500 shadow-xl shadow-cyan-500/10'
                      : 'bg-slate-900/40 border-slate-800/90 hover:bg-slate-900/70 hover:border-slate-700'
                  }`}
                >
                  {/* Top Color Accent Line */}
                  <div
                    className="absolute top-0 right-0 w-full h-1"
                    style={{ backgroundColor: item.accentColor }}
                  />

                  {/* Header & Badges */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${item.accentColor}20`,
                          color: item.accentColor,
                          border: `1px solid ${item.accentColor}40`
                        }}
                      >
                        {item.categoryLabel}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                          نسخه {item.version}
                        </span>
                        {isActive && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>فعال روی سایت</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features Badges */}
                    <div className="space-y-1.5 mb-4">
                      {item.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technical Specs Pill Bar */}
                    <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center mb-4">
                      <div>
                        <div className="text-[10px] text-slate-500">پست‌تایپ</div>
                        <div className="text-xs font-bold text-white font-mono">{item.cptCount} عدد</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500">شورت‌کد</div>
                        <div className="text-xs font-bold text-white font-mono">{item.shortcodesCount} عدد</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500">تمپلیت</div>
                        <div className="text-xs font-bold text-white font-mono">{item.templatesCount} برگ</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadZip(item)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors flex items-center gap-1"
                      title="دانلود مستقیم زیپ چایلدتم"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-[10px] font-mono">{item.zipSize}</span>
                    </button>

                    <button
                      type="button"
                      disabled={isInstalling || isActive}
                      onClick={() => handleInstallTheme(item)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                      }`}
                    >
                      {isInstalling ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>در حال نصب...</span>
                        </>
                      ) : isActive ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>قالب فعال است</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>فعال‌سازی در وردپرس</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>تمامی پکیج‌ها کاملاً با PHP 8.x، وردپرس ۶.x و ویرایشگر گوتنبرگ/المنتور هماهنگ هستند.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-slate-500">
              واکشی آنی از مخزن GitHub
            </span>
          </div>
        </div>
      </div>

      {/* Custom JSON Import Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-right">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" />
                <span>تعریف صنف و موضوع جدید با فایل JSON</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowJsonModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              اگر صنف مورد نظر شما در کاتالوگ وجود ندارد، ساختار JSON آن را در کادر زیر وارد کنید تا هسته سیستم ساختار جدید را خودکار پیکربندی کند:
            </p>

            <textarea
              rows={8}
              value={customJsonInput}
              onChange={(e) => setCustomJsonInput(e.target.value)}
              placeholder={`{\n  "industry_id": "custom-realestate",\n  "industry_name": "مشاور املاک و سرمایه‌گذاری",\n  "primary_color": "#0ea5e9",\n  "post_types": ["properties", "agents", "inquiries"],\n  "shortcodes": ["property_search", "agent_cards"]\n}`}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowJsonModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleImportCustomJson}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                ایمپورت و فعال‌سازی فوری
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
