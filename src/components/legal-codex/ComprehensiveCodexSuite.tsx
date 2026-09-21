import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Scale,
  Award,
  Filter,
  FileText,
  Copy,
  Check,
  Share2,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  BookmarkCheck,
  ShieldCheck,
  HelpCircle,
  FolderOpen
} from 'lucide-react';

interface PrecedentItem {
  id: string;
  number: string;
  date: string;
  category: 'civil' | 'criminal' | 'registration' | 'commercial' | 'family';
  title: string;
  summary: string;
  fullContent: string;
  relatedArticles: string[];
  advocateNote: string;
  type: 'precedent' | 'advisory_opinion' | 'circular';
}

const PRECEDENTS_DATABASE: PrecedentItem[] = [
  {
    id: 'p-838',
    number: 'رأی وحدت رویه شماره ۸۳۸',
    date: '۱۴۰۲/۰۸/۲۳',
    category: 'registration',
    title: 'عدم استماع دعوای خلع ید در املاک ثبت‌شده پیش از احراز مالکیت رسمی',
    summary: 'رسیدگی به دعوای خلع ید از اموال غیرمنقول ثبت‌شده فرع بر احراز مالکیت رسمی خواهان بر اساس مواد ۲۲، ۴۶، ۴۷ و ۴۸ قانون ثبت اسناد و املاک کشور است و با سند عادی قابلیت استماع ندارد.',
    fullContent: 'نظر به این که بر طبق مواد ۲۲، ۴۶، ۴۷ و ۴۸ قانون ثبت اسناد و املاک، دولـت فـقط کـسی را کـه مـلک در دفتـر املاک بـه اسـم او ثبـت شـده یـا مـلک مـزبـور بـه او منـتقل گردیـده و ایـن انتقال در دفتر املاک به ثبت رسیده یا اینکه ملک مزبور از مالک رسمی ارثاً به او رسیده باشد، مالک خواهد شناخت؛ لذا رسیدگی به دعوای خلع ید از اموال غیرمنقول فرع بر احراز مالکیت رسمی خواهان است و صدور حکم خلع ید بدون احراز مالکیت رسمی توجیه قانونی ندارد.',
    relatedArticles: ['ماده ۲۲ قانون ثبت', 'ماده ۴۶ قانون ثبت', 'ماده ۴۸ قانون ثبت', 'ماده ۲ قانون آیین دادرسی مدنی'],
    advocateNote: 'در صورتی که موکل دارای مبایعه‌نامه عادی است، الزاماً باید ابتدا یا همزمان دعوای الزام به تنظیم سند رسمی را اقامه نماید؛ در غیر این صورت دادگاه قرار رد یا عدم استماع دعوای خلع ید صادر خواهد کرد.',
    type: 'precedent',
  },
  {
    id: 'p-824',
    number: 'رأی وحدت رویه شماره ۸۲۴',
    date: '۱۴۰۱/۰۶/۲۹',
    category: 'commercial',
    title: 'مسئولیت تضامنی صادرکننده و ظهرنویسان چک بر اساس قانون جدید صدور چک',
    summary: 'دارنده چک صیادی ثبت‌شده در سامانه صیاد می‌تواند بدون نیاز به تودیع خسارت احتمالی، تقاضای تامین خواسته معادل وجه چک از کلیه اموال صادرکننده و ظهرنویسان بنماید.',
    fullContent: 'با عنایت به مقررات قانون اصلاح قانون صدور چک مصوب ۱۳۹۷ و قانون تجارت در خصوص اسناد تجاری، حق رجوع دارنده با حسن نیت به کلیه امضاکنندگان سند تجاری به نحو تضامن تضمین شده است و صدور گواهی عدم پرداخت بانک محال‌علیه به منزله واخواست سند تجاری بوده و دارنده را از رعایت تشریفات زائد معاف می‌دارد.',
    relatedArticles: ['ماده ۲۴۹ قانون تجارت', 'ماده ۲۳ قانون صدور چک', 'ماده ۱۰۸ قانون آیین دادرسی مدنی'],
    advocateNote: 'در دعاوی وصول مطالبات بانکی و اسناد تجاری، توقیف همزمان اموال ضامن و صادرکننده قبل از ابلاغ بر مبنای این رای تسریع شایانی در احقاق حق موکل ایجاد می‌نماید.',
    type: 'precedent',
  },
  {
    id: 'p-811',
    number: 'رأی وحدت رویه شماره ۸۱۱',
    date: '۱۴۰۰/۰۴/۰۱',
    category: 'civil',
    title: 'نحوه محاسبه غرامت و کاهش ارزش ثمن معامله فضولی و مستحق‌للغیر',
    summary: 'در صورت بطلان معامله به علت مستحق‌للغیر درآمدن مبیع، خریدار با حسن نیت مستحق دریافت ثمن به همراه غرامت ناشی از کاهش ارزش ثمن بر اساس تورم اعلامی بانک مرکزی یا قیمت روز مبیع است.',
    fullContent: 'با توجه به مواد ۳۹۰ و ۳۹۱ قانون مدنی، در صورت مستحق‌للغیر درآمدن کل یا بعض از مبیع، بایع باید ثمن مبیع را مسترد دارد و در صورت جهل مشتری به وجود فساد، بایع باید از عهده کلیه خسارات وارده به مشتری نیز برآید. مراد از خسارت و غرامت، تفاوت ارزش روز مبیع با ثمن پرداختی است تا قدرت خرید واقعی زیان‌دیده احیا گردد.',
    relatedArticles: ['ماده ۳۹۰ قانون مدنی', 'ماده ۳۹۱ قانون مدنی', 'رای وحدت رویه ۷۳۳'],
    advocateNote: 'یکی از درخشان‌ترین آراء تاریخ دیوان عالی کشور که مانع از تضییع حقوق خریداران در شرایط تورمی شدید می‌شود. در دادخواست فسخ یا اعلام بطلان حتماً ارجاع به کارشناسی جهت تعیین بهای روز ملک مطالبه گردد.',
    type: 'precedent',
  },
  {
    id: 'p-792',
    number: 'نظریه مشورتی اداره حقوقی قوه قضائیه',
    date: '۱۴۰۲/۰۳/۱۵',
    category: 'civil',
    title: 'اعتبار استناد به ادله دیجیتال، پیامک و فایل‌های صوتی در اثبات تعهدات مالی',
    summary: 'داده‌پیام‌ها، پیامک‌های تلفن همراه استخراج‌شده از سامانه ثنا و پیام‌رسان‌های دارای سرور داخلی بر مبنای مواد ۶ و ۱۲ قانون تجارت الکترونیک دارای ارزش اثباتی سند کتبی هستند.',
    fullContent: 'اسناد و مدارک الکترونیکی چنانچه اصالت آنها از حیث انتساب به فرستنده با مطابقت با سرور یا لاگ مخابرات احراز شود، اماره معتبر قضایی و در حکم سند کتبی عادی بوده و دادگاه مکلف به بررسی و ترتیب اثر دادن به آنها در فرآیند کشف حقیقت است.',
    relatedArticles: ['ماده ۶ قانون تجارت الکترونیک', 'ماده ۱۲ قانون تجارت الکترونیک', 'ماده ۶۵۵ قانون آیین دادرسی کیفری'],
    advocateNote: 'پیش از ارائه پرینت چت‌ها و پیامک‌ها، با انجام تامین دلیل فوری و صورت‌برداری رسمی توسط دادورز یا کارشناس رسمی جرایم سایبری، خطر ادعای جعل دیجیتال را خنثی فرمایید.',
    type: 'advisory_opinion',
  },
  {
    id: 'p-770',
    number: 'بخشنامه سازمان ثبت اسناد و املاک کشور',
    date: '۱۴۰۱/۱۱/۱۰',
    category: 'registration',
    title: 'دستورالعمل صدور اسناد مالکیت تک‌برگ کاداستری در اجرای قانون الزام به ثبت رسمی',
    summary: 'کلیه دفاتر اسناد رسمی مکلفند نقل و انتقالات اراضی و املاک را منحصراً از طریق سامانه ثبت الکترونیک اسناد و کاداستر انجام دهند.',
    fullContent: 'در راستای تحقق مقررات قانون کاداستر و پیشگیری از دعاوی مالکیت موازی، تنظیم هرگونه سند انتقال اراضی کشاورزی و شهری بدون اخذ شناسه جام و کد یکتای کاداستری ممنوع بوده و فاقد آثار حقوقی انتقال رسمی است.',
    relatedArticles: ['قانون جامع حدنگار (کاداستر)', 'قانون الزام به ثبت رسمی معاملات اموال غیرمنقول ۱۴۰۳'],
    advocateNote: 'این بخشنامه ستون فقرات اجرای قانون جدید الزام به ثبت رسمی اموال غیرمنقول مصوب مجمع تشخیص مصلحت نظام است.',
    type: 'circular',
  }
];

export const ComprehensiveCodexSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('p-838');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return PRECEDENTS_DATABASE.filter((item) => {
      const matchQuery =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.relatedArticles.some((art) => art.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchType = selectedType === 'all' || item.type === selectedType;

      return matchQuery && matchCategory && matchType;
    });
  }, [searchQuery, selectedCategory, selectedType]);

  const handleCopy = (item: PrecedentItem) => {
    const textToCopy = `${item.number} مورخ ${item.date}\nموضوع: ${item.title}\n\nخلاصه رای:\n${item.summary}\n\nمتن استناد قانونی:\n${item.fullContent}\n\nمواد قانونی مرتبط: ${item.relatedArticles.join('، ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-l from-[#0B132B] via-[#0F1B3E] to-[#0B132B] border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>فاز ۲۴: پایگاه جامع تنقیح قوانین، آراء وحدت رویه و دکترین قضایی (Supreme Precedents Codex)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
              موتور کاوش و تحلیل آرای وحدت رویه دیوان عالی کشور و نظریات مشورتی قوه قضائیه
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              مرجع دسترسی به آرای لازم‌الاتباع هیأت عمومی دیوان عالی کشور، استعلامات حقوقی، آخرین اصلاحات قوانین مادر و راهنمای استناد در لوایح دادرسی دکتر سیده مریم رضوی.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors border border-gray-700"
              >
                صفحه نخست
              </button>
            )}
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#b5952f] text-[#070B19] text-xs font-black transition-colors shadow-lg shadow-[#D4AF37]/20"
              >
                پیشخوان وکیل
              </button>
            )}
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-3xl bg-[#0B132B]/80 border border-gray-800 shadow-xl space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-[#D4AF37] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="جستجو در متن آراء وحدت رویه، شماره رای (مثلا ۸۱۱ یا ۸۳۸)، عنوان دعوی یا مواد قانونی..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3.5 rounded-2xl bg-[#070B19] border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>حوزه قضایی:</span>
              </span>
              {[
                { id: 'all', label: 'همه شاخه‌ها' },
                { id: 'civil', label: 'حقوقی و مدنی' },
                { id: 'registration', label: 'ثبت اسناد و املاک' },
                { id: 'commercial', label: 'تجارت و چک' },
                { id: 'criminal', label: 'کیفری' },
                { id: 'family', label: 'خانواده و ارث' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#D4AF37] text-[#070B19]'
                      : 'bg-[#070B19] text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-bold">نوع سند:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#070B19] border border-gray-700 text-xs text-gray-200 focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">همه اسناد</option>
                <option value="precedent">آرای وحدت رویه</option>
                <option value="advisory_opinion">نظریات مشورتی</option>
                <option value="circular">بخشنامه‌های رسمی</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Precedent Cards List */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between text-xs text-gray-400 px-2">
          <span>نمایش {filteredItems.length} سند حقوقی معتبر و تنقیح‌شده</span>
          <span>منبع: هیأت عمومی دیوان عالی کشور و اداره کل حقوقی قوه قضائیه</span>
        </div>

        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-[#0B132B]/80 rounded-3xl border border-gray-800 shadow-xl overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/50"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold">
                      {item.number}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 text-[11px] font-bold flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold">
                      {item.type === 'precedent' ? 'لازم‌الاتباع دادگاه‌ها' : 'دکترین مشورتی'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-serif">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item);
                    }}
                    className="p-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors border border-gray-700"
                    title="کپی استناد حقوقی"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <div className="w-8 h-8 rounded-full bg-[#070B19] flex items-center justify-center text-gray-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="p-6 bg-[#070B19]/90 border-t border-gray-800 space-y-6 text-xs">
                  {/* Full Text */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#D4AF37] flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>متن کامل رأی / نظریه رسمی:</span>
                    </h4>
                    <div className="p-4 rounded-2xl bg-[#0B132B] border border-gray-800 text-gray-200 leading-relaxed font-serif text-sm">
                      {item.fullContent}
                    </div>
                  </div>

                  {/* Related Articles */}
                  <div className="space-y-2">
                    <span className="font-bold text-gray-400 block">مواد قانونی استنادی و مرتبط:</span>
                    <div className="flex flex-wrap gap-2">
                      {item.relatedArticles.map((art, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-xl bg-[#0B132B] border border-gray-700 text-gray-300 text-xs font-mono"
                        >
                          {art}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Advocate Practical Advice */}
                  <div className="p-5 rounded-2xl bg-gradient-to-l from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 text-amber-200 space-y-2">
                    <div className="font-bold text-[#D4AF37] flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>راهبرد وکیل: کاربرد در نگارش لوایح و دفاعیات دادگاه (دکتر سیده مریم رضوی)</span>
                    </div>
                    <p className="text-xs text-amber-100/90 leading-relaxed">
                      {item.advocateNote}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
