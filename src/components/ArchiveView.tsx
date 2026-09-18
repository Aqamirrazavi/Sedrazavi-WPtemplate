import React, { useState, useMemo } from 'react';
import { ArticleItem, VideoItem, ServiceItem } from '../types/theme';
import { ARTICLES_DATA, VIDEOS_DATA, SERVICES_DATA, ATTORNEY_INFO } from '../data/mockData';
import {
  BookOpen,
  Video,
  Scale,
  Search,
  Grid,
  List,
  ArrowUpDown,
  Filter,
  Eye,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
  Play,
  RotateCcw,
  SlidersHorizontal,
  FolderOpen,
  Home,
  User,
  Send,
  CheckCircle2,
  Phone,
  MessageSquare,
  Share2,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';

export type ArchiveType = 'articles' | 'videos' | 'services' | 'all' | 'article' | 'video';

export interface ArchiveViewProps {
  initialType?: ArchiveType;
  onSelectArticle?: (articleId: string) => void;
  onSelectVideo?: (videoId: string) => void;
  onSelectService?: (serviceSlug: string) => void;
  onBackToHome?: () => void;
  onOpenBooking?: () => void;
  onOpenProfile?: () => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  initialType = 'articles',
  onSelectArticle,
  onSelectVideo,
  onSelectService,
  onBackToHome,
  onOpenBooking,
  onOpenProfile,
}) => {
  const normalizedInitialType =
    initialType === 'video' || initialType === 'videos'
      ? 'videos'
      : initialType === 'services'
      ? 'services'
      : 'articles';

  const [archiveType, setArchiveType] = useState<'articles' | 'videos' | 'services'>(normalizedInitialType);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'most_viewed' | 'title'>('newest');
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');

  // Newsletter form state in sidebar
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = archiveType === 'articles' ? 6 : 4;

  // Extract categories dynamically with count
  const categoryStats = useMemo(() => {
    if (archiveType === 'articles') {
      const counts: Record<string, number> = {};
      (ARTICLES_DATA || []).forEach((a) => {
        if (a && a.category) {
          counts[a.category] = (counts[a.category] || 0) + 1;
        }
      });
      return counts;
    } else if (archiveType === 'videos') {
      const counts: Record<string, number> = {};
      (VIDEOS_DATA || []).forEach((v) => {
        if (v && v.category) {
          counts[v.category] = (counts[v.category] || 0) + 1;
        }
      });
      return counts;
    } else {
      return {
        'دعاوی مالی و تجاری': 4,
        'دعاوی کیفری و جرایم اقتصادی': 2,
        'امور بین‌الملل و داوری': 2,
      };
    }
  }, [archiveType]);

  const categories = useMemo(() => {
    return ['all', ...Object.keys(categoryStats)];
  }, [categoryStats]);

  // Extract unique popular tags for Tag Cloud
  const tagCloud = useMemo(() => {
    const set = new Set<string>();
    (ARTICLES_DATA || []).forEach((a) => {
      (a?.tags || []).forEach((t) => set.add(t));
    });
    return Array.from(set).slice(0, 12);
  }, []);

  // Filter & Sort Articles safely
  const filteredArticles = useMemo(() => {
    let result = [...(ARTICLES_DATA || [])];

    if (selectedCategory !== 'all') {
      result = result.filter((a) => a?.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a?.title?.toLowerCase().includes(q) ||
          a?.summary?.toLowerCase().includes(q) ||
          (a?.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'newest') {
      result.reverse();
    } else if (sortBy === 'most_viewed') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'title') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'fa'));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Filter & Sort Videos safely
  const filteredVideos = useMemo(() => {
    let result = [...(VIDEOS_DATA || [])];

    if (selectedCategory !== 'all') {
      result = result.filter((v) => v?.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v?.title?.toLowerCase().includes(q) ||
          v?.summary?.toLowerCase().includes(q) ||
          (v?.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'most_viewed') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'title') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'fa'));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Filter Services safely
  const filteredServices = useMemo(() => {
    let result = [...(SERVICES_DATA || [])];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s?.title?.toLowerCase().includes(q) ||
          s?.summary?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery]);

  // Current active items total count
  const currentTotalItems =
    archiveType === 'articles'
      ? filteredArticles.length
      : archiveType === 'videos'
      ? filteredVideos.length
      : filteredServices.length;

  const totalPages = Math.max(1, Math.ceil(currentTotalItems / itemsPerPage));

  // Paginated Slices
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage, itemsPerPage]);

  const paginatedVideos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVideos.slice(start, start + itemsPerPage);
  }, [filteredVideos, currentPage, itemsPerPage]);

  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(start, start + itemsPerPage);
  }, [filteredServices, currentPage, itemsPerPage]);

  // Recent 5 articles for sidebar widget
  const recentSidebarArticles = useMemo(() => {
    return (ARTICLES_DATA || []).slice(0, 5);
  }, []);

  const handleTypeChange = (type: ArchiveType) => {
    setArchiveType(type);
    setSelectedCategory('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <main id="primary" className="site-main archive-page space-y-10 text-right pb-16">
      
      {/* 1. Archive Header (هدر برگه‌ی آرشیو با گرادیان سرمه‌ای-طلایی و Breadcrumb) */}
      <header className="archive-header relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] p-6 sm:p-10 text-white shadow-2xl border border-[#D4AF37]/30">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-300">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>خانه</span>
            </button>
            <span className="text-[#D4AF37]">‹</span>
            <span className="text-gray-400">بانک مقالات و دانشنامه</span>
            <span className="text-[#D4AF37]">‹</span>
            <span className="text-white font-bold">
              {archiveType === 'articles'
                ? 'وبلاگ حقوقی SedRazavi'
                : archiveType === 'videos'
                ? 'آرشیو وبینارها'
                : 'خدمات وکالت'}
            </span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>پایگاه تحلیل‌های قضایی و آراء وحدت رویه وکیل پایه یک</span>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
              {archiveType === 'articles' && 'وبلاگ حقوقی SedRazavi'}
              {archiveType === 'videos' && 'کارگاه‌ها و وبینارهای تصویری'}
              {archiveType === 'services' && 'دپارتمان‌های تخصصی وکالت'}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              آخرین مقالات، راهنماهای کاربردی دادرسی و تحلیل‌های فنی مستند به قوانین جاری و آرای دیوان عالی کشور، تألیف سرکار خانم دکتر سیده مریم رضوی.
            </p>
          </div>

          {/* Post Type Switcher Tabs */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleTypeChange('articles')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                archiveType === 'articles'
                  ? 'bg-[#D4AF37] text-[#0B132B] shadow-lg font-black'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>مقالات و یادداشت‌ها ({ARTICLES_DATA?.length || 0})</span>
            </button>

            <button
              onClick={() => handleTypeChange('videos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                archiveType === 'videos'
                  ? 'bg-[#D4AF37] text-[#0B132B] shadow-lg font-black'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>وبینارها و ویدیوها ({VIDEOS_DATA?.length || 0})</span>
            </button>

            <button
              onClick={() => handleTypeChange('services')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                archiveType === 'services'
                  ? 'bg-[#D4AF37] text-[#0B132B] shadow-lg font-black'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>خدمات وکالت ({SERVICES_DATA?.length || 0})</span>
            </button>

            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="mr-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 hover:text-white transition-colors border border-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>بازگشت به صفحه نخست</span>
              </button>
            )}
          </div>

        </div>

        {/* Decorative Watermark */}
        <div className="absolute left-8 bottom-4 opacity-10 pointer-events-none hidden lg:block">
          <Scale className="w-48 h-48 text-[#D4AF37]" />
        </div>
      </header>

      {/* 2. Archive Search Bar (نوار جستجوی ۶۰٪ در دسکتاپ و ۹۰٪ در موبایل، با دکمه پاک کردن ×) */}
      <section className="archive-search max-w-2xl mx-auto px-4 w-full">
        <div className="relative rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-lg p-1.5 transition-all focus-within:border-[#D4AF37] focus-within:ring-2 focus-within:ring-[#D4AF37]/20">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute right-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="جستجو در مقالات، کلمات کلیدی، عناوین یا موضوعات حقوقی..."
              className="w-full pr-11 pl-12 py-3 bg-transparent text-xs sm:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="absolute left-3 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center text-xs transition-colors"
                title="پاک کردن متن جستجو"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick results count / debounce indicator */}
          {searchQuery && (
            <div className="px-3 py-1.5 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 flex items-center justify-between">
              <span>
                یافته‌ها برای «<b className="text-[#D4AF37]">{searchQuery}</b>»: {currentTotalItems} مورد
              </span>
              <button
                onClick={clearFilters}
                className="text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>حذف فیلترها</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Category Filters (دکمه‌های Pill-shaped با اسکرول افقی در موبایل) */}
      <section className="archive-filters container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-gray-400 shrink-0 ml-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
            دسته‌ها:
          </span>

          {categories.map((cat) => {
            const count = cat === 'all' ? (ARTICLES_DATA?.length || 0) : (categoryStats[cat] || 0);
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#0B132B] shadow-md font-bold ring-2 ring-[#D4AF37]/30'
                    : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] border border-gray-200 dark:border-gray-800'
                }`}
              >
                <span>{cat === 'all' ? 'همه موضوعات' : cat}</span>
                <span
                  className={`mr-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive
                      ? 'bg-[#0B132B]/20 text-[#0B132B]'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4 & 5. Main Archive Content (Layout: 3-Column Grid + Sidebar) */}
      <section className="archive-content container mx-auto px-4 max-w-7xl">
        
        {/* Layout Switcher & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>نمایش:</span>
            <b className="text-[#0B132B] dark:text-white font-bold">{currentTotalItems}</b>
            <span>مطلب تخصصی</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>مرتب‌سازی:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs rounded-xl px-2.5 py-1.5 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="newest">جدیدترین انتشار</option>
                <option value="most_viewed">پربازدیدترین‌ها</option>
                <option value="title">الفبایی (الف تا ی)</option>
              </select>
            </div>

            {/* View Grid / List Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setViewLayout('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewLayout === 'grid'
                    ? 'bg-white dark:bg-[#0B132B] text-[#D4AF37] shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                title="نمایش ۳ ستونی"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewLayout('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewLayout === 'list'
                    ? 'bg-white dark:bg-[#0B132B] text-[#D4AF37] shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                title="نمایش تک‌ستونی"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Articles Area (lg:col-span-8 or 9) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            
            {/* 7. Empty State (در صورت نبود نتیجه) */}
            {currentTotalItems === 0 ? (
              <div className="empty-state p-12 text-center bg-white dark:bg-[#0B132B] rounded-3xl border border-gray-200 dark:border-gray-800 space-y-5 shadow-sm">
                <div className="w-20 h-20 rounded-full bg-amber-500/10 text-[#D4AF37] flex items-center justify-center mx-auto text-3xl">
                  📚
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#0B132B] dark:text-white font-serif">
                    هنوز مقاله‌ای مطابق جستجوی شما یافت نشد
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                    می‌توانید کلمات کلیدی دیگری را جستجو نمایید یا دسته‌بندی را به «همه موضوعات» تغییر دهید. مقالات جدید به صورت هفتگی توسط تیم وکلای SedRazavi منتشر می‌شوند.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B132B] text-xs font-bold shadow-md hover:bg-[#c49f30] transition-colors inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>مشاهده تمام مقالات</span>
                  </button>
                  {onBackToHome && (
                    <button
                      onClick={onBackToHome}
                      className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-200 transition-colors"
                    >
                      بازگشت به صفحه اصلی
                    </button>
                  )}
                </div>
              </div>
            ) : archiveType === 'articles' ? (
              
              /* 4. Articles Grid (۳ ستون در دسکتاپ، ۲ ستون در تبلت، ۱ ستون در موبایل) */
              <div
                className={
                  viewLayout === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {paginatedArticles.map((article) => (
                  <article
                    key={article.id}
                    id={`post-${article.id}`}
                    onClick={() => onSelectArticle?.(article.id)}
                    className={`post-card group bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col justify-between ${
                      viewLayout === 'list' ? 'sm:flex-row sm:items-stretch' : ''
                    }`}
                  >
                    {/* Post Thumbnail (16:9 ratio, lazy load, zoom hover) */}
                    <div
                      className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${
                        viewLayout === 'list'
                          ? 'w-full sm:w-60 h-48 sm:h-auto shrink-0'
                          : 'h-48 w-full'
                      }`}
                    >
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="post-category absolute top-3 right-3 px-3 py-1 rounded-md bg-[#D4AF37] text-[#0B132B] text-[11px] font-bold shadow-md">
                        {article.category}
                      </span>
                    </div>

                    {/* Post Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        {/* Meta */}
                        <div className="post-meta flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#D4AF37]" />
                            <span>{article.date}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D4AF37]" />
                            <span>{article.readTime}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="post-title text-base font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors leading-relaxed line-clamp-2">
                          {article.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="post-excerpt text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mt-2 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="post-footer pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                        <span className="post-author text-gray-400 text-[11px] flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span>{article.author}</span>
                        </span>

                        <span className="post-read-more text-[#D4AF37] font-bold group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                          <span>مطالعه بیشتر</span>
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

            ) : archiveType === 'videos' ? (
              
              /* Videos Grid */
              <div
                className={
                  viewLayout === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {paginatedVideos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => onSelectVideo?.(video.id)}
                    className="group bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-48 bg-black overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#0B132B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-[#0B132B] ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px] font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        <span>{video.duration}</span>
                      </span>
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#0B132B]/80 text-[#D4AF37] text-[10px] font-bold">
                        {video.category}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-[11px] text-gray-400 mb-1.5">
                          مدرس: {video.presenter} • {video.date}
                        </div>
                        <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                          {video.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                        <span className="text-gray-400 text-[11px]">
                          {(video.views || 0).toLocaleString('fa-IR')} بازدید
                        </span>
                        <span className="text-[#D4AF37] font-bold flex items-center gap-1">
                          <span>تماشای ویدیو</span>
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            ) : (
              
              /* Services Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => onSelectService?.(service.slug)}
                    className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all cursor-pointer space-y-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {service.iconEmoji}
                    </div>

                    <div>
                      <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mt-2 leading-relaxed">
                        {service.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                      {/* SAFE access: requiredDocs instead of caseTypes */}
                      <span className="text-gray-400">
                        {(service.requiredDocs?.length || 4)} مرحله دادرسی و مدارک
                      </span>
                      <span className="text-[#D4AF37] font-bold flex items-center gap-1">
                        <span>جزئیات خدمت</span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            )}

            {/* 6. Pagination (صفحه‌بندی اختصاصی با دکمه قبلی، بعدی و شماره صفحات) */}
            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="archive-pagination p-4 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between shadow-sm"
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    currentPage === 1
                      ? 'opacity-40 cursor-not-allowed text-gray-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>صفحه قبلی</span>
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                        currentPage === page
                          ? 'bg-[#D4AF37] text-[#0B132B] shadow-md font-black'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    currentPage === totalPages
                      ? 'opacity-40 cursor-not-allowed text-gray-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <span>صفحه بعدی</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </nav>
            )}

          </div>

          {/* 5. Sidebar (سایدبار ۶ ویجتی: درباره وکیل، دسته‌ها، آخرین مقالات، ابر برچسب‌ها، خبرنامه، شبکه‌ها) */}
          <aside className="archive-sidebar lg:col-span-4 xl:col-span-3 space-y-6">
            
            {/* Widget 1: درباره وکیل */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={ATTORNEY_INFO.portraitImage}
                  alt={ATTORNEY_INFO.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37] shadow-md"
                />
                <div>
                  <h4 className="text-sm font-bold font-serif text-[#0B132B] dark:text-white">
                    {ATTORNEY_INFO.name}
                  </h4>
                  <p className="text-[11px] text-[#D4AF37] font-semibold mt-0.5">
                    وکیل پایه یک دادگستری
                  </p>
                  <p className="text-[10px] text-gray-400">
                    پروانه وکالت: {ATTORNEY_INFO.licenseNumber}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                متخصص در دعاوی پیچیده تجاری، بازرگانی بین‌المللی، جرایم اقتصادی، داوری و حقوق مالکیت فکری با ۲۰ سال سابقه وکالت مستمر.
              </p>

              {onOpenProfile && (
                <button
                  onClick={onOpenProfile}
                  className="w-full py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] text-xs font-bold text-gray-700 dark:text-gray-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>مشاهده بیوگرافی و رزومه علمی</span>
                </button>
              )}
            </div>

            {/* Widget 2: دسته‌بندی‌ها */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                دسته‌بندی‌های حقوقی
              </h4>

              <div className="space-y-1.5">
                {Object.entries(categoryStats).map(([catName, count]) => (
                  <button
                    key={catName}
                    onClick={() => {
                      setSelectedCategory(catName);
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      selectedCategory === catName
                        ? 'bg-[#D4AF37]/15 text-[#D4AF37] font-bold'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <span>{catName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 3: آخرین مقالات */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                تازه‌ترین یادداشت‌های تحلیلی
              </h4>

              <div className="space-y-3">
                {recentSidebarArticles.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectArticle?.(item.id)}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#D4AF37] transition-colors truncate">
                        {item.title}
                      </h5>
                      <span className="text-[10px] text-gray-400 mt-1 block">
                        {item.date} • {item.readTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 4: ابر برچسب‌ها (Tag Cloud) */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                ابر کلمات کلیدی و برچسب‌ها
              </h4>

              <div className="flex flex-wrap gap-1.5">
                {tagCloud.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      setCurrentPage(1);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-[11px] text-gray-600 dark:text-gray-300 hover:bg-[#D4AF37] hover:text-[#0B132B] transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 5: خبرنامه حقوقی */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/30 shadow-md space-y-3">
              <h4 className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                عضویت در خبرنامه تحلیلی
              </h4>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                آرای جدید دیوان عالی، تغییرات قوانین و هشدارهای پیشگیرانه حقوقی را در ایمیل خود دریافت کنید.
              </p>

              {newsletterSubscribed ? (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>ایمیل شما با موفقیت در خبرنامه ثبت گردید.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="آدرس ایمیل شما..."
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f30] text-[#0B132B] text-xs font-bold transition-colors shadow-sm"
                  >
                    عضویت رایگان
                  </button>
                </form>
              )}
            </div>

            {/* Widget 6: شبکه‌های اجتماعی */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                کانال‌ها و پیام‌رسان‌های رسمی
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="https://t.me/sedrazavi_law"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] flex items-center gap-2 transition-colors"
                >
                  <span className="text-[#D4AF37]">✈️</span>
                  <span>کانال تلگرام</span>
                </a>

                <a
                  href="https://eitaa.com/sedrazavi_law"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] flex items-center gap-2 transition-colors"
                >
                  <span className="text-[#D4AF37]">💬</span>
                  <span>کانال ایتا</span>
                </a>

                <a
                  href="https://instagram.com/sedrazavi_law"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] flex items-center gap-2 transition-colors"
                >
                  <span className="text-[#D4AF37]">📷</span>
                  <span>اینستاگرام</span>
                </a>

                <a
                  href="https://linkedin.com/company/sedrazavi"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] flex items-center gap-2 transition-colors"
                >
                  <span className="text-[#D4AF37]">💼</span>
                  <span>لینکدین</span>
                </a>
              </div>
            </div>

          </aside>

        </div>
      </section>

      {/* 8. Final CTA Section (دعوت به اقدام پایانی با گرادیان سرمه‌ای-طلایی) */}
      <section className="archive-cta container mx-auto px-4 max-w-7xl">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              همراهی گام‌به‌گام در مراجع قضایی و داوری
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              آیا پیرامون این موضوع سوال حقوقی یا پرونده مطروحه دارید؟
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              سرکار خانم دکتر سیده مریم رضوی و تیم وکلای پایه یک، آماده بررسی مستندات پرونده، ارزیابی شانس موفقیت در دادرسی و پذیرش وکالت تخصصی هستند.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-2xl bg-[#D4AF37] text-[#0B132B] text-xs sm:text-sm font-bold shadow-xl hover:bg-[#c49f30] hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>رزرو مشاوره تخصصی</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <a
              href={`tel:${ATTORNEY_INFO.mobile}`}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>{ATTORNEY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};
