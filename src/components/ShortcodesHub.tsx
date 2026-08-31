import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Play,
  Sliders,
  Sparkles,
  Layers,
  FileText,
  Phone,
  Star,
  MapPin,
  Calendar,
  Share2,
  Mail,
  HelpCircle,
  BarChart,
  Navigation,
} from 'lucide-react';
import { SERVICES_DATA, TESTIMONIALS_DATA, ARTICLES_DATA, FAQ_DATA, ATTORNEY_INFO } from '../data/mockData';

interface ShortcodeDef {
  id: string;
  tag: string;
  title: string;
  description: string;
  category: 'محتوا و خدمات' | 'تعاملی و فرم‌ها' | 'اعتبار و آمار' | 'ناوبری و اطلاعات';
  defaultAttributes: Record<string, string | number | boolean>;
  attributeSchema: {
    name: string;
    label: string;
    type: 'text' | 'number' | 'boolean' | 'select';
    options?: string[];
    description: string;
  }[];
}

const SHORTCODES_LIST: ShortcodeDef[] = [
  {
    id: 'sc-1',
    tag: 'sedrazavi_services',
    title: 'نمایش شبکه خدمات حقوقی',
    description: 'نمایش لیست خدمات با تصویر، آیکون، برآورد هزینه و دکمه جزئیات',
    category: 'محتوا و خدمات',
    defaultAttributes: { count: 3, category: 'all', orderby: 'order', show_icon: true },
    attributeSchema: [
      { name: 'count', label: 'تعداد خدمات', type: 'number', description: 'تعداد آیتم‌های قابل نمایش (۱ تا ۶)' },
      { name: 'category', label: 'دسته‌بندی', type: 'select', options: ['all', 'commercial', 'criminal', 'family', 'real-estate'], description: 'فیلتر بر اساس حوزه تخصصی' },
      { name: 'show_icon', label: 'نمایش آیکون', type: 'boolean', description: 'فعال‌سازی آیکون و نشان خدمات' },
    ],
  },
  {
    id: 'sc-2',
    tag: 'sedrazavi_testimonials',
    title: 'نظرات و تجربیات موکلان',
    description: 'نمایش کارت‌های رضایت موکلان با امتیاز ستاره‌ای و حوزه پرونده',
    category: 'اعتبار و آمار',
    defaultAttributes: { count: 3, service: 'all', show_rating: true },
    attributeSchema: [
      { name: 'count', label: 'تعداد نظرات', type: 'number', description: 'تعداد نظرات تاییدشده' },
      { name: 'show_rating', label: 'نمایش امتیاز ۵ ستاره', type: 'boolean', description: 'نمایش ستاره‌های کیفیت' },
    ],
  },
  {
    id: 'sc-3',
    tag: 'sedrazavi_posts',
    title: 'آخرین مقالات و تحلیل‌های حقوقی',
    description: 'لیست مقالات تخصصی با مدت زمان مطالعه و دسته‌بندی',
    category: 'محتوا و خدمات',
    defaultAttributes: { count: 3, category: 'all', show_image: true },
    attributeSchema: [
      { name: 'count', label: 'تعداد مقالات', type: 'number', description: 'تعداد آخرین مقالات' },
      { name: 'show_image', label: 'نمایش تصویر شاخص', type: 'boolean', description: 'نمایش تامبنیل مقاله' },
    ],
  },
  {
    id: 'sc-4',
    tag: 'sedrazavi_contact_form',
    title: 'فرم هوشمند تماس و مشاوره حقوقی',
    description: 'فرم با استعلام فوری، اعتبارسنجی شماره تماس و رمزنگاری داده',
    category: 'تعاملی و فرم‌ها',
    defaultAttributes: { fields: 'name,phone,service,message', submit_text: 'ارسال درخواست مشاوره' },
    attributeSchema: [
      { name: 'submit_text', label: 'متن دکمه ارسال', type: 'text', description: 'عنوان دکمه سابمیت' },
    ],
  },
  {
    id: 'sc-5',
    tag: 'sedrazavi_stats',
    title: 'شمارنده‌های اعتبار و دستاوردهای وکیل',
    description: 'نمایش آمار پرونده‌های موفق، رضایت موکل و سال‌های تجربه',
    category: 'اعتبار و آمار',
    defaultAttributes: { items: 'cases,satisfaction,awards,experience', animation: true },
    attributeSchema: [
      { name: 'animation', label: 'انیمیشن شمارنده', type: 'boolean', description: 'شمارش متحرک اعداد' },
    ],
  },
  {
    id: 'sc-6',
    tag: 'sedrazavi_faq',
    title: 'آکاردئون سوالات متداول حقوقی',
    description: 'پرسش و پاسخ‌های پرتکرار موکلان پیرامون حق‌الوکاله و دادگاه',
    category: 'محتوا و خدمات',
    defaultAttributes: { count: 4, open_first: true },
    attributeSchema: [
      { name: 'count', label: 'تعداد سوالات', type: 'number', description: 'حداکثر پرسش‌ها' },
      { name: 'open_first', label: 'باز بودن اولین سوال', type: 'boolean', description: 'باز بودن آیتم اول به صورت پیش‌فرض' },
    ],
  },
  {
    id: 'sc-7',
    tag: 'sedrazavi_map',
    title: 'نقشه تعاملی دفتر وکالت و مسیریابی',
    description: 'نمایش موقعیت جغرافیایی دفتر در تهران با کلید مسیریابی مستقیم',
    category: 'ناوبری و اطلاعات',
    defaultAttributes: { height: 260, zoom: 16 },
    attributeSchema: [
      { name: 'height', label: 'ارتفاع (px)', type: 'number', description: 'ارتفاع باکس نقشه' },
    ],
  },
  {
    id: 'sc-8',
    tag: 'sedrazavi_cta',
    title: 'باکس دعوت به اقدام (Call To Action)',
    description: 'باکس جذاب رزرو جلسه حضوری یا مشاوره فوری تلفنی',
    category: 'تعاملی و فرم‌ها',
    defaultAttributes: {
      title: 'نیاز به ارزیابی فوری پرونده خود دارید؟',
      subtitle: 'همین حالا وقت مشاوره خود را با وکیل پایه یک رزرو کنید.',
      button_text: 'رزرو نوبت حضوری',
      button_url: '#booking',
    },
    attributeSchema: [
      { name: 'title', label: 'تیتر دعوت', type: 'text', description: 'عنوان اصلی باکس' },
      { name: 'button_text', label: 'متن دکمه', type: 'text', description: 'عنوان روی دکمه طلایی' },
    ],
  },
  {
    id: 'sc-9',
    tag: 'sedrazavi_services_slider',
    title: 'اسلایدر متحرک خدمات حقوقی',
    description: 'چرخ‌وفلک کارتی حوزه‌های وکالت با افکت‌های لمسی و اسلاید خودکار',
    category: 'محتوا و خدمات',
    defaultAttributes: { count: 5, autoplay: true },
    attributeSchema: [
      { name: 'count', label: 'تعداد اسلایدها', type: 'number', description: 'تعداد خدمات در اسلایدر' },
      { name: 'autoplay', label: 'پخش خودکار', type: 'boolean', description: 'اسلاید اتوماتیک هر ۴ ثانیه' },
    ],
  },
  {
    id: 'sc-10',
    tag: 'sedrazavi_testimonials_slider',
    title: 'اسلایدر نظرات موکلان با نقل‌قول طلایی',
    description: 'اسلایدر پرمیوم بازخوردها با نشان تایید اصالت کانون وکلا',
    category: 'اعتبار و آمار',
    defaultAttributes: { count: 4, autoplay: true },
    attributeSchema: [
      { name: 'autoplay', label: 'چرخش خودکار', type: 'boolean', description: 'پخش اتوماتیک' },
    ],
  },
  {
    id: 'sc-11',
    tag: 'sedrazavi_booking',
    title: 'سامانه تقویم و نوبت‌دهی آنلاین',
    description: 'فرم رزرو ساعت مشاوره با انتخاب تاریخ شمسی و نوع جلسه',
    category: 'تعاملی و فرم‌ها',
    defaultAttributes: { service: 'commercial', button_text: 'تایید و پرداخت بیعانه' },
    attributeSchema: [
      { name: 'button_text', label: 'متن دکمه رزرو', type: 'text', description: 'عنوان ثبت نوبت' },
    ],
  },
  {
    id: 'sc-12',
    tag: 'sedrazavi_social_links',
    title: 'شبکه‌های اجتماعی و پیام‌رسان‌های وکیل',
    description: 'آیکون‌های واتس‌اپ، ایتا، بله، تلگرام و لینکدین رسمی',
    category: 'ناوبری و اطلاعات',
    defaultAttributes: { platforms: 'whatsapp,eitaa,telegram,linkedin', size: 'md' },
    attributeSchema: [
      { name: 'size', label: 'اندازه آیکون‌ها', type: 'select', options: ['sm', 'md', 'lg'], description: 'سایز نمایش' },
    ],
  },
  {
    id: 'sc-13',
    tag: 'sedrazavi_contact_info',
    title: 'کارت اطلاعات تماس و ساعات کاری',
    description: 'شماره تلفن مستقیم، آدرس دفتر ونک و ساعات پذیرش حضوری',
    category: 'ناوبری و اطلاعات',
    defaultAttributes: { show_phone: true, show_email: true, show_address: true },
    attributeSchema: [
      { name: 'show_phone', label: 'نمایش شماره تماس', type: 'boolean', description: 'نمایش خطوط تلفن' },
      { name: 'show_address', label: 'نمایش آدرس دفتر', type: 'boolean', description: 'نمایش آدرس پستی' },
    ],
  },
  {
    id: 'sc-14',
    tag: 'sedrazavi_newsletter',
    title: 'فرم اشتراک خبرنامه و آراء قضایی',
    description: 'ثبت ایمیل یا شماره موبایل برای دریافت تحلیل‌های هفتگی حقوقی',
    category: 'تعاملی و فرم‌ها',
    defaultAttributes: { placeholder: 'ایمیل یا شماره موبایل خود را وارد کنید...', button_text: 'عضویت در خبرنامه' },
    attributeSchema: [
      { name: 'placeholder', label: 'متن راهنمای ورودی', type: 'text', description: 'متن درون فیلد' },
    ],
  },
  {
    id: 'sc-15',
    tag: 'sedrazavi_breadcrumbs',
    title: 'ناوبری ساختاریافته (Breadcrumbs)',
    description: 'مسیر سلسله‌مراتبی صفحات با داده‌های ساختاریافته Schema.org',
    category: 'ناوبری و اطلاعات',
    defaultAttributes: { separator: '›', home_text: 'خانه حقوقی SedRazavi' },
    attributeSchema: [
      { name: 'separator', label: 'جداکننده', type: 'text', description: 'کاراکتر بین آیتم‌ها' },
      { name: 'home_text', label: 'عنوان صفحه اصلی', type: 'text', description: 'نام ریشه مسیر' },
    ],
  },
];

export const ShortcodesHub: React.FC = () => {
  const [selectedShortcode, setSelectedShortcode] = useState<ShortcodeDef>(SHORTCODES_LIST[0]);
  const [attributes, setAttributes] = useState<Record<string, any>>(SHORTCODES_LIST[0].defaultAttributes);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('همه');

  const handleSelectShortcode = (sc: ShortcodeDef) => {
    setSelectedShortcode(sc);
    setAttributes(sc.defaultAttributes);
  };

  const handleAttributeChange = (key: string, value: any) => {
    setAttributes({
      ...attributes,
      [key]: value,
    });
  };

  // Generate shortcode string: [tag attr1="val1" attr2="val2"]
  const generateShortcodeString = () => {
    const attrPairs = Object.entries(attributes)
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');
    return attrPairs ? `[${selectedShortcode.tag} ${attrPairs}]` : `[${selectedShortcode.tag}]`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateShortcodeString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = ['همه', 'محتوا و خدمات', 'تعاملی و فرم‌ها', 'اعتبار و آمار', 'ناوبری و اطلاعات'];

  const filteredList = SHORTCODES_LIST.filter((sc) =>
    activeCategory === 'همه' ? true : sc.category === activeCategory
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-l from-[#0B132B] via-[#1C2541] to-[#0B132B] rounded-2xl p-6 md:p-8 text-white border border-[#D4AF37]/30 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                <Code className="w-5 h-5" />
              </span>
              <h2 className="text-xl md:text-2xl font-bold font-serif">
                موتور کدهای کوتاه اختصاصی SedRazavi (۱۵ Shortcode حقوقی)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              با استفاده از کدهای کوتاه قالب، می‌توانید المان‌های کلیدی از جمله خدمات، نظرات، فرم‌های مشاوره، آمار و نقشه‌ها را در هر برگه، نوشته، سایدبار یا ابزارک وردپرس قرار دهید؛ بدون نیاز به کدنویسی یا المنتور.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold text-gray-200">سازگار با گوتنبرگ و ویرایشگر کلاسیک</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#D4AF37] text-[#0B132B] shadow-md font-bold'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Selector on Right, Configurator & Live Preview on Left */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Right Column: 15 Shortcodes List */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-bold text-[#0B132B] dark:text-white font-serif flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D4AF37]" />
              لیست شورت‌کدهای فعال ({filteredList.length})
            </h3>
          </div>

          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {filteredList.map((sc, idx) => {
              const isSelected = selectedShortcode.id === sc.id;
              return (
                <div
                  key={sc.id}
                  onClick={() => handleSelectShortcode(sc)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-[#0B132B] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-white dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B132B] dark:text-white font-serif">
                      {idx + 1}. {sc.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-mono">
                      [{sc.tag}]
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    {sc.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Left Column: Attribute Configurator & Live Rendering Preview */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Configurator Box */}
          <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#0B132B] dark:text-white font-serif">
                    {selectedShortcode.title}
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-mono font-bold">
                    [{selectedShortcode.tag}]
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {selectedShortcode.description}
                </p>
              </div>

              {/* Copy Code CTA */}
              <button
                onClick={handleCopy}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-900" /> : <Copy className="w-4 h-4" />}
                {copied ? 'کپی شد!' : 'کپی کد کوتاه'}
              </button>
            </div>

            {/* Live Generated Code Snippet */}
            <div className="p-3.5 bg-[#070D1E] rounded-xl border border-[#D4AF37]/30 flex items-center justify-between font-mono text-xs text-[#F3E5AB] overflow-x-auto">
              <code>{generateShortcodeString()}</code>
              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-white p-1"
                title="کپی در حافظه"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Parameter Fields */}
            {selectedShortcode.attributeSchema.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
                  تنظیم پارامترهای کد کوتاه (Shortcode Attributes):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedShortcode.attributeSchema.map((attr) => (
                    <div key={attr.name} className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {attr.label} ({attr.name}):
                      </label>
                      
                      {attr.type === 'text' && (
                        <input
                          type="text"
                          value={attributes[attr.name] || ''}
                          onChange={(e) => handleAttributeChange(attr.name, e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-[#0B132B] dark:text-white focus:ring-2 focus:ring-[#D4AF37] outline-none"
                        />
                      )}

                      {attr.type === 'number' && (
                        <input
                          type="number"
                          value={attributes[attr.name] || 1}
                          onChange={(e) => handleAttributeChange(attr.name, Number(e.target.value))}
                          className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-[#0B132B] dark:text-white focus:ring-2 focus:ring-[#D4AF37] outline-none"
                        />
                      )}

                      {attr.type === 'boolean' && (
                        <select
                          value={String(attributes[attr.name])}
                          onChange={(e) => handleAttributeChange(attr.name, e.target.value === 'true')}
                          className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-[#0B132B] dark:text-white focus:ring-2 focus:ring-[#D4AF37] outline-none"
                        >
                          <option value="true">بله (فعال)</option>
                          <option value="false">خیر (غیرفعال)</option>
                        </select>
                      )}

                      {attr.type === 'select' && (
                        <select
                          value={attributes[attr.name] || attr.options?.[0]}
                          onChange={(e) => handleAttributeChange(attr.name, e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-[#0B132B] dark:text-white focus:ring-2 focus:ring-[#D4AF37] outline-none"
                        >
                          {attr.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      <p className="text-[10px] text-gray-400">{attr.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Live Preview Box */}
          <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#D4AF37]" />
                <h4 className="text-sm font-bold text-[#0B132B] dark:text-white font-serif">
                  پیش‌نمایش زنده المان رندر شده در برگه
                </h4>
              </div>
              <span className="text-[11px] text-gray-400">نمایش بر اساس تمپلیت وردپرس ۶.۷</span>
            </div>

            {/* Dynamic visual preview based on selected shortcode */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700">
              
              {/* Shortcode: dadman_services */}
              {(selectedShortcode.tag === 'dadman_services' || selectedShortcode.tag === 'dadman_services_slider') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {SERVICES_DATA.slice(0, Number(attributes.count) || 3).map((srv) => (
                    <div key={srv.id} className="p-3 bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-700 text-xs space-y-1.5 shadow-sm">
                      {attributes.show_icon !== false && <span className="text-xl">{srv.iconEmoji}</span>}
                      <h5 className="font-bold text-[#0B132B] dark:text-white font-serif">{srv.title}</h5>
                      <p className="text-gray-500 dark:text-gray-400 text-[11px] line-clamp-2">{srv.summary}</p>
                      <div className="text-[10px] text-[#AA820A] dark:text-[#D4AF37] font-bold pt-1">
                        تعرفه: {srv.estimatedFee}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Shortcode: dadman_testimonials */}
              {(selectedShortcode.tag === 'dadman_testimonials' || selectedShortcode.tag === 'dadman_testimonials_slider') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TESTIMONIALS_DATA.slice(0, Number(attributes.count) || 2).map((t) => (
                    <div key={t.id} className="p-3.5 bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-700 text-xs space-y-2 shadow-sm">
                      {attributes.show_rating !== false && (
                        <div className="flex gap-1 text-[#D4AF37]">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                          ))}
                        </div>
                      )}
                      <p className="text-gray-600 dark:text-gray-300 italic text-[11px]">"{t.text}"</p>
                      <div className="flex items-center gap-2 pt-1 border-t border-gray-100 dark:border-gray-800">
                        <img src={t.avatar} alt={t.clientName} className="w-6 h-6 rounded-full" />
                        <div>
                          <p className="font-bold text-[#0B132B] dark:text-white text-[11px]">{t.clientName}</p>
                          <p className="text-[9px] text-gray-400">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Shortcode: dadman_posts */}
              {selectedShortcode.tag === 'dadman_posts' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ARTICLES_DATA.slice(0, Number(attributes.count) || 3).map((art) => (
                    <div key={art.id} className="bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden text-xs shadow-sm">
                      {attributes.show_image !== false && (
                        <img src={art.thumbnail} alt={art.title} className="w-full h-24 object-cover" />
                      )}
                      <div className="p-3 space-y-1">
                        <span className="text-[9px] text-[#AA820A] dark:text-[#D4AF37] font-bold">{art.category}</span>
                        <h5 className="font-bold text-[#0B132B] dark:text-white font-serif line-clamp-1">{art.title}</h5>
                        <p className="text-[10px] text-gray-400">{art.date} | مطالعه: {art.readTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Shortcode: dadman_stats */}
              {selectedShortcode.tag === 'dadman_stats' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-white dark:bg-[#0B132B] rounded-xl border border-[#D4AF37]/30">
                    <p className="text-xl font-bold font-serif text-[#0B132B] dark:text-white">۱۲۸۰+</p>
                    <p className="text-[10px] text-gray-500">پرونده موفق</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#0B132B] rounded-xl border border-[#D4AF37]/30">
                    <p className="text-xl font-bold font-serif text-[#D4AF37]">۹۹٪</p>
                    <p className="text-[10px] text-gray-500">رضایت موکل</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#0B132B] rounded-xl border border-[#D4AF37]/30">
                    <p className="text-xl font-bold font-serif text-[#0B132B] dark:text-white">۳۲+</p>
                    <p className="text-[10px] text-gray-500">جوایز حقوقی</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#0B132B] rounded-xl border border-[#D4AF37]/30">
                    <p className="text-xl font-bold font-serif text-[#0B132B] dark:text-white">۲۰+</p>
                    <p className="text-[10px] text-gray-500">سال سابقه وکالت</p>
                  </div>
                </div>
              )}

              {/* Shortcode: dadman_faq */}
              {selectedShortcode.tag === 'dadman_faq' && (
                <div className="space-y-2">
                  {FAQ_DATA.slice(0, Number(attributes.count) || 3).map((faq, i) => (
                    <div key={faq.id} className="p-3 bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
                      <p className="font-bold text-[#0B132B] dark:text-white">❓ {faq.question}</p>
                      {(i === 0 || !attributes.open_first) && (
                        <p className="text-gray-600 dark:text-gray-400 text-[11px] mt-1.5 border-t border-gray-100 dark:border-gray-800 pt-1.5">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Shortcode: dadman_cta */}
              {selectedShortcode.tag === 'dadman_cta' && (
                <div className="p-5 rounded-xl bg-gradient-to-l from-[#0B132B] to-[#1C2541] text-white text-center space-y-3 border border-[#D4AF37]/40">
                  <h4 className="text-base font-bold font-serif">{attributes.title || 'نیاز به ارزیابی فوری پرونده خود دارید؟'}</h4>
                  <p className="text-xs text-gray-300">{attributes.subtitle}</p>
                  <button className="btn-gold px-6 py-2 rounded-xl text-xs font-bold mx-auto">
                    {attributes.button_text || 'رزرو نوبت حضوری'}
                  </button>
                </div>
              )}

              {/* Shortcode: dadman_contact_info & map */}
              {(selectedShortcode.tag === 'dadman_contact_info' || selectedShortcode.tag === 'dadman_map') && (
                <div className="p-4 bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-700 space-y-2 text-xs">
                  <p className="font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    شماره تماس مستقیم: {ATTORNEY_INFO.phone}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    {ATTORNEY_INFO.officeAddress}
                  </p>
                </div>
              )}

              {/* Shortcode: dadman_breadcrumbs */}
              {selectedShortcode.tag === 'dadman_breadcrumbs' && (
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 p-3 bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-700 font-medium">
                  <span>{attributes.home_text || 'خانه حقوقی دادمان'}</span>
                  <span>{attributes.separator || '›'}</span>
                  <span>حوزه‌های وکالت</span>
                  <span>{attributes.separator || '›'}</span>
                  <span className="text-[#AA820A] dark:text-[#D4AF37] font-bold">دعاوی تجاری و شرکت‌ها</span>
                </div>
              )}

              {/* Shortcode: dadman_newsletter & booking */}
              {(selectedShortcode.tag === 'dadman_newsletter' || selectedShortcode.tag === 'dadman_booking' || selectedShortcode.tag === 'dadman_contact_form') && (
                <div className="p-4 bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={attributes.placeholder || 'اطلاعات خود را وارد فرمایید...'}
                      className="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs outline-none"
                    />
                    <button className="btn-gold px-4 py-2 rounded-lg text-xs font-bold">
                      {attributes.submit_text || attributes.button_text || 'ثبت درخواست'}
                    </button>
                  </div>
                </div>
              )}

              {/* Shortcode: dadman_social_links */}
              {selectedShortcode.tag === 'dadman_social_links' && (
                <div className="flex items-center justify-center gap-3 p-3 bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-700">
                  <span className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-bold text-xs">واتس‌اپ</span>
                  <span className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-bold text-xs">ایتا</span>
                  <span className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-bold text-xs">تلگرام</span>
                  <span className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-bold text-xs">لینکدین</span>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
