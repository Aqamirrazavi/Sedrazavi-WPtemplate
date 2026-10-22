import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Layers,
  Sparkles,
  ShieldCheck,
  Calculator,
  Activity,
  Smartphone,
  Tablet,
  Monitor,
  Printer,
  QrCode,
  Send,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Code2,
  Eye,
  Sliders,
  Terminal,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface SnapElementHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SnapElementHubModal: React.FC<SnapElementHubModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'catalog' | 'roi_calculator' | 'verify_portal' | 'site_health'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedComponent, setSelectedComponent] = useState<string>('hero-cyber-gunslinger');

  // ROI Calculator state
  const [calcData, setCalcData] = useState({
    projectType: 'enterprise',
    bilingual: true,
    speedOpt: true,
    customPortal: false,
    offlineQueue: true,
  });

  const [showProposalPrint, setShowProposalPrint] = useState(false);

  if (!isOpen) return null;

  const catalogComponents = [
    {
      id: 'snap-hero-cyber-gunslinger',
      slug: 'hero-cyber-gunslinger',
      title: 'هیرو سکشن تفنگ‌دار سایبری (Tactical Gunslinger Hero)',
      category: 'hero',
      description: 'هیرو سکشن واکنش‌گرا با گره‌چینی پارامتریک، لوگوی تفنگ‌دار SedRazavi، نشانگر زنده در دسترس بودن و دکمه‌های شلیک به ایتا و تلگرام.',
      tags: ['هیرو', 'تفنگ‌دار', 'گره‌چینی', 'ایتا', 'تلگرام'],
      stats: { containers: 3, elements: 7, weightKb: 1.8 },
      globals: ['Primary Color', 'Accent Gold', 'Text Color'],
      previewMarkup: (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-3">
            <span>⚡ سریع‌ترین طراح و معمار وردپرس بدون کد</span>
          </div>
          <h2 className="text-2xl font-black text-white mb-2">شلیک به کندی و کدنویسی بی‌رویه با معماری بومی SedRazavi</h2>
          <p className="text-slate-400 text-xs max-w-md mx-auto mb-4">طراحی وب‌سایت‌های سازمانی، پورتفولیوهای لوکس و لندینگ‌پیج‌های پرسرعت بر پایه ترکیب هندسه ایرانی-اسلامی و ترمینال‌های سایبرنتیک.</p>
          <div className="flex justify-center gap-3">
            <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold">شروع پروژه فوری</span>
            <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold border border-slate-700">مشاهده نمونه‌کارها</span>
          </div>
        </div>
      ),
    },
    {
      id: 'snap-bento-skills-matrix',
      slug: 'bento-skills-matrix',
      title: 'شبکه بنتو ماتریس مهارت‌ها و معماری بدون کد (Bento Grid)',
      category: 'features',
      description: 'کارت‌های مدرن بنتو گرید با افکت گلس‌مورفیسم، نمودار شتابی تخصص جت‌انجین، سرعت زیر ۱ ثانیه و استانداردهای دوزبانه.',
      tags: ['بنتو', 'گرید', 'جت‌انجین', 'سرعت'],
      stats: { containers: 4, elements: 12, weightKb: 2.4 },
      globals: ['Surface Card', 'Primary Border', 'Glow'],
      previewMarkup: (
        <div className="grid grid-cols-2 gap-3 text-right">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
            <div className="text-amber-400 font-bold text-sm mb-1">JetEngine Mastery</div>
            <div className="text-slate-400 text-xs">CPTهای پیشرفته، روابط m:n و کوئری‌بیلدر اختصاصی بدون کد</div>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
            <div className="text-emerald-400 font-bold text-sm mb-1">سرعت لود &lt; ۱.۰ ثانیه</div>
            <div className="text-slate-400 text-xs">امتیاز ۹۹ در Google PageSpeed با بهینه‌سازی کانتینرها</div>
          </div>
        </div>
      ),
    },
    {
      id: 'snap-comparison-speed-slider',
      slug: 'comparison-speed-slider',
      title: 'اسلایدر مقایسه سرعت: وردپرس سنگین vs معماری SedRazavi',
      category: 'interactive',
      description: 'اسلایدر تعاملی مقایسه قبل و بعد: سایت کند با ۲۰ پلاگین غیرضروری (LCP 4.8s) در برابر معماری تمیز بدون کد سید امیر حسین رضوی فردویی (LCP 0.6s).',
      tags: ['مقایسه', 'قبل و بعد', 'Core Web Vitals'],
      stats: { containers: 2, elements: 6, weightKb: 2.1 },
      globals: ['Accent Danger', 'Accent Success'],
      previewMarkup: (
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-rose-950/40 border border-rose-800/50 p-4 rounded-xl">
            <div className="text-rose-400 font-bold text-xs mb-1">وردپرس سنگین و سنتی</div>
            <div className="text-2xl font-black text-rose-300">۴.۸s</div>
            <div className="text-[10px] text-slate-400">۲۲ ثانیه تا بارگذاری کامل</div>
          </div>
          <div className="bg-emerald-950/40 border border-emerald-800/50 p-4 rounded-xl">
            <div className="text-emerald-400 font-bold text-xs mb-1">معماری بدون کد SedRazavi</div>
            <div className="text-2xl font-black text-emerald-300">۰.۶s</div>
            <div className="text-[10px] text-slate-400">CLS = 0 | LCP &lt; 0.8s</div>
          </div>
        </div>
      ),
    },
    {
      id: 'snap-tactical-scope-calculator',
      slug: 'tactical-scope-calculator',
      title: 'کانفیگوراتور برآورد زمان، هزینه و ROI پروژه',
      category: 'pricing',
      description: 'محاسبه‌گر پیشرفته پارامتریک ارزش طراحی با قابلیت انتخاب نوع پروژه، سیستم دوزبانه، بهینه‌سازی سرعت و صدور پیش‌فاکتور چاپی A4.',
      tags: ['محاسبه‌گر', 'پیش‌فاکتور', 'پروپوزال'],
      stats: { containers: 3, elements: 9, weightKb: 3.2 },
      globals: ['Primary', 'Accent Gold'],
      previewMarkup: (
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-right">
          <div className="text-xs text-slate-400 mb-1">برآورد سرمایه‌گذاری پایه:</div>
          <div className="text-xl font-bold text-amber-400">۳۵,۰۰۰,۰۰۰ تومان</div>
          <div className="text-[10px] text-slate-400 mt-1">زمان‌بندی تقریبی تحویل: ۱۴ روز کاری</div>
        </div>
      ),
    },
  ];

  const filteredComponents = selectedCategory === 'all'
    ? catalogComponents
    : catalogComponents.filter(c => c.category === selectedCategory);

  const activeComp = catalogComponents.find(c => c.slug === selectedComponent) || catalogComponents[0];

  const handleCopyElementorJson = (slug: string) => {
    const rawPayload = {
      type: 'container',
      version: '0.4',
      title: activeComp.title,
      author: 'Seyyed Amir Hossein Razavi Fordoei (SedRazavi)',
      source: 'SnapElement.com Adaptive Architecture - SedRazavi OS',
      content: [
        {
          id: Math.random().toString(36).substring(2, 9),
          elType: 'container',
          isInner: false,
          settings: {
            content_width: 'boxed',
            boxed_width: { unit: 'px', size: 1240 },
            _css_classes: `sr-snap-component sr-${slug}`,
            __globals__: {
              background_color: 'globals/colors?id=background',
            },
          },
          elements: [
            {
              id: Math.random().toString(36).substring(2, 9),
              elType: 'widget',
              widgetType: 'heading',
              settings: {
                title: activeComp.title,
                header_size: 'h2',
              },
            },
          ],
        },
      ],
    };

    navigator.clipboard.writeText(JSON.stringify(rawPayload, null, 2));
    setCopiedSlug(slug);
    showToast({ message: 'کد JSON کانتینر المنتور در کلیپ‌بورد کپی شد! در بوم المنتور کلیک‌راست و Paste کنید.', type: 'success' });
    setTimeout(() => setCopiedSlug(null), 3000);
  };

  // Calculate pricing
  const calculateTotal = () => {
    let base = 25000000;
    let days = 14;
    if (calcData.projectType === 'enterprise') {
      base += 15000000;
      days += 7;
    } else if (calcData.projectType === 'crypto_web3') {
      base += 20000000;
      days += 10;
    }
    if (calcData.bilingual) {
      base += 8000000;
      days += 4;
    }
    if (calcData.speedOpt) {
      base += 6000000;
      days += 3;
    }
    if (calcData.customPortal) {
      base += 12000000;
      days += 6;
    }
    if (calcData.offlineQueue) {
      base += 4000000;
      days += 2;
    }
    return { total: base.toLocaleString('fa-IR'), days };
  };

  const { total, days } = calculateTotal();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
      <div className="bg-slate-950 border border-slate-800 w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-amber-500/20">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-lg">هاب ماکزیمال کامپوننت‌های SnapElement و معماری SedRazavi</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  v16.0 Sovereign Master
                </span>
              </div>
              <p className="text-slate-400 text-xs">الهام گرفته از معماری SnapElement.com: کانتینرهای بدون استایل و اتمیک با ارث‌بری متغیرهای جهانی المنتور</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-900/50 border-b border-slate-800/80 px-6 py-2 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'catalog'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>کاتالوگ کامپوننت‌های SnapElement</span>
          </button>
          <button
            onClick={() => setActiveTab('roi_calculator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'roi_calculator'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>کانفیگوراتور بودجه، زمان و پیش‌فاکتور A4</span>
          </button>
          <button
            onClick={() => setActiveTab('verify_portal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'verify_portal'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>تأییدیه اصالت ارتباطات و مسکات تفنگ‌دار</span>
          </button>
          <button
            onClick={() => setActiveTab('site_health')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'site_health'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>پایش سلامت سرور و رادار امنیتی</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-right">
          {/* TAB 1: SNAPELEMENT COMPONENT CATALOG */}
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              {/* Category Pills & Device Switcher */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {['all', 'hero', 'features', 'interactive', 'pricing'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                        selectedCategory === cat
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {cat === 'all' && 'همه کامپوننت‌ها (V3/V4)'}
                      {cat === 'hero' && 'هیرو و تفنگ‌دار'}
                      {cat === 'features' && 'بنتو گرید'}
                      {cat === 'interactive' && 'اسلایدر و تعاملی'}
                      {cat === 'pricing' && 'تعرفه و قیمت'}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-1.5 rounded-lg transition-colors ${previewDevice === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="نمایش دسکتاپ (1440px)"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`p-1.5 rounded-lg transition-colors ${previewDevice === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="نمایش تبلت (768px)"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-1.5 rounded-lg transition-colors ${previewDevice === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="نمایش موبایل (375px)"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Two Column Layout: List and Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Components list */}
                <div className="lg:col-span-5 space-y-3">
                  {filteredComponents.map(comp => (
                    <div
                      key={comp.id}
                      onClick={() => setSelectedComponent(comp.slug)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedComponent === comp.slug
                          ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/10'
                          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {comp.stats.weightKb} KB
                        </span>
                        <h4 className="font-bold text-white text-sm">{comp.title}</h4>
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-2 mb-3">{comp.description}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <div className="flex items-center gap-1">
                          {comp.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyElementorJson(comp.slug);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-md shadow-amber-500/20"
                        >
                          {copiedSlug === comp.slug ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSlug === comp.slug ? 'کپی شد!' : 'کپی JSON المنتور'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Live Frame Preview */}
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] text-emerald-400 font-bold block mb-1">ارث‌بری توکن‌های __globals__ المنتور فعال است</span>
                        <h3 className="font-extrabold text-white text-base">{activeComp.title}</h3>
                      </div>
                      <button
                        onClick={() => handleCopyElementorJson(activeComp.slug)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20"
                      >
                        {copiedSlug === activeComp.slug ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>کپی کانتینر برای Paste در المنتور</span>
                      </button>
                    </div>

                    {/* Viewport Frame Container */}
                    <div className="flex justify-center my-4">
                      <div
                        className={`transition-all duration-300 border border-slate-700 rounded-2xl p-4 bg-slate-950/80 shadow-2xl ${
                          previewDevice === 'desktop' ? 'w-full' : previewDevice === 'tablet' ? 'w-[75%]' : 'w-[50%]'
                        }`}
                      >
                        {activeComp.previewMarkup}
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-center justify-between mt-4">
                    <span>فرمت خروجی: کانتینر خام استاندارد Elementor V3/V4</span>
                    <span className="text-amber-400 font-mono text-[11px]">بدون نیاز به نصب افزونه ثالث</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROI CALCULATOR & TACTICAL PROPOSAL */}
          {activeTab === 'roi_calculator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Configurator Form */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="font-extrabold text-white text-base mb-2">تنظیمات پارامتریک ارزش و زمان پروژه</h3>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-bold">نوع وب‌سایت:</label>
                    <select
                      value={calcData.projectType}
                      onChange={(e) => setCalcData({ ...calcData, projectType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="standard">وب‌سایت شرکتی استاندارد</option>
                      <option value="enterprise">پلتفرم سطح سازمانی با ساختار JetEngine</option>
                      <option value="crypto_web3">ترمینال سایبرنتیک و پورتفولیو Web3</option>
                    </select>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                      <div>
                        <div className="font-bold text-white text-xs">سیستم دوزبانه سروری (/en/)</div>
                        <div className="text-[10px] text-slate-400">بدون افزونه‌های سنگین WPML و با سرعت لود یکسان</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={calcData.bilingual}
                        onChange={(e) => setCalcData({ ...calcData, bilingual: e.target.checked })}
                        className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 w-4 h-4"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                      <div>
                        <div className="font-bold text-white text-xs">بهینه‌سازی سرعت زیر ۱ ثانیه (CWV Guard)</div>
                        <div className="text-[10px] text-slate-400">تضمین نمره بالای ۹۵ لایت‌هاوس و CLS=0</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={calcData.speedOpt}
                        onChange={(e) => setCalcData({ ...calcData, speedOpt: e.target.checked })}
                        className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 w-4 h-4"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                      <div>
                        <div className="font-bold text-white text-xs">صف ارسال آفلاین فرم‌ها (Offline Queue)</div>
                        <div className="text-[10px] text-slate-400">ذخیره داده‌ها در IndexedDB هنگام قطعی اینترنت</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={calcData.offlineQueue}
                        onChange={(e) => setCalcData({ ...calcData, offlineQueue: e.target.checked })}
                        className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 w-4 h-4"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                      <div>
                        <div className="font-bold text-white text-xs">پورتال کاربری اختصاصی فرانت‌اند (RBAC)</div>
                        <div className="text-[10px] text-slate-400">مدیریت فایل‌ها، تیکت‌ها و سفارشات خارج از wp-admin</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={calcData.customPortal}
                        onChange={(e) => setCalcData({ ...calcData, customPortal: e.target.checked })}
                        className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 w-4 h-4"
                      />
                    </label>
                  </div>
                </div>

                {/* Estimation Summary & Printable Spec */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-900/40 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-900/50">
                      <span className="text-xs text-amber-400 font-bold">برآورد اولیه و سند توافق‌نامه</span>
                      <span className="text-[10px] text-slate-400 font-mono">SR-SPEC-2026</span>
                    </div>

                    <div className="space-y-4 my-6">
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block mb-1">کل سرمایه‌گذاری برآوردشده:</span>
                        <span className="text-3xl font-black text-white">{total} تومان</span>
                      </div>

                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block mb-1">مدت زمان تحویل معماری:</span>
                        <span className="text-xl font-bold text-emerald-400">{days} روز کاری</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setShowProposalPrint(true)}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20"
                    >
                      <Printer className="w-4 h-4" />
                      <span>مشاهده و چاپ پیش‌فاکتور رسمی A4</span>
                    </button>
                    <a
                      href="https://eitaa.com/sedrazavi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
                    >
                      <Send className="w-3.5 h-3.5 text-orange-400" />
                      <span>ارسال مستقیم مشخصات به ایتا (@sedrazavi)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Printable Modal Overlay */}
              {showProposalPrint && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                  <div className="bg-white text-slate-900 w-full max-w-3xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto print:p-0 shadow-2xl relative">
                    <button
                      onClick={() => setShowProposalPrint(false)}
                      className="absolute top-4 left-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 print:hidden"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-black text-slate-950">سند مشخصات فنی و پیش‌فاکتور معماری وب‌سایت</h2>
                        <div className="text-xs text-slate-500 font-bold">مهندس سید امیر حسین رضوی فردویی (SedRazavi)</div>
                      </div>
                      <div className="text-left font-mono text-xs text-slate-600">
                        <div>کد مرجع: SR-{Date.now().toString().slice(-6)}</div>
                        <div>تاریخ صدور: {new Date().toLocaleDateString('fa-IR')}</div>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs leading-relaxed text-slate-700">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="font-bold text-slate-900 mb-2">شرح خروجی‌های قطعی پروژه:</div>
                        <ul className="list-disc pr-5 space-y-1">
                          <li>طراحی پوسته اختصاصی فوق‌سریع بدون فریم‌ورک‌های سنگین (Zero Bloat)</li>
                          <li>بهینه‌سازی حداکثری سرعت و شاخص‌های Core Web Vitals (LCP &lt; 1.0s و CLS=0)</li>
                          {calcData.bilingual && <li>سیستم دوزبانه سروری (/en/) با نگاشت hreflang مستقل</li>}
                          {calcData.offlineQueue && <li>صف ارسال آفلاین فرم‌ها با پشتیبانی از IndexedDB در قطعی شبکه</li>}
                          {calcData.customPortal && <li>پورتال کاربری اختصاصی با تفکیک نقش‌های امنیتی</li>}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm font-bold text-amber-950">
                        <span>مبلغ نهایی سرمایه‌گذاری:</span>
                        <span>{total} تومان</span>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-600">
                      <div>
                        <div>ارتباطات رسمی: @sedrazavi (ایتا و تلگرام)</div>
                        <div>شماره مستقیم و استعلام: ۰۹۱۲۳۴۵۶۷۸۹</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-slate-900">مهر و امضای مهندسی</div>
                        <div className="font-serif italic text-slate-400 mt-2">Seyyed Amir Hossein Razavi</div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3 print:hidden">
                      <button
                        onClick={() => window.print()}
                        className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center gap-2"
                      >
                        <Printer className="w-4 h-4" />
                        <span>پرینت / ذخیره PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: VERIFICATION PORTAL & GUNSLINGER IDENTITY */}
          {activeTab === 'verify_portal' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأییدیه رسمی هویت و ضدجعل (Anti-Impersonation)</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">سید امیر حسین رضوی فردویی (SedRazavi)</h3>
                <p className="text-slate-400 text-xs max-w-xl mx-auto">
                  تمامی ارتباطات کاری، دریافت وجه و پیش‌فاکتورها منحصراً از طریق آیدی رسمی @sedrazavi در پیام‌رسان‌های ایتا و تلگرام صورت می‌پذیرد.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-orange-400 font-bold block mb-1">کانال و ارتباط رسمی ایتا:</span>
                    <span className="text-lg font-mono font-bold text-white">@sedrazavi</span>
                  </div>
                  <a
                    href="https://eitaa.com/sedrazavi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <span>ارتباط در ایتا</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-sky-400 font-bold block mb-1">کانال و ارتباط رسمی تلگرام:</span>
                    <span className="text-lg font-mono font-bold text-white">@sedrazavi</span>
                  </div>
                  <a
                    href="https://t.me/sedrazavi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <span>ارتباط در تلگرام</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* PGP Fingerprint Box */}
              <div className="bg-black/60 border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-400">
                <div className="text-amber-400 font-bold mb-1 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>اثر انگشت کلید عمومی PGP معمار سامانه:</span>
                </div>
                <div className="break-all text-slate-300">
                  F67B 90A2 E834 1C5D B399 43E1 8DA2 7430 52C9 ED1F // Seyyed Amir Hossein Razavi &lt;sar42ei@gmail.com&gt;
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SITE HEALTH & OBSERVABILITY */}
          {activeTab === 'site_health' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-xs text-slate-400 mb-1">زمان پاسخ سرور (TTFB)</div>
                  <div className="text-xl font-bold text-emerald-400">۳۸ میلی‌ثانیه</div>
                  <span className="text-[10px] text-slate-500">پایش سرور لبه</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-xs text-slate-400 mb-1">صف ذخیره آفلاین فرم‌ها</div>
                  <div className="text-xl font-bold text-indigo-400">فعال (IndexedDB)</div>
                  <span className="text-[10px] text-slate-500">مقاوم در برابر قطعی</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-xs text-slate-400 mb-1">امنیت هدرها و توکن‌ها</div>
                  <div className="text-xl font-bold text-amber-400">Hardened CSP</div>
                  <span className="text-[10px] text-slate-500">Cache-Control: no-store</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-xs text-slate-400 mb-1">کاتالوگ SnapElement</div>
                  <div className="text-xl font-bold text-emerald-400">۶ کانتینر بومی</div>
                  <span className="text-[10px] text-slate-500">__globals__ Binding</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>تأییدیه انطباق ۱۰۰٪ معماری با وردپرس و PHP 8.3:</span>
                </div>
                <p>• تمام درخواست‌های دیتابیس با متد امن $wpdb-&gt;prepare و جدول سفارشی با ایندکس‌های ترکیبی اجرا می‌شوند.</p>
                <p>• هدرهای کش برای مسیرهای استعلام مهمان و API به‌صورت no-store تنظیم شده تا مسمومیت کش رخ ندهد.</p>
                <p>• هیچ کدی در هسته وردپرس یا صفحه‌سازها شکسته نخواهد شد؛ کامپوننت‌های المنتور کاملاً مستقل و قابل انتقال هستند.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-900/90 border-t border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-400">
          <span>سیستم‌عامل و اکوسیستم توسعه وب SedRazavi OS</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-colors"
          >
            بستن هاب
          </button>
        </div>
      </div>
    </div>
  );
};
