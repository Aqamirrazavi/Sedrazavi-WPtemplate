import React, { useState } from 'react';
import {
  Sparkles, ExternalLink, ArrowRight, Gauge, CheckCircle2,
  Code2, Eye, ShieldCheck, Zap, Layers, Server, Globe,
  Download, Filter, ChevronLeft
} from 'lucide-react';

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: 'Gutenberg First' | 'WooCommerce' | 'SaaS Platform' | 'Speed Optimization';
  year: string;
  thumbnail: string;
  metrics: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    loadTime: string;
  };
  summary: string;
  techStack: string[];
  features: string[];
  demoUrl?: string;
}

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-01',
    title: 'پرتال جامع خدمات حقوقی و داوری سدرضوی',
    slug: 'sedrazavi-legal-suite',
    client: 'دفتر وکالت بین‌المللی رضوی',
    category: 'Gutenberg First',
    year: '۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    metrics: {
      performance: 99,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
      loadTime: '۰.۴ ثانیه',
    },
    summary: 'معماری هایبریدی وردپرس و گوتنبرگ با بیش از ۳۰ شورت‌کد مستقل، سیستم رهگیری پرونده‌ها بر پایه کدرهگیری و احراز هویت پیامکی بدون پلاگین‌های سنگین خارجی.',
    techStack: ['WordPress FSE', 'Gutenberg Blocks', 'Tailwind CSS', 'PHP 8.2', 'REST API'],
    features: ['استقلال ۱۰۰٪ از المنتور برای سرعت حداکثری', 'سیستم ضدتقلب و Rate-Limiter بومی', 'سفارشی‌ساز دیداری رنگ و وکتور'],
    demoUrl: '#',
  },
  {
    id: 'proj-02',
    title: 'فروشگاه چندمنظوره کالای دیجیتال آریا استور',
    slug: 'aria-digital-store',
    client: 'هولدینگ بازرگانی آریا',
    category: 'WooCommerce',
    year: '۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    metrics: {
      performance: 96,
      accessibility: 98,
      bestPractices: 100,
      seo: 98,
      loadTime: '۰.۸ ثانیه',
    },
    summary: 'طراحی فروشگاه ووکامرسی سازگار با وودمارت و کش ردیس، دارای سبد خرید ایجکس کشویی، فیلتر ویژگی‌های ابری و درگاه پرداخت مستقیم شاپرک.',
    techStack: ['WooCommerce', 'WoodMart Core', 'Redis Object Cache', 'Custom Checkout'],
    features: ['مینی‌کارت داینامیک بدون رفرش برگه', 'جستجوی زنده لایو با نتایج لحظه‌ای', 'هماهنگ با سامانه مودیان'],
    demoUrl: '#',
  },
  {
    id: 'proj-03',
    title: 'داشبورد ابری اتوماسیون گیت‌هاب و دیپلوی وردپرس',
    slug: 'wp-github-auto-deploy',
    client: 'استارتاپ دواپس نکسوس',
    category: 'SaaS Platform',
    year: '۱۴۰۲',
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    metrics: {
      performance: 98,
      accessibility: 100,
      bestPractices: 96,
      seo: 95,
      loadTime: '۰.۵ ثانیه',
    },
    summary: 'وب‌اپلیکیشن مانیتورینگ کامیت‌ها، هیت‌مپ فعالیت تیمی، لاگ‌های سیستمی و همگام‌سازی بلادرنگ مخزن گیت‌هاب با پایگاه‌داده وردپرس.',
    techStack: ['GitHub REST & Webhooks', 'React SPA', 'PHP REST Controller', 'SQLite Cache'],
    features: ['طراحی اختصاصی GitHub Primer', 'سیستم اعتبارسنجی امضای وب‌هوک HMAC', 'گزارش‌گیری اکسل و PDF'],
    demoUrl: '#',
  },
  {
    id: 'proj-04',
    title: 'بهینه‌سازی لایت‌هاوس و مهاجرت وب‌سایت هولدینگ پارس',
    slug: 'pars-holding-speedup',
    client: 'گروه صنعتی و سرمایه‌گذاری پارس',
    category: 'Speed Optimization',
    year: '۱۴۰۲',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    metrics: {
      performance: 100,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
      loadTime: '۰.۳ ثانیه',
    },
    summary: 'ارتقای لودتایم سایت از ۴.۸ ثانیه به زیر ۴۰۰ میلی‌ثانیه با حذف پلاگین‌های بلااستفاده، کش پیشرفته OPcache و تبدیل فرمت تصاویر به WebP/AVIF.',
    techStack: ['Core Web Vitals', 'Critical CSS Inlining', 'HTTP/3 Quic', 'Cloudflare Edge'],
    features: ['کاهش ۹۰ درصدی کدهای مسدودکننده رندر', 'صفر کردن خطاهای CLS و LCP', 'رتبه ۱ گوگل در کلمات کلیدی هدف'],
    demoUrl: '#',
  },
];

interface PortfolioPageViewProps {
  onBackToHome: () => void;
  onRequestBrief?: () => void;
}

export const PortfolioPageView: React.FC<PortfolioPageViewProps> = ({ onBackToHome, onRequestBrief }) => {
  const [activeCategory, setActiveCategory] = useState<string>('همه');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const categories = ['همه', 'Gutenberg First', 'WooCommerce', 'SaaS Platform', 'Speed Optimization'];

  const filteredProjects = activeCategory === 'همه'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Top Header & Breadcrumbs */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به صفحه اصلی
            </button>
            <span className="text-gray-600">/</span>
            <span className="text-xs text-[#818CF8] font-bold">نمونه‌کارها و پروژه‌ها (page-portfolio.php)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            تضمین عملکرد لایت‌هاوس بالای ۹۵ در تمامی پروژه‌ها
          </div>
        </div>

        {/* Hero Section */}
        <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E1B4B] border border-indigo-900/40 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              شو‌کیس معماری وب و نمونه‌کارهای وردپرس
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              خلق راهکارهای دیجیتال با <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">سرعت فوق‌العاده و طراحی متمایز</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              ما وب‌سایت‌های سازمانی و فروشگاهی را با تمرکز بر گوتنبرگ، بهینه‌سازی کدهای PHP و استقلال از افزونه‌های سنگین می‌سازیم تا تجربه لود زیر یک ثانیه و رتبه برتر سئو را به دست آورید.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              {onRequestBrief && (
                <button
                  onClick={onRequestBrief}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
                >
                  ثبت بریف اختصاصی پروژه شما
                </button>
              )}
              <div className="flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  <span>میانگین سرعت: ۹۸٪</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>کدنویسی استاندارد PSR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-3xl bg-[#0F172A] border border-gray-800/80 overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl flex flex-col"
          >
            {/* Image Thumbnail */}
            <div className="relative h-60 w-full overflow-hidden group">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-xs font-bold text-indigo-300 border border-white/10">
                  {project.category}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-xs text-gray-300">
                <span className="font-bold">{project.client}</span>
                <span className="font-mono bg-black/50 px-2 py-0.5 rounded-md">{project.year}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <h3 className="text-xl font-black text-white hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Lighthouse Score Bar */}
              <div className="rounded-2xl bg-black/40 border border-gray-800 p-4">
                <div className="text-[11px] text-gray-400 font-bold mb-3 flex items-center justify-between">
                  <span>امتیاز گوگل لایت‌هاوس (Lighthouse V10)</span>
                  <span className="text-emerald-400 font-mono">زمان لود: {project.metrics.loadTime}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-2">
                    <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">{project.metrics.performance}</div>
                    <div className="text-[10px] text-gray-400">کارایی</div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-2">
                    <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">{project.metrics.accessibility}</div>
                    <div className="text-[10px] text-gray-400">دسترس‌پذیری</div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-2">
                    <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">{project.metrics.bestPractices}</div>
                    <div className="text-[10px] text-gray-400">استانداردها</div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-2">
                    <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">{project.metrics.seo}</div>
                    <div className="text-[10px] text-gray-400">سئو فنی</div>
                  </div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-lg bg-gray-800 text-[11px] font-mono text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-gray-800">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  مشاهده جزییات معماری و کیس استادی
                </button>
                <span className="text-[11px] text-gray-500 font-mono">ID: {project.slug}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#0F172A] rounded-3xl border border-indigo-500/40 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs text-indigo-400 font-bold">{selectedProject.category}</span>
                <h3 className="text-xl font-black text-white">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
              <p>{selectedProject.summary}</p>
              <div className="space-y-2">
                <div className="font-bold text-white text-xs">ویژگی‌های برجسته پیاده‌سازی شده:</div>
                <div className="space-y-1.5">
                  {selectedProject.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-400">کارفرما: {selectedProject.client}</span>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPageView;
